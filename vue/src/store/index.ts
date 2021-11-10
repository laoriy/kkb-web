import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
    count: number;
}
export const key: InjectionKey<Store<State>> = Symbol();

// define your own `useStore` composition function
export function useStore(): Store<State> {
    return baseUseStore(key);
}
const store = createStore<State>({
    state: {
        count: 0,
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
