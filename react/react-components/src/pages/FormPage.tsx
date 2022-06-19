import { Form, Input, Button } from "antd";
import { FC, useState } from "react";

const FormPage: FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {
    console.log("submit", { name, password });
  };
  return (
    <div>
      <h3>FormPage</h3>
      <Form>
        <Form.Item>
          <Input
            placeholder="please input ur name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="please input ur password"
          />
        </Form.Item>
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </Form>
    </div>
  );
};

export default FormPage;
