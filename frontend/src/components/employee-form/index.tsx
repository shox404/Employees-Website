import { Card, Form, Space } from "antd";
import { Employee } from "../../types";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";

interface Props<T> {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
}

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "25rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput name="firstName" placeholder="Имя" />
        <CustomInput name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput name="address" placeholder="Адрес" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
