import { Form, Input, Button } from "antd";
import { FC } from "react";

const FormPage: FC = () => {
  const [form] = Form.useForm();
  const validate = async () => {
    const isValid = await form.validateFields();
    console.log(isValid);
  };
  const submit = () => {
    validate();
    console.log("submit", form.getFieldsValue(true));
  };

  return (
    <div>
      <h3>FormPage2</h3>
      <Form form={form} initialValues={{ name: true, password: "2" }}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="please input ur name" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input type="password" placeholder="please input ur password" />
        </Form.Item>
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </Form>
    </div>
  );
};

export default FormPage;
