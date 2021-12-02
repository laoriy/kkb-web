<template>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-view></router-view>
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

<style>
html {
    font-size: 50px;
}
body {
    margin: 0;
    font-size: 12px;
}
</style>
