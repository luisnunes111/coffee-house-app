import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {AppState} from "../../configurations/redux";
import {RouteProps} from "react-router-dom";
import {loadProductsAction} from "../../store/products/actions";
import {Button} from "antd";

const ListPage: React.FC<RouteProps> = React.memo(_ => {
	const {items, error, loading} = useSelector((state: AppState) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadProductsAction());
	}, []);

	if (error) {
		return (
			<>
				<h5>Error</h5>
				<p>{error}</p>
			</>
		);
	} else if (!items) {
		return <p>loading...</p>;
	} else if (items?.length === 0) {
		return <p>No Products were found.</p>;
	} else {
		return (
			<>
				<Button type="primary">Button</Button>
				<ul>
					{items.map((item: any, i: number) => (
						// <ProductItem key={item.id} data={item} />
						<div>{i}</div>
					))}
				</ul>
			</>
		);
	}
});

export default ListPage;
