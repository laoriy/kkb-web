import { FC, useMemo } from "react";
import { Store } from "./types";

import { useForm } from "./hooks/useForm";
import { FormInstance } from "./core/formStore";
import FieldContext from "./core/fieldContext";
import Field from "./Field";
type BaseFormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
>;
// 第一阶段的props需要实现的参数只有initialValues、children
export interface FormProps extends BaseFormProps {
  initialValues?: Store;
  children?: React.ReactNode;
  form?: FormInstance;
}
type FormTypes = FC<FormProps> & {
  useForm: typeof useForm;
  Item: typeof Field;
};
const Form: FormTypes = ({ initialValues, children, form }) => {

  const [formInstance] = useForm(form);
  formInstance.setInitialValues(initialValues);

  const fieldContextValue: FormInstance = useMemo(
    () => ({
      ...formInstance,
    }),
    [formInstance]
  );

  const wrapperNode = (
    <FieldContext.Provider value={fieldContextValue}>
      {children}
    </FieldContext.Provider>
  );
  return <form>{wrapperNode}</form>;
};

Form.useForm = useForm;
Form.Item = Field;

export default Form;
