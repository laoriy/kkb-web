<template>
    <div class="about">
        <Poster ref="posterRef" />
        <button class="back" @click="back">back to home</button>
        <button class="back" @click="create">create a poster</button>
        <button class="back" @click="createSvg">create a svg poster</button>
        <div id="poster">
            <div>这是vuex:</div>
            <div>{{ count }}</div>
            <div>{{ $store.getters.count }}</div>
            <hr />
            <div>
                <button @click="syncCount">同步</button>
                <button @click="asyncCount">异步</button>
            </div>
            这是描述、
            <div></div>
            这个是啥呢
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Poster from '../components/poster/poster.vue';
import { useRouter } from '@/router';
import { createSvgPoster } from '@/utils/createPoster';
import { useStore } from '@/store/index';

export default defineComponent({
    components: { Poster },
    setup() {
        const store = useStore();
        const posterRef = ref<InstanceType<typeof Poster>>();
        const router = useRouter();
        const back = () => {
            router.go(-1);
        };
        const create = () => {
            posterRef.value?.open();
        };

        const createSvg = () => {
            const div = document.querySelector('#app') as HTMLElement;

            createSvgPoster(div!);
        };

        const count = computed(() => store.state.count);
        const syncCount = () => {
            store.commit('increment');
        };
        const asyncCount = () => {
            store.dispatch('doubleCount');
        };

        return {
            back,
            create,
            createSvg,
            posterRef,
            count,
            syncCount,
            asyncCount,
        };
    },
});
</script>

<style lang="less" scoped>
#poster {
    border-radius: 10px;
    width: 400px;
    background-color: orange;
    font-size: 16px;
    padding: 5px;
}
</style>
