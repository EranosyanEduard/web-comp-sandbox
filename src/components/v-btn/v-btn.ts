import { html } from 'lit-html'
import { z } from 'zod'
import { computed, defineComponent, type PropType } from '../../core'
import { Color } from '../colors'
import { Size } from '../sizes'
import staticStyle from './v-btn.css?inline'
import './variables.css'

/** Кнопка */
export default defineComponent({
  name: 'VBtn',
  props: {
    color: {
      default: () => Color.Options.PRIMARY.base,
      type: String
    },
    disabled: {
      default: () => false,
      type: Boolean
    },
    loading: {
      default: () => false,
      reflector: String,
      type: Boolean
    },
    outlined: {
      default: () => false,
      reflector: String,
      type: Boolean
    },
    size: {
      default: () => Size.Options.MD,
      type: [Object, String] as [
        PropType.Object<Size<string>>,
        PropType.String<string>
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
    text: {
      default: () => false,
      reflector: String,
      type: Boolean
    },
    type: {
      default: () => 'button' as const,
      type: String as PropType.String<'button' | 'submit' | 'reset'>
    }
  },
  shadowRootConfig: { mode: 'closed' },
  setup(props) {
    const disabled = computed(() => props.disabled || props.loading)
    const style = computed<string>(() => {
      const size = props.size.toString()
      return /* css */ `
        :host {
          --v-btn-color-primary: ${props.color};
          --v-btn-props-size: ${`var(--v-btn-size-${size})`};
        }
      `
    })
    return () => html`
      <style>
        ${style.value}
        ${staticStyle}
      </style>
      <button
        .disabled=${disabled.value}
        type=${props.type}
      >
        <slot></slot>
      </button>
    `
  }
})
