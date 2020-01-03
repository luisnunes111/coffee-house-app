import {PageHeader, Spin, List, Avatar, Typography, Icon} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {AppState} from "../configurations/redux";
import {loadNotificationsAction} from "../store/notifications/actions";
import {withPageTemplate} from "../utils/withTemplate";

const {Text} = Typography;

const NotificationsPage: React.FC<RouteComponentProps> = React.memo(props => {
	const {items, error, loading} = useSelector((state: AppState) => state.notifications);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadNotificationsAction());
	}, []);

	return (
		<>
			<PageHeader ghost={false} onBack={() => props.history.goBack()} title="Notifications" />
			<div
				style={{
					margin: "20px 10% 0 10%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}>
				{!loading && items ? (
					<List
						style={{minHeight: 350}}
						className="demo-loadmore-list"
						itemLayout="horizontal"
						dataSource={items!}
						renderItem={item => (
							<List.Item
								key={item.id}
								actions={[
									item.is_read ? (
										<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
									) : (
										<Icon type="check-square" />
									),
									<Icon type="delete" />,
								]}>
								<List.Item.Meta
									avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
									title={<h1>{item.message}</h1>}
									description="Ant Design, a design language for background applications, is refined by Ant UED Team"
								/>
							</List.Item>
						)}
					/>
				) : items && items.length == 0 && loading == false ? (
					<div>Notifications list is empty!</div>
				) : (
					<Spin size={"large"} />
				)}
			</div>
		</>
	);
});

export default withPageTemplate(NotificationsPage);
