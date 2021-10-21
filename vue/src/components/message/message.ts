import { VNode, createVNode, render } from 'vue';
import MessageConstructor from './message.vue';
export type IMessageOptions = {
    duration?: number; // default 3000
    message?: string | VNode;
    title?: string;
};

const Message = (opts: IMessageOptions | string): void => {
    if (typeof opts === 'string') {
        opts = {
            message: opts,
        };
    }

    let options: IMessageOptions = opts;
    options = {
        ...options,
    };

    const container = document.createElement('div');
    const vm = createVNode(MessageConstructor, options);

    render(vm, container);

    vm.props!.onDestroy = () => {
        render(null, container);
    };

    document.body.appendChild(container.firstElementChild as Node);
};

export default Message;
