<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, PropType } from 'vue';
import { injectFormKey } from './types';
import { FormItemRule } from './types';
export default defineComponent({
    props: {
        model: {
            type: Object,
            required: true,
        },
        rules: {
            type: Array as PropType<FormItemRule[]>,
        },
    },
    setup(props) {
        provide(injectFormKey, {
            model: props.model,
            rules: props.rules,
        });

        const validate = () => {
            console.log(props.model, props.rules);
        };
        return {
            validate,
        };
    },
});
</script>
