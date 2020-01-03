import {Layout, Menu, Badge, Button} from "antd";
import React, {useMemo} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {AppState} from "../configurations/redux";
import {logoutAction} from "../store/user/actions";
const {Header} = Layout;

const Navbar: React.FC<any> = React.memo(props => {
	const {items} = useSelector((app: AppState) => app.notifications);
	const {data: user} = useSelector((app: AppState) => app.user);
	const toReadCount = useMemo(() => items?.filter(n => n.is_read === false).length || 0, [items]);
	const {pathname} = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	const _logout = () => {
		dispatch(logoutAction());
		history.push("/");
	};

	return (
		<Header className="header" style={{display: "flex"}}>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={[pathname === "/products" ? "1" : "", pathname === "/notifications" ? "2" : ""]}
				style={{lineHeight: "64px", flex: 1}}>
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
			<div>
				<span style={{color: "#fefefe", paddingRight: 10}}>
					Hello <b>{user?.name}</b>!
				</span>
				<Button type="default" onClick={_logout}>
					Logout
				</Button>
			</div>
		</Header>
	);
});

export default Navbar;
