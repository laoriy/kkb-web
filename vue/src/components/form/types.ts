import { RuleItem, ValidateCallback } from 'async-validator';
import mitt from 'mitt';
export const injectFormKey = Symbol('form');
export const injectFormItemKey = Symbol('form-item');

export type FormItemRule = RuleItem | RuleItem[];

export type injectFormType = {
    rules: Record<string, FormItemRule>;
    model: Record<string, unknown>;
    formMitt: ReturnType<typeof mitt>;
};

export const lFormEvents = {
    addField: 'l.form.addField',
    removeField: 'l.form.removeField',
} as const;

export type lFormItemContext = {
    validate(callback?: ValidateCallback): void;
    prop?: string;
};
export type lFormEventsType = Record<typeof lFormEvents[keyof typeof lFormEvents], lFormItemContext>;

export type injectFormItem =
    | {
          validate: () => void;
      }
    | undefined;
