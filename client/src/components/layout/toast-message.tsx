import { FC } from "react";
import Toast from "react-bootstrap/Toast";
import { DEFAULT_DELAY } from "../../utils/constant";

type ToastMessageProps = {
  showToast: {
    show: boolean;
    message: string;
    type: string | null;
  };
  setShowToast: (showToast: {
    show: boolean;
    message: string;
    type: string | null;
  }) => void; // reset showToast
  delay?: number;
};

const ToastMessage: FC<ToastMessageProps> = (props) => {
  const {
    showToast: { show, message, type },
    setShowToast,
  } = props;
  const delay = props.delay ?? DEFAULT_DELAY;

  return (
    <Toast
      show={show}
      style={{ position: "fixed", top: "20%", right: "10px" }}
      className={`bg-${type} text-white`}
      onClose={setShowToast.bind(this, {
        show: false,
        message: "",
        type: null,
      })}
      delay={delay}
      autohide
    >
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
