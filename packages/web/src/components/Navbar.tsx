import {Layout, Menu, Badge} from "antd";
import React, {useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppState} from "../configurations/redux";
const {Header} = Layout;

const Navbar: React.FC<any> = React.memo(props => {
	const {items} = useSelector((app: AppState) => app.notifications);
	const toReadCount = useMemo(() => items?.filter(n => n.is_read === false).length || 0, [items]);
	const {pathname} = useLocation();
	return (
		<Header className="header">
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={[pathname === "/products" ? "1" : "", pathname === "/notifications" ? "2" : ""]}
				style={{lineHeight: "64px"}}>
				<Menu.Item key="1">
					<Link to="/products">Products</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/notifications">
						Notifications
						{toReadCount > 0 && (
							<Badge
								style={{marginLeft: 7, fontWeight: "bold", backgroundColor: "#2db7f5", boxShadow: "none"}}
								count={toReadCount}
							/>
						)}
					</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
});

export default Navbar;
