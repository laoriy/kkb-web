<template>
    <LInput v-model="avalue" />
</template>

<script lang="ts">
import LInput from './components/form/LInput.vue';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    components: { LInput },
    name: 'App',
    setup() {
        const state = reactive({
            avalue: '123',
        });
        return {
            ...toRefs(state),
        };
    },
});
</script>
