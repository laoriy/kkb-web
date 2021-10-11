<template>
    <div>
        <slot></slot>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        model: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object,
        },
    },
    // setup() {},
});
</script>
