import HocPage from "./pages/HocPage";
import FormPage from "./pages/FormPage";
import FormPage2 from "./pages/FormPage2";
import FormCustom from "./pages/FormCustom";
import DialogPage from "./pages/DialogPage";

function App() {
  return (
    <div className="App">
      {/* 高阶组件 */}
      <HocPage />
      {/* 表单组件 */}
      <FormPage />
      {/* 表单组件2 */}
      <FormPage2 />
      {/* 表单组件自定义 */}
      <FormCustom />
      {/* 弹框组件 */}
      <DialogPage />
    </div>
  );
}

export default App;
