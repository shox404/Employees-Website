import { useEffect } from "react";
import { Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { Employee } from "../../types";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import type { ColumnsType } from "antd/es/table";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

  const goToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
