import React from "react"
import { FieldContext } from "./FieldContext"
import { useForm } from "./useForm"

type FormTypes = {
    children: React.ReactNode
    form: any
    onFinish: (val: any) => void
    onFinishFailed: (val: any) => void
}
export function Form({
    children,
    form,
    onFinish,
    onFinishFailed,
    ...restProps
}: FormTypes) {
    const [formInstance] = useForm(form)

    formInstance.setCallbacks?.({
        onFinish,
        onFinishFailed,
    })
    return (
        <div>
            <form
                {...restProps}
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // 提交
                    formInstance.submit()
                }}
            >
                <FieldContext.Provider value={formInstance}>
                    {children}
                </FieldContext.Provider>
            </form>
        </div>
    )
}
