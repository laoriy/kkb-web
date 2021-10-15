<script lang="tsx">
import { defineComponent, inject } from 'vue';
import { injectFormItemKey, injectFormItem } from './types';

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
    },
    setup(props, context) {
        const { emit, attrs } = context;
        const formItem: injectFormItem = inject(injectFormItemKey);
        const onInput = (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            emit('update:modelValue', value);
            formItem?.validate();
        };
        return () => {
            const { modelValue, type } = props;
            return <input onInput={onInput} type={type} value={modelValue} {...attrs}></input>;
        };
    },
});
</script>
