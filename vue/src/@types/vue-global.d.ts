import Message from '@/components/message';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $message: typeof Message;
    }
}
