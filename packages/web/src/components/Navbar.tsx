import {Layout, Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";
const {Header} = Layout;

const Navbar: React.FC<any> = React.memo(props => {
	return (
		<Header className="header">
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{lineHeight: "64px"}}>
				<Menu.Item key="1">
					<Link to="/products">Products</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/notifications">Notifications</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
});

export default Navbar;
