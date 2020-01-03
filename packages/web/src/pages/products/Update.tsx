import React, {useCallback, useState, useEffect} from "react";
import {RouteComponentProps, useLocation, useParams} from "react-router-dom";
import {notification, Spin} from "antd";
import {withPageTemplate} from "../../utils/withTemplate";
import {ProductForm, IProductFormValues} from "./components/Form";
import API from "../../api";

const UpdatePage: React.FC<RouteComponentProps> = React.memo(props => {
	const {id} = useParams();
	const [initialData, setInitialData] = useState<IProductFormValues | null>();

	useEffect(() => {
		API.products
			.details(id!)
			.then(
				r =>
					r.success &&
					setInitialData({name: r.data.name, description: r.data.description, quantity: r.data.quantity, type: r.data.type}),
			);
	}, []);

	const onSubmit = useCallback(async (values: IProductFormValues) => {
		const result = await API.products.update(values, id!);
		if (result.success) {
			props.history.push("/products");
			notification.success({
				message: "Success",
				description: "Product updated successfully",
			});
		} else {
			notification.error({
				message: "Error",
				description: result.error,
			});
		}

		return null;
	}, []);

	return (
		<div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", minHeight: 200}}>
			{initialData ? <ProductForm submit={onSubmit} intialValues={initialData} /> : <Spin size={"large"} />}
		</div>
	);
});
export default withPageTemplate(UpdatePage);
