import { useRef } from "react"

type PlaneObj = Record<string, any>
type Callbacks = {
    onFinish?: (val: any) => void
    onFinishFailed?: (val: any) => void
}
class FormStore {
    store: PlaneObj
    fieldsEntities: any[]
    cbs: Callbacks
    constructor() {
        this.store = {}
        this.fieldsEntities = []
        this.cbs = {}
        console.log(this.cbs, "cb1start")
    }
    registerFields = (entity: any) => {
        this.fieldsEntities.push(entity)
        return () => {
            this.fieldsEntities = this.fieldsEntities.filter(
                (item) => item !== entity
            )
            delete this.store[entity.name]
        }
    }

    setCallbacks = (cbs: Callbacks) => {
        this.cbs = { ...this.cbs, ...cbs }
    }

    getFieldValue = (name: string) => {
        return this.store[name]
    }
    setFieldValue = (nesStore: PlaneObj) => {
        this.store = {
            ...this.store,
            ...nesStore,
        }
        this.fieldsEntities.forEach((entity) => {
            entity.onStoreChange()
        })
    }

    getFieldsValue = () => {
        return this.store
    }
    validate = () => {
        let err: PlaneObj[] = []
        this.fieldsEntities.forEach((entity) => {
            let { name, rules } = entity
            let value = this.getFieldValue(name)
            let rule = rules && rules[0]
            if (
                rule &&
                rule.required &&
                (value === undefined || value === "")
            ) {
                err.push({
                    [name]: rule.message,
                    value,
                })
            }
        })
        return err
    }
    submit = () => {
        const { onFinish, onFinishFailed } = this.cbs

        // 校验
        let error = this.validate()
        if (error.length === 0) {
            onFinish?.(this.getFieldsValue())
        } else {
            onFinishFailed?.(error)
        }
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            registerFields: this.registerFields,
            setFieldValue: this.setFieldValue,
            setCallbacks: this.setCallbacks,

            submit: this.submit,
        }
    }
}

export type FormInstance = ReturnType<FormStore["getForm"]>

export function useForm(form?: any) {
    const formRef = useRef<FormInstance>()
    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }
    return [formRef.current!]
}
