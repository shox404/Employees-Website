import { Input, Form } from "antd";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
}

export const CustomInput: React.FC<Props> = ({
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Form.Item name={name} shouldUpdate={true} rules={[{ required: true, message: "Заполните поле"}]}>
      <Input placeholder={placeholder} type={type} size={"large"} />
    </Form.Item>
  );
};
