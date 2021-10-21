<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, PropType, toRefs, reactive } from 'vue';
import { injectFormKey, lFormEvents, lFormEventsType } from './types';
import { FormItemRule, lFormItemContext } from './types';
import mitt from 'mitt';
export default defineComponent({
    props: {
        model: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object as PropType<Record<string, FormItemRule>>,
        },
    },
    setup(props) {
        const events: lFormItemContext[] = [];
        const formMitt = mitt<lFormEventsType>();
        formMitt.on(lFormEvents.addField, (field) => {
            if (field.prop) {
                events.push(field);
            }
        });

        const validate = (cb: (pass: boolean) => void) => {
            const tasks = events.map((event) => event.validate());
            Promise.all(tasks)
                .then(() => {
                    cb(true);
                })
                .catch(() => {
                    cb(false);
                });
        };

        const lForm = reactive({
            formMitt,
            ...toRefs(props),
        });
        provide(injectFormKey, lForm);
        return {
            validate,
        };
    },
});
</script>
