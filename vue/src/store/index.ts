import { InjectionKey } from 'vue';
import { Store, useStore as baseUseStore, createStore } from 'vuex';
// import { createStore, useStore as baseUseStore, Store } from './lvuex';

export interface State {
    count: number;
}

// define your own `useStore` composition function
// export function useStore(): Store<State> {
//     return baseUseStore<Store<State>>();
// }

export const key: InjectionKey<Store<State>> = Symbol();
// 定义自己的 `useStore` 组合式函数
export function useStore(): Store<State> {
    return baseUseStore(key);
}
const store = createStore<State>({
    state: {
        count: 0,
    },
    getters: {
        count: (state) => state.count,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        double(state) {
            state.count *= 2;
        },
    },
    actions: {
        doubleCount(context) {
            setTimeout(() => {
                context.commit('double');
            }, 1000);
        },
    },
});

export default store;
