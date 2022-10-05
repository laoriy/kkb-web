import { Input } from "antd"
import React, { useEffect, useState } from "react"
import Form, { Field } from "../components/rc-form"

const nameRules = [{ required: true, message: "请输入姓名" }]
const passwordRules = [{ required: true, message: "请输入密码" }]

export default function RcFormPage() {
    const [show, setShow] = useState(true)
    const [form] = Form.useForm()
    const onFinish = (val: any) => {
        console.log("onFinishFailed", val)
    }
    const onFinishFailed = (val: any) => {
        console.log("onFinishFailed", val)
    }

    useEffect(() => {
        console.log("form", form)
        form.setFieldValue({ username: "default" })
    })
    return (
        <div>
            <h3>rcFiledForm</h3>
            <button onClick={() => setShow(!show)}>change</button>

            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {show && (
                    <Field name="username" rules={nameRules}>
                        <Input placeholder="input UR Username" />
                    </Field>
                )}
                <Field name="password" rules={passwordRules}>
                    <Input placeholder="input UR Password" />
                </Field>
                <button>Submit</button>
            </Form>
        </div>
    )
}
