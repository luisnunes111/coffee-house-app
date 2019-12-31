import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../configurations/redux";
import {RouteProps} from "react-router-dom";

const ListPage: React.FC<RouteProps> = React.memo(_ => {
	const {items, error, loading} = useSelector((state: AppState) => state.products);

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
			<ul>
				{items.map((item: any, i: number) => (
					// <ProductItem key={item.id} data={item} />
					<div>{i}</div>
				))}
			</ul>
		);
	}
});

export default ListPage;
