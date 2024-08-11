import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { Employee } from "../../types";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Загрузка..</span>;
  }

  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editedEmployee = { ...data, ...employee };

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align={"middle"} justify={"center"}>
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEditEmployee}
        ></EmployeeForm>
      </Row>
    </Layout>
  );
};
