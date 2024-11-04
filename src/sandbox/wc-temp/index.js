function defineComponent(options) {
    class Component extends HTMLElement {
        static observedAttributes = options.props

        constructor() {
            super()
            setSetupedComponent(this)
            this._processProps()
            this.renderFn = options.setup(this)
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.render()
        }

        connectedCallback() {
            this.render()
        }

        render() {
            const abstractTemplate = this.renderFn()
            this.innerHTML = abstractTemplate.strings
            this.querySelectorAll('*').forEach((el) => {
                const attrs = Array.from(el.attributes)
                attrs.forEach((attr) => {
                    if (attr.name.startsWith('@')) {
                        console.log(attr.name, attr.value);

                        const eventName = attr.name.substring(1)
                        el.addEventListener(eventName, abstractTemplate.values[attr.value])
                    }
                })
            })
        }

        _processProps() {
            options.props.forEach((key) => {
                Object.defineProperty(this, key, {
                    get: () => {
                        return this.getAttribute(key)
                    },
                    set: (value) => {
                        this.setAttribute(key, value)
                    },
                })
            })
        }
    }

    // if (!customElements.get('v-example')) {
    //     customElements.define('v-example', Component)
    //     customElements.define('v-example-2', Component)
    // }

    return Component
}

let setupedComponent = null
const getSetupedComponent = () => {
    return setupedComponent
}
const setSetupedComponent = (component) => {
    setupedComponent = component
}

function computed(lazyValue) {
    const computedRef_ = { _value: lazyValue(), _watchers: [] }
    Reflect.defineProperty(computedRef_, 'value', {
        get() {
            const newValue = lazyValue()
            if (newValue !== computedRef_._value) {
                computedRef_._watchers.forEach((watcher) => {
                    watcher(newValue, computedRef_._value)
                })
            }
            computedRef_._value = newValue
            return computedRef_._value
        },

    })
    return computedRef_
}

function ref(value) {
    const currentSetupedComponent = getSetupedComponent()
    const ref_ = { _value: value, _watchers: [] }
    Reflect.defineProperty(ref_, 'value', {
        get() {
            return ref_._value
        },
        set(newValue) {
            if (newValue === ref_._value) return
            ref_._watchers.forEach((watcher) => {
                watcher(newValue, ref_._value)
            })
            ref_._value = newValue
            currentSetupedComponent.render()
        }
    })
    return ref_
}

function html(strings, ...values) {
    console.log(values);

    return {
        strings: strings.reduce((acc, it, i) => `${acc}${typeof values[i - 1] === 'function' ? i - 1 : values[i - 1]}${it}`),
        values
    }
}

function watch(ref, cb, options) {
    const index = ref._watchers.push(cb)
    if (options?.immediate) {
        cb(ref.value, undefined)
    }
    return () => {
        ref._watchers.splice(index, 1)
    }
}

const VExample = defineComponent({
    name: 'vexample',
    props: ['prop'],
    setup(props) {
        const counter = ref(0)
        const computedCounter = computed(() => counter.value)
        watch(computedCounter, (next, prev) => {
            console.log(next, prev)
        }, { immediate: true })
        // setInterval(() => (counter.value += 1), 10_000)
        return () => html`<div @click="${() => counter.value += 1}">${props.prop} ${computedCounter.value}</div>`
    }
})
