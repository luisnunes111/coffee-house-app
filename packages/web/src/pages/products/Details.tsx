import {Modal, Button, PageHeader, Descriptions, notification} from "antd";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, useParams} from "react-router-dom";
import {AppState} from "../../configurations/redux";
import {withPageTemplate} from "../../utils/withTemplate";
import API from "../../api";
import {getProductType} from "./utils/typeConversion";
import {UserRole} from "../../utils/validations/register";

const DetailsPage: React.FC<RouteComponentProps> = React.memo(props => {
	const {id} = useParams();
	const [data, setData] = useState<Models.IProductListItem | null>();
	const [modalVisible, setModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const {data: user} = useSelector((state: AppState) => state.user);

	useEffect(() => {
		API.products.details(id!).then(r => r.success && setData(r.data));
	}, []);

	const _handleModalOk = async () => {
		setConfirmLoading(true);

		setTimeout(async () => {
			//call delete request
			const result = await API.products.deleteIt(id!);

			setConfirmLoading(false);
			setModalVisible(false);

			if (result.success) {
				props.history.push("/products");
				notification.success({
					message: "Success",
					description: "Product deleted successfully",
				});
			} else {
				notification.error({
					message: "Error",
					description: result.error,
				});
			}
		}, 300);
	};

	const _handleModalCancel = () => {
		setModalVisible(false);
	};

	const _showModal = () => {
		setModalVisible(true);
	};

	return (
		<>
			<PageHeader
				ghost={false}
				onBack={() => props.history.goBack()}
				title="Product Details"
				extra={[
					user?.role === UserRole.Manager && (
						<Button key="1" onClick={() => _showModal()}>
							Delete
						</Button>
					),
					<Button key="2" type="primary" onClick={() => props.history.push(`/product/${id}/update/`)}>
						Update
					</Button>,
				]}
			/>
			<div style={{margin: "20px 10% 0 10%"}}>
				{data && (
					<>
						<Descriptions title="General Info">
							<Descriptions.Item label="Name">{data.name}</Descriptions.Item>
							<Descriptions.Item label="Quantity">{data.quantity}</Descriptions.Item>
							<Descriptions.Item label="Type">{getProductType(data.type)}</Descriptions.Item>
							<Descriptions.Item label="Description">{data.description}</Descriptions.Item>
						</Descriptions>
						<Descriptions title="Dates">
							<Descriptions.Item label="Created in">{new Date(data.created_at).toLocaleString()} </Descriptions.Item>
							<Descriptions.Item label="Updated in">{new Date(data.updated_at).toLocaleString()}</Descriptions.Item>
						</Descriptions>
					</>
				)}

				<Modal
					title="Title"
					visible={modalVisible}
					onOk={_handleModalOk}
					confirmLoading={confirmLoading}
					onCancel={_handleModalCancel}>
					<p>Are you sure that you want to delete this item?</p>
				</Modal>
			</div>
		</>
	);
});

export default withPageTemplate(DetailsPage);
