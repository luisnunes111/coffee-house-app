import React, {useCallback, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {notification} from "antd";
import {withPageTemplate} from "../../utils/withTemplate";
import {ProductForm, IProductFormValues} from "./components/Form";
import API from "../../api";

const CreatePage: React.FC<RouteComponentProps> = React.memo(props => {
	const onSubmit = useCallback(async (values: IProductFormValues) => {
		const result = await API.products.create(values);
		if (result.success) {
			props.history.push("/products");
			notification.success({
				message: "Success",
				description: "Product created successfully",
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
		<div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
			<ProductForm submit={onSubmit} />
		</div>
	);
});
export default withPageTemplate(CreatePage);
