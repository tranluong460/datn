import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";
import {
  Menu,
  Badge,
  Layout,
  Avatar,
  Popover,
  Dropdown,
  Breadcrumb,
  message,
} from "antd";

import {
  TbBrandBooking,
  LiaHotelSolid,
  PiLightbulbFilament,
  IoNotificationsOutline,
  MdOutlineDashboardCustomize,
  MdOutlineRoomPreferences,
  AiOutlineHdd,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSetting,
} from "../../icons";
import { Logo } from "../../components";
import { useInfoAccountQuery, useLogoutAccountMutation } from "../../api";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const BaseAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutUser] = useLogoutAccountMutation();
  const { data } = useInfoAccountQuery("");

  const logoutAccount = () => {
    logoutUser(null)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => navigate(key.toString()),
    } as MenuItem;
  };

  const menuItems: MenuItem[] = [
    getItem("Dashboard", "/admin", <MdOutlineDashboardCustomize />),
    getItem("Đặt Phòng", "/admin/booking-manager", <TbBrandBooking />),
    getItem("Khách sạn", "/admin/hotel-manager", <LiaHotelSolid />),
    getItem("Phòng", "/admin/room-manager", <MdOutlineRoomPreferences />),
    getItem("Loại phòng", "/admin/roomType-manager", <AiOutlineHdd />),
    getItem("Tiện ích", "/admin/amenities-manager", <PiLightbulbFilament />),
    getItem("Người dùng", "/admin/user-manager", <AiOutlineUser />),
  ];

  // eslint-disable-next-line
  const selectedMenuItem: any = menuItems.find(
    (item) => item?.key === location.pathname
  );

  const breadcrumbItems = [
    {
      href: "/admin",
      title: (
        <p className="mt-1">
          <AiOutlineHome />
        </p>
      ),
    },
    {
      href: selectedMenuItem?.key,
      title: selectedMenuItem?.label,
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Cài đặt",
      icon: <AiOutlineSetting />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <AiOutlineLogout />,
      danger: true,
      onClick: logoutAccount,
    },
  ];

  const content = (
    <>
      <p>Thông báo 1</p>
      <p>Thông báo 2</p>
      <p>Thông báo 3</p>
      <p>Thông báo 4</p>
      <p>Thông báo 5</p>
    </>
  );

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
          theme="light"
          collapsible={true}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="flex justify-center items-center">
            <Logo url="/admin" />
          </div>

          <Menu
            theme="light"
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            items={menuItems}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 30,
              display: "flex",
              background: "white",
              alignItems: "center",
              justifyContent: "right",
              gap: 30,
            }}
          >
            <Popover
              trigger="click"
              content={content}
              placement="bottomRight"
              className="cursor-pointer"
            >
              <Badge count={999} size="small">
                <IoNotificationsOutline size={22} />
              </Badge>
            </Popover>

            <Dropdown menu={{ items }} className="cursor-pointer">
              <Avatar
                size="large"
                src={
                  <img src={data?.data?.image || "/admin.png"} alt="avatar" />
                }
              />
            </Dropdown>
          </Header>

          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb
              style={{ margin: "16px 0" }}
              separator="/"
              items={breadcrumbItems}
            />

            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
              className="bg-light"
            >
              <Outlet />
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }} className="bg-white">
            Hotel ©2023 Created by Alone
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseAdmin;
