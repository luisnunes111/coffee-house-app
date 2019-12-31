import React from "react";
import {Route, Switch} from "react-router-dom";
import ProductsListPage from "./pages/products/List";

export const Routes: React.FC = React.memo(() => {
	return (
		<Switch>
			<Route exact={true} path="/" component={ProductsListPage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	);
});

const NotFoundPage: React.FC<any> = () => {
	return <div>Not found</div>;
};
