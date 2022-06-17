import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const Dialog: FC = () => {
  const document = window.document;
  const container = useRef<any>(null);

  if (document && !container.current) {
    const div = document.createElement("div");
    div.setAttribute("data-body-portal", "");
    container.current = div;
  }
  useEffect(() => {
    if (!container.current || !document) {
      return;
    }
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);
  return createPortal(
    <div>
      <h2>dialog</h2>
    </div>,
    container.current
  );
};

export default Dialog;
