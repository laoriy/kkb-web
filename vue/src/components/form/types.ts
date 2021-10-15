export const injectFormKey = Symbol('form');
export const injectFormItemKey = Symbol('form-item');

export type injectFormType = {
    rules: Record<string, unknown[]>;
    model: Record<string, unknown>;
};

export type injectFormItem = {
    validate: () => void;
} | undefined;
