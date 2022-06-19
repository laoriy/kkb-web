import { Store } from "../types";

export class FormStore {
  // 保存数据状态的变量
  private store: Store = {};
  // 设置initialValues，如果init为true，则顺带更新store
  public setInitialValues = (initialValues: Store = {}) => {
    this.store = { ...this.store, ...initialValues };
  };

  public getFieldValue = (name: string) => {
    return this.store[name];
  };

  public getFieldsValue = () => {
    return {
      ...this.store,
    };
  };
  public validateFields = () => {
    const store = { ...this.store };

    const errors = [];
    for (let name in store) {
      if (store[name] === undefined) {
        errors.push({ [name]: "error" });
      }
    }
    if (errors.length) {
      return Promise.reject(errors);
    }
    return Promise.resolve(store);
  };
}

export interface FormInstance {
  setInitialValues: typeof FormStore.prototype.setInitialValues;
  getFieldValue: typeof FormStore.prototype.getFieldValue;
  getFieldsValue: typeof FormStore.prototype.getFieldsValue;
  validateFields: typeof FormStore.prototype.validateFields;
}
