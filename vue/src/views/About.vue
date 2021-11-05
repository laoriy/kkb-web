<template>
    about page
    <button class="back" @click="back">back to home</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from '@/router/lvue-router';

export default defineComponent({
    setup() {
        const router = useRouter();
        const back = () => {
            router.go(-1);
        };
        return {
            back,
        };
    },
});
</script>
