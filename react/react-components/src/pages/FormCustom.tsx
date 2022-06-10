import { LFrom } from "../components/form";
import { Button } from "antd";
import { FC } from "react";

const FormPage: FC = () => {
  const [form] = LFrom.useForm();
  const validate = async () => {
    const isValid = await form.validateFields();
    console.log(isValid);
  };
  const submit = () => {
    validate();
    console.log("submit", form.getFieldsValue());
  };

  return (
    <div>
      <h3>FormCustom</h3>
      <LFrom form={form} initialValues={{ name: true }}>
        <LFrom.Item name="name" rules={[{ required: true }]}>
          <input placeholder="please input ur name" />
        </LFrom.Item>
        <LFrom.Item name="password" rules={[{ required: true }]}>
          <input type="password" placeholder="please input ur password" />
        </LFrom.Item>
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </LFrom>
    </div>
  );
};

export default FormPage;
