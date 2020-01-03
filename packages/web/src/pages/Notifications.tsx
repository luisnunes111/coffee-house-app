import {PageHeader, Spin, List, Avatar, Typography, Icon, notification, message} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, Link} from "react-router-dom";
import {AppState} from "../configurations/redux";
import {loadNotificationsAction} from "../store/notifications/actions";
import {withPageTemplate} from "../utils/withTemplate";
import API from "../api";

const {Text} = Typography;

const NotificationsPage: React.FC<RouteComponentProps> = React.memo(props => {
	const {items, error, loading} = useSelector((state: AppState) => state.notifications);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadNotificationsAction());
	}, []);

	const _markNotificationAsRead = async (id: string) => {
		const result = await API.notifications.markAsRead(id);
		if (result.success) {
			dispatch(loadNotificationsAction());
			message.success("Marked as read.");
		} else {
			message.info(result.error);
		}
	};

	const _deleteNotification = async (id: string) => {
		const result = await API.notifications.deleteIt(id);
		if (result.success) {
			dispatch(loadNotificationsAction());
			message.success("Notification deleted.");
		} else {
			message.info(result.error);
		}
	};

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
										<Icon type="check-square" onClick={() => _markNotificationAsRead(item.id)} />
									),
									<Icon type="delete" onClick={() => _deleteNotification(item.id)} />,
								]}>
								<List.Item.Meta
									avatar={
										<Avatar
											style={{height: 60, width: 60}}
											src="http://d3a1v57rabk2hm.cloudfront.net/volunteercrate/delight_mobile-copy-0/images/product_placeholder.jpg"
										/>
									}
									title={
										<div>
											{item.message}(<Link to={`/product/${item.product.id}/details`}>{item.product.name}</Link>)
										</div>
									}
									description={
										<div>
											<span>Quantity Before: {item.description.quantityBefore}</span>
											<span style={{paddingLeft: 5}}>Quantity After: {item.description.quantityAfter}</span>
											<span style={{paddingLeft: 5}}>{item.from_user && "Refilled by " + item.from_user.name}</span>
											<span style={{paddingLeft: 5}}>{new Date(item.created_at).toLocaleDateString()}</span>
										</div>
									}
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
