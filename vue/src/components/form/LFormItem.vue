<template>
    <div>
        <!-- label -->
        <label v-if="label">{{ label }}</label>
        <slot></slot>
        <!-- 校验信息 -->
        <p v-if="error">{{ error }}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import useInjectFormContext from './hooks/injectFormContext';

export default defineComponent({
    props: {
        label: String,
    },
    name: 'LFormItem',
    setup() {
        const formContext = useInjectFormContext();
        const state = reactive({
            error: '',
        });

        return {
            ...toRefs(state),
            formContext,
        };
    },
});
</script>
