import {Button, Form, Input, Select, InputNumber, PageHeader} from "antd";
import {FormikErrors, FormikProps, withFormik} from "formik";
import React from "react";
import validationSchema from "../../../utils/validations/product";
import {getProductType} from "../utils/typeConversion";
import {Typography} from "antd";
import {useHistory} from "react-router-dom";

const {Title} = Typography;
const FormItem = Form.Item;
const {Option} = Select;

interface IProductProps {
	submit: (values: IProductFormValues) => Promise<FormikErrors<IProductFormValues> | null>;
	intialValues?: IProductFormValues;
}

export interface IProductFormValues {
	name: string;
	description?: string;
	type: number;
	quantity: number;
}
const _ProductForm: React.FC<FormikProps<IProductFormValues> & IProductProps> = React.memo(props => {
	const {values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors} = props;
	const history = useHistory();
	return (
		<form style={{margin: "auto", width: 400}} onSubmit={handleSubmit}>
			<PageHeader
				onBack={() => history.goBack()}
				style={{padding: 0}}
				title={props.intialValues ? "Update product" : "Create a new product"}
			/>

			<FormItem
				label="Name"
				help={touched.name && errors.name ? errors.name : ""}
				validateStatus={touched.name && errors.name ? "error" : undefined}>
				<Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
			</FormItem>

			<FormItem
				label="Description"
				help={touched.description && errors.description ? errors.description : ""}
				validateStatus={touched.description && errors.description ? "error" : undefined}>
				<Input.TextArea
					name="description"
					value={values.description}
					onChange={handleChange}
					onBlur={handleBlur}
					autoSize={{minRows: 3, maxRows: 5}}
				/>
			</FormItem>

			<FormItem
				label="Quantity"
				help={touched.quantity && errors.quantity ? errors.quantity : ""}
				validateStatus={touched.quantity && errors.quantity ? "error" : undefined}>
				<InputNumber
					name="quantity"
					value={values.quantity}
					onChange={(value: number | undefined) => {
						setFieldValue("quantity", value);
					}}
					onBlur={handleBlur}
				/>
			</FormItem>

			<FormItem
				label="Type"
				help={touched.type && errors.type ? errors.type : ""}
				validateStatus={touched.type && errors.type ? "error" : undefined}>
				<Select
					value={values.type}
					style={{width: 120}}
					onChange={(value: number) => {
						setFieldValue("type", value);
					}}>
					<Option value={0}>{getProductType(0)}</Option>
					<Option value={1}>{getProductType(1)}</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" htmlType="submit" disabled={false}>
					Submit
				</Button>
			</FormItem>
		</form>
	);
});

export const ProductForm = withFormik<IProductProps, IProductFormValues>({
	validationSchema,
	mapPropsToValues: props => props.intialValues || {name: "", quantity: 0, type: 0},
	handleSubmit: async (values, {props, setErrors}) => {
		const errors = await props.submit(values);
	},
})(_ProductForm);
