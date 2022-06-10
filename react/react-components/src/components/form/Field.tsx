import { FC } from "react";
import FieldContext from "./core/fieldContext";
import * as React from "react";
type FieldProps = {
  children?: React.ReactNode;
  name: string;
  rules?: any[];
  label?: string;
  initialValue?: any;
};
const Field: FC<FieldProps> = (props) => {
  const { children, name } = props;
  const [_ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  return (
    <FieldContext.Consumer>
      {(value) => {
        /**初始值 */
        if (value.getFieldValue(name!) === undefined) {
          value.setInitialValues({
            [name]: undefined,
          });
        }
        const onChange = (e: Event & { target: HTMLInputElement }) => {
          forceUpdate();
          value.setInitialValues({
            [name]: e.target.value,
          });
        };
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...children.props,
            name,
            value: value.getFieldValue(name!),
            onChange,
          });
        } else {
          return children;
        }
      }}
    </FieldContext.Consumer>
  );
};

export default Field;
