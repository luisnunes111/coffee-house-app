import {Layout, Menu} from "antd";
import React from "react";
import Navbar from "./Navbar";

const {Content, Footer} = Layout;

const Template: React.FC<any> = React.memo(props => {
	return (
		<Layout style={{minHeight: "100vh", display: "flex"}}>
			<Navbar />
			<Content style={{flex: 1, position: "relative", display: "flex"}}>
				<Layout style={{background: "#fff", minHeight: "100%", flex: 1, padding: "0 24px"}}>{props.children}</Layout>
			</Content>
			<Footer style={{textAlign: "center"}}>Cocus ©2020 Created by Luis Nunes</Footer>
		</Layout>
	);
});

export default Template;
