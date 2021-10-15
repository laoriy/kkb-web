<template>
    <LForm :model="userInfo" :rules="rules">
        <LFormItem label="用户名" prop="userName">
            <LInput v-model="userInfo.userName" placeholder="sss" />
        </LFormItem>
        <LFormItem label="密码" prop="password">
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
            rules: {
                userName: { required: true, messsage: '请输入用户名' },
                password: { required: true, messsage: '请输入密码' },
            },
        });
        return {
            ...toRefs(form),
        };
    },
});
</script>
