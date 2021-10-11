<template>
    <FormComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormComponent from '@/components/form/index.vue';

export default defineComponent({
    components: { FormComponent },
    name: 'App',
});
</script>
