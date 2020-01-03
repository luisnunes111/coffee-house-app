import {Button, PageHeader, Table, Tag, Badge, Spin} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {AppState} from "../../configurations/redux";
import {loadProductsAction} from "../../store/products/actions";
import {withPageTemplate} from "../../utils/withTemplate";
import {getProductType, ProductType} from "./utils/typeConversion";
import {UserRole} from "../../utils/validations/register";

const ListPage: React.FC<RouteComponentProps> = React.memo(props => {
	const {items, error, loading} = useSelector((state: AppState) => state.products);
	const {data} = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProductsAction());
	}, []);

	return (
		<>
			<PageHeader
				ghost={false}
				onBack={() => props.history.goBack()}
				title="Products List"
				extra={[
					<Button key="2">Export</Button>,
					data?.role === UserRole.Manager && (
						<Button key="1" type="primary" onClick={() => props.history.push("/products/create")}>
							Create Product
						</Button>
					),
				]}
			/>
			<div style={{margin: "20px 10% 0 10%"}}>
				<ListContent items={items} error={error} loading={loading} push={props.history.push} />
			</div>
		</>
	);
});

export default withPageTemplate(ListPage);

interface IListContent {
	items: Models.IProductsList | null;
	error: string | null | undefined;
	loading: boolean;
	push: (path: string, state?: any) => void;
}

const ListContent: React.FC<IListContent> = React.memo(props => {
	const {error, items, push} = props;

	if (error) {
		return (
			<>
				<h5>Error</h5>
				<p>{error}</p>
			</>
		);
	} else if (!items) {
		return <Spin size={"large"} />;
	} else if (items?.length === 0) {
		return <p>No Products were found.</p>;
	} else {
		return (
			<Table
				columns={columns}
				dataSource={items}
				rowKey={record => record.id}
				onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							push(`/product/${record.id}/details/`);
						},
					};
				}}
			/>
		);
	}
});

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Quantity",
		dataIndex: "quantity",
		key: "quantity",
		render: (quantity: number) => (
			<span
				style={{
					backgroundColor: quantity >= 45 ? "#fff" : "#f5222d",
					color: quantity >= 45 ? "#999" : "#fff",
					boxShadow: "rgb(217, 217, 217) 0px 0px 2px 3px",
					borderRadius: 10,
					lineHeight: "20px",
					padding: "0px 6px",
				}}>
				{quantity}
			</span>
		),
	},
	{
		title: "Type",
		key: "type",
		dataIndex: "type",
		render: (type: ProductType) => <Tag color={type === 0 ? "geekblue" : "green"}>{getProductType(type)}</Tag>,
	},
	{
		title: "Timestamp",
		key: "date",
		dataIndex: "updated_at",
		render: (date: string) => <span>{new Date(date).toLocaleString()}</span>,
	},
];
