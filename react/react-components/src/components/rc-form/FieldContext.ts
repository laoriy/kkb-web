import { createContext } from "react"
import { FormInstance } from "./useForm"

const FieldContext = createContext({} as FormInstance)

export { FieldContext }
