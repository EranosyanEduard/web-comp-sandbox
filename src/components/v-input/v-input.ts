import { html } from 'lit-html'
import { z } from 'zod'
import { computed, defineComponent, type PropType } from '../../core'
import { Color } from '../colors'
import { Size } from '../sizes'
import staticStyle from './v-input.css?inline'
import './variables.css'

/** Поле ввода */
export default defineComponent({
  name: 'VInput',
  emits: ['input'],
  props: {
    color: {
      default: () => Color.Options.PRIMARY.base,
      type: String
    },
    disabled: {
      default: () => false,
      type: Boolean
    },
    size: {
      default: () => Size.Options.MD,
      type: [Object, String] as [
        PropType.Object<Size<string>>,
        PropType.String
      ],
      reflector: String,
      validator: (value) => {
        const object = z.instanceof(Size)
        const string = z.union([
          z.literal(Size.Options.XS.toString()),
          z.literal(Size.Options.SM.toString()),
          z.literal(Size.Options.MD.toString()),
          z.literal(Size.Options.LG.toString()),
          z.literal(Size.Options.XL.toString())
        ])
        return object.or(string).safeParse(value).success
      }
    },
    type: {
      default: () => 'text',
      type: String
    },
    value: {
      required: true,
      type: String
    }
  },
  shadowRootConfig: { mode: 'closed' },
  setup(props, { emit }) {
    const style = computed<string>(() => {
      const size = props.size.toString()
      return /* css */ `
        :host {
          --v-input-color-primary: ${props.color};
          --v-input-props-size: ${`var(--v-input-size-${size})`};
        }
      `
    })
    const oninput = (event: Event): void => {
      event.stopPropagation()
      emit('input', (event.target as HTMLInputElement).value)
    }
    return () => html`
      <style>
        ${style.value}
        ${staticStyle}
      </style>
      ${props.value}
      <input
        .disabled=${props.disabled}
        type=${props.type}
        .value=${props.value}
        @input=${oninput}
      />
    `
  }
})
