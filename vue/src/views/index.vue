<template>
    <LForm :model="userInfo" :rules="rules" ref="formRef">
        <LFormItem label="用户名" prop="userName">
            <LInput v-model="userInfo.userName" placeholder="sss" />
        </LFormItem>
        <LFormItem label="密码" prop="password">
            <LInput type="password" v-model="userInfo.password" />
        </LFormItem>
        <LFormItem>
            <button @click="login">登录</button>
        </LFormItem>
    </LForm>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import LInput from '../components/form/LInput.vue';
import LFormItem from '../components/form/LFormItem.vue';
import LForm from '../components/form/LForm.vue';
import Message from '@/components/message';

export default defineComponent({
    components: { LInput, LFormItem, LForm },
    setup() {
        const formRef = ref<InstanceType<typeof LForm>>();
        const form = reactive({
            userInfo: {
                userName: '',
                password: '',
            },
            rules: {
                userName: { required: true, message: '请输入用户名' },
                password: { required: true, message: '请输入密码' },
            },
        });

        const login = () => {
            formRef.value?.validate((pass: boolean) => {
                Message({ title: '校验结果', message: pass ? '校验成功' : '校验失败' });
            });
        };
        return {
            ...toRefs(form),
            formRef,
            login,
        };
    },
});
</script>
