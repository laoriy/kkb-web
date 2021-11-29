import { App, reactive, inject } from 'vue';
import { GetterTree, MutationTree, ActionTree } from 'vuex';
export interface StoreOptions<S> {
    state: S;
    getters?: GetterTree<S, S>;
    actions?: ActionTree<S, S>;
    mutations?: MutationTree<S>;
}
const lVuexKey = Symbol('lvuex');
export class Store<S> {
    public state: S;
    public mutations: MutationTree<S> = Object.create(null);
    public actions: ActionTree<S, S> = Object.create(null);
    public getters: GetterTree<S, S> = Object.create(null);
    constructor(options: StoreOptions<S>) {
        const { state, mutations, actions, getters: _getters } = options;
        this.state = reactive(state as any);
        if (mutations) {
            this.mutations = mutations;
        }
        if (actions) {
            this.actions = actions;
        }
        if (_getters) {
            Object.keys(_getters).forEach((key) => {
                const fn = _getters[key];
                Object.defineProperty(this.getters, key, {
                    get: () => {
                        return fn(this.state, _getters, this.state, this.state);
                    },
                });
            });
        }
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    install(app: App): void {
        app.config.globalProperties.$store = this;
        app.provide(lVuexKey, this);
    }

    dispatch(this: Store<S>, type: string, payload?: () => void): void {
        const entry = this.actions[type];

        if (entry && typeof entry === 'function') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return entry(this, payload);
        }
    }
    commit(type: string, payload?: () => void): void {
        const entry = this.mutations[type];
        if (entry) {
            console.log('ss');

            entry(this.state, payload);
        }
    }
}

const createStore = <T>(data: StoreOptions<T>): Store<T> => {
    return new Store(data);
};

const useStore = <T>(): T => {
    return inject(lVuexKey) as T;
};

export { createStore, useStore };
