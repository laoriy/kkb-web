<script lang="tsx">
import { defineComponent } from 'vue';

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
    setup(props, { emit }) {
        const onInput = (e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            emit('update:modelValue', value);
        };
        return () => {
            const { modelValue } = props;
            return <input onInput={onInput} value={modelValue}></input>;
        };
    },
});
</script>
