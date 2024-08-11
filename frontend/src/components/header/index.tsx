import { Layout, Space, Typography } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
import styles from "./index.module.css";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(Paths.login);
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="link">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton icon={<LogoutOutlined />} onClick={onLogoutClick}>
          Выйти{" "}
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />}>Войти</CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
