import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { items } from "./SidebarItems";
import Routes from "./Routes";
import { Link } from "react-router-dom";

import logo from "../../assets/Img/logo.png";

const { Header, Sider } = Layout;

export default function Index() {

  const [collapsed, setCollapsed] = useState(false);
  const year = new Date().getFullYear()

  return (
    <Layout>
      <Header className="position-sticky ps-4 top-0 bg-white">
        <div className="logo">
          <Link to="/"><img src={logo} alt={window.appName + " Logo"} /></Link>
        </div>
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          width={220}
          className="bg-white position-fixed vh-100"
          style={{ top: 64 }}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout className="p-4" style={{ marginLeft: !collapsed ? 220 : 80, transition: "all 0.2s" }}>

          <Routes />

          <footer className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="mb-0 text-center">&copy; {year}. All Rights Reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </Layout>
      </Layout>
    </Layout >
  )
}