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
import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue';
import { injectFormItemKey, lFormEvents } from './types';
import useInjectFormContext from './hooks/injectFormContext';
import Schema from 'async-validator';

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
        const state = reactive<{ error: string | undefined }>({
            error: '',
        });

        const validate = () => {
            let rules;
            let value;
            const { prop } = props;
            if (prop) {
                rules = formContext.rules[prop];
                value = formContext.model[prop];
                const descriptor = {
                    [prop]: rules,
                };
                const validator = new Schema(descriptor);
                return validator.validate({ [prop]: value }, (errors, fields) => {
                    if (errors) {
                        state.error = errors[0].message;
                        console.log(fields);
                        // validation failed, errors is an array of all errors
                        // fields is an object keyed by field name with an array of
                        // errors per field
                    } else {
                        // validation passed
                        state.error = '';
                    }
                });
            }
        };
        const elFormItem = reactive({
            ...toRefs(props),
            validate,
        });

        provide(injectFormItemKey, elFormItem);
        onMounted(() => {
            formContext.formMitt.emit(lFormEvents.addField, elFormItem);
        });
        return {
            ...toRefs(state),
            validate,
            formContext,
        };
    },
});
</script>
