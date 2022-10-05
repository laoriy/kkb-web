import React, { FC, useContext, useEffect } from "react"
import { FieldContext } from "./FieldContext"
type FieldTypes = {
    children: any
    name: string
    rules: any
}

export const Field: FC<FieldTypes> = (props) => {
    const { children, name } = props
    const [_ignored, forceUpdate] = React.useReducer((x) => x + 1, 0)
    const { getFieldValue, registerFields, setFieldValue } =
        useContext(FieldContext)
    const onStoreChange = () => {
        forceUpdate()
    }
    useEffect(() => {
        const unregister = registerFields?.({ ...props, onStoreChange })
        return () => {
            if (unregister) {
                unregister()
            }
        }
    }, [])

    const getControlled = () => {
        return {
            value: getFieldValue?.(name),
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                let newVal = event?.target.value
                // 存储
                setFieldValue({ [name]: newVal })
            },
        }
    }
    const returnChildNode = React.cloneElement(children, getControlled())
    return (
        <div>
            <h3>{returnChildNode}</h3>
        </div>
    )
}
