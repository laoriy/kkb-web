<template>
    <LForm :model="userInfo">
        <LFormItem label="hhhh">
            <LInput v-model="userInfo.userName" />
        </LFormItem>
    </LForm>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import LInput from './LInput.vue';
import LFormItem from './LFormItem.vue';
import LForm from './LForm.vue';

export default defineComponent({
    components: { LInput, LFormItem, LForm },
    setup() {
        const form = reactive({
            userInfo: {
                userName: '',
                password: '',
            },
        });
        return {
            ...toRefs(form),
        };
    },
});
</script>
