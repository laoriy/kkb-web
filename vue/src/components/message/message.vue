<template>
    <div class="box" v-show="visible">
        <h3>{{ title }}</h3>
        <p class="box-content">{{ message }}</p>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/runtime-core';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: '',
        },
        message: {
            type: String,
            default: '',
        },
        duration: {
            type: Number,
            default: 1000,
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            visible: false,
        });
        const hide = () => {
            state.visible = false;
            emit('destroy');
        };
        const show = () => {
            const { duration } = props;
            state.visible = true;
            setTimeout(hide, duration);
        };
        onMounted(() => {
            show();
        });
        return {
            ...toRefs(state),
            hide,
            show,
        };
    },
});
</script>

<style lang="less" scoped>
.box {
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
    background-color: #fff;
    border: grey 3px solid;
    box-sizing: border-box;
}
.box-content {
    width: 200px;
    margin: 10px auto;
    font-size: 14px;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    margin-bottom: 8px;
}
</style>
