import {Modal} from "antd";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {AppState} from "../../configurations/redux";

const DetailsPage: React.FC<RouteComponentProps> = React.memo(props => {
	const {items, error, loading} = useSelector((state: AppState) => state.products);
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleModalOk = async () => {
		setConfirmLoading(true);

		//call delete request
		if (false) {
			setConfirmLoading(false);
			setModalVisible(false);
		}
	};

	const handleModalCancel = () => {
		setModalVisible(false);
	};

	const showModal = () => {
		setModalVisible(true);
	};

	return (
		<>
			<Modal title="Title" visible={modalVisible} onOk={handleModalOk} confirmLoading={confirmLoading} onCancel={handleModalCancel}>
				<p>Are you sure that you want to delete this item?</p>
			</Modal>
		</>
	);
});

export default DetailsPage;
