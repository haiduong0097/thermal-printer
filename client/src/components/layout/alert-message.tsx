import { FC } from "react";
import Alert from "react-bootstrap/Alert";

type AlertMessageProps = {
  info: {
    type: string;
    message: string;
  } | null;
};

const AlertMessage: FC<AlertMessageProps> = ({ info }) => {
  const renderMessage = () => {
    if (info) {
      return <Alert variant={info.type}>{info.message}</Alert>;
    }
    return <></>;
  };
  return <>{renderMessage()}</>;
};

export default AlertMessage;
