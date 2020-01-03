import React, {lazy} from "react";
import {Route, Switch, Redirect, RouteProps} from "react-router-dom";

const NotificationsPage = lazy(() => import("./pages/Notifications"));
const ProductsListPage = lazy(() => import("./pages/products/List"));
const ProductsCreatePage = lazy(() => import("./pages/products/Create"));
const ProductsUpdatePage = lazy(() => import("./pages/products/Update"));
const ProductsDetailsPage = lazy(() => import("./pages/products/Details"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

export const Routes: React.FC = React.memo(() => {
	return (
		<Switch>
			<Route exact={true} path="/" component={LoginPage} />
			<Route exact={true} path="/register" component={RegisterPage} />
			<Route exact={true} path="/products" component={ProductsListPage} />
			<Route exact={true} path="/products/create" component={ProductsCreatePage} />
			<Route exact={true} path="/product/:id/update" component={ProductsUpdatePage} />
			<Route exact={true} path="/product/:id/details" component={ProductsDetailsPage} />
			<Route exact={true} path="/notifications" component={NotificationsPage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	);
});

/**
 * Routes that require a log in and optionally some roles
 */
const AuthorizedRoute = ({roles, ...rest}: {roles?: number[]} & RouteProps) => {
	// const user = useSelector((state: AppState) => state.user)

	// const isAuthenticated = user.id != null

	// const areRolesRequired = roles != null && roles.length > 0
	// const areRolesValid = areRolesRequired && user.roles && user.roles.every(userRole => roles!.find(role => role === userRole) != null)

	const isAuthenticated = true;

	const areRolesRequired = false;
	const areRolesValid = true;

	if (!isAuthenticated) {
		// save path to redirect the user after login
		return (
			<Redirect
				from={rest.path!.toString()}
				to={{
					pathname: "/login",
					state: {referrer: window.location.pathname + window.location.search},
				}}
			/>
		);
	}
	if ((isAuthenticated && !areRolesRequired) || (isAuthenticated && areRolesRequired && areRolesValid)) {
		return <Route {...rest} />;
	} else {
		return <NotAuthorized />;
	}
};

const NotFoundPage: React.FC<any> = () => {
	return <div>Not found</div>;
};

const NotAuthorized: React.FC<any> = () => {
	return <div>Not authorized</div>;
};
