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

export default defineComponent({
    props: {
        label: String,
    },
    name: 'LFormItem',
    setup() {
        const state = reactive({
            error: '',
        });
        return {
            ...toRefs(state),
        };
    },
});
</script>
