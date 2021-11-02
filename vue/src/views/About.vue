<template>
    about page
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
    setup() {
        const context = getCurrentInstance();
        console.log(context?.proxy?.$router);
    },
});
</script>
