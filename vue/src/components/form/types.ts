export const injectFormKey = Symbol('form');

export type injectFormType = {
    rules: unknown[];
    form: Record<string, unknown>;
};
