// import { InjectionKey } from 'vue';
// // import { Store } from 'vuex';
import { createStore, useStore as baseUseStore, Store } from './lvuex';

export interface State {
    count: number;
}

// define your own `useStore` composition function
export function useStore(): Store<State> {
    return baseUseStore<Store<State>>();
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
