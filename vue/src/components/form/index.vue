<template>
    <LForm :model="userInfo" :rules="rules">
        <LFormItem label="用户名">
            <LInput v-model="userInfo.userName" placeholder="sss" />
        </LFormItem>
        <LFormItem label="密码">
            <LInput type="password" v-model="userInfo.password" />
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
            rules: [],
        });
        return {
            ...toRefs(form),
        };
    },
});
</script>
