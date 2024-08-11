import { Input, Form } from "antd";
import { NamePath } from "antd/es/form/interface";

interface Props {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
}

export const PasswordInput: React.FC<Props> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: "Заполните поле" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли должгы совподать"));
            } else {
              if (value.length <= 6) {
                return Promise.reject(
                  new Error("Пароль долшен быть длинее 6-ти символов")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size={"large"} />
    </Form.Item>
  );
};
