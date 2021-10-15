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
import { defineComponent, reactive, toRefs, provide } from 'vue';
import { injectFormItemKey } from './types';
import useInjectFormContext from './hooks/injectFormContext';

export default defineComponent({
    props: {
        label: {
            type: String,
        },
        prop: {
            type: String,
        },
    },
    name: 'LFormItem',
    setup(props) {
        const formContext = useInjectFormContext();
        const state = reactive({
            error: '',
        });

        const validate = () => {
            let rules;
            let value;
            if (props.prop) {
                rules = formContext.rules[props.prop];
                value = formContext.model[props.prop];
            }
            console.log(rules, value);
        };
        const elFormItem = reactive({
            ...toRefs(props),
            validate,
        });

        provide(injectFormItemKey, elFormItem);
        return {
            ...toRefs(state),
            validate,
            formContext,
        };
    },
});
</script>
