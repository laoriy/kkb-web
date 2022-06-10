import { FormInstance } from "./formStore";
import * as React from "react";

export type FieldContextValues = FormInstance;

// @ts-ignore
const Context = React.createContext<FieldContextValues>({});

Context.displayName = "FieldContext";

export default Context;
