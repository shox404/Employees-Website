import { Alert } from "antd";

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Alert message={message} type={"error"}/>;
};
