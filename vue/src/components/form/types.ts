import { RuleItem } from "async-validator";

export const injectFormKey = Symbol('form');
export const injectFormItemKey = Symbol('form-item');

export type FormItemRule = RuleItem

export type injectFormType = {
    rules: Record<string, FormItemRule[]>;
    model: Record<string, unknown>;
};

export type injectFormItem = {
    validate: () => void;
} | undefined;
