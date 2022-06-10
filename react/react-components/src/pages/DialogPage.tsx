import { Button } from "antd";
import { FC, useState } from "react";
import Dialog from "../components/dialog";
const DialogPage: FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <h3>DialogPage</h3>
      <Button onClick={() => setShowDialog(!showDialog)}>显示隐藏</Button>
      {showDialog && <Dialog />}
    </div>
  );
};

export default DialogPage;
