import { StoreOptions } from 'vuex';
import { App, shallowRef, inject, Ref } from 'vue';

const lVuexKey = Symbol('lvuex');
export class Store<S> {
    public state: Ref<S>;
    constructor(options: StoreOptions<S>) {
        const { state } = options;
        this.state = shallowRef(state);
    }

    // readonly state: unknown;
    readonly getters: unknown;

    install(app: App): void {
        app.config.globalProperties.$store = this;
        app.provide(lVuexKey, this);
    }

    // replaceState(state: S): void;

    // dispatch: Dispatch;
    // commit: Commit;

    // subscribe<P extends MutationPayload>(
    //     fn: (mutation: P, state: S) => any,
    //     options?: SubscribeOptions
    // ): () => void;
    // subscribeAction<P extends ActionPayload>(
    //     fn: SubscribeActionOptions<P, S>,
    //     options?: SubscribeOptions
    // ): () => void;
    // watch<T>(
    //     getter: (state: S, getters: any) => T,
    //     cb: (value: T, oldValue: T) => void,
    //     options?: WatchOptions
    // ): () => void;

    // registerModule<T>(path: string, module: Module<T, S>, options?: ModuleOptions): void;
    // registerModule<T>(path: string[], module: Module<T, S>, options?: ModuleOptions): void;

    // unregisterModule(path: string): void;
    // unregisterModule(path: string[]): void;

    // hasModule(path: string): boolean;
    // hasModule(path: string[]): boolean;

    // hotUpdate(options: {
    //     actions?: ActionTree<S, S>;
    //     mutations?: MutationTree<S>;
    //     getters?: GetterTree<S, S>;
    //     modules?: ModuleTree<S>;
    // }): void;
}

// {
//     state: {
//         count: 0,
//     },
//     mutations: {
//         increment(state) {
//             state.count++;
//         },
//         double(state) {
//             state.count *= 2;
//         },
//     },
//     actions: {
//         doubleCount(context) {
//             setTimeout(() => {
//                 context.commit('double');
//             }, 1000);
//         },
//     },
// }

const createStore = <T>(data: StoreOptions<T>): Store<T> => {
    return new Store(data);
};

const useStore = <T>(): T => {
    return inject(lVuexKey) as T;
};

export { createStore, useStore };
