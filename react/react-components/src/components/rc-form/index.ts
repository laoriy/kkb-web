import { useForm } from "./useForm"
import { Form } from "./Form"
import { Field } from "./Field"

let _Form: typeof Form & {
    useForm: typeof useForm
    Field: typeof Field
} = Form as any
_Form.useForm = useForm
_Form.Field = Field

export { useForm, Field }

export default _Form
