<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { injectFormKey } from './types';
export default defineComponent({
    props: {
        model: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object,
        },
    },
    setup(props) {
        provide(injectFormKey, {
            model: props.model,
            rules: props.rules,
        });
    },
});
</script>
