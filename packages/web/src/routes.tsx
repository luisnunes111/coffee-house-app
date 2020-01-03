import React, {lazy} from "react";
import {Route, Switch, Redirect, RouteProps} from "react-router-dom";
import {AppState} from "./configurations/redux";
import {useSelector} from "react-redux";
import {UserRole} from "./utils/validations/register";

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
			<AuthorizedRoute exact={true} path="/products" component={ProductsListPage} />
			<AuthorizedRoute role={UserRole.Manager} exact={true} path="/products/create" component={ProductsCreatePage} />
			<AuthorizedRoute exact={true} path="/product/:id/update" component={ProductsUpdatePage} />
			<AuthorizedRoute exact={true} path="/product/:id/details" component={ProductsDetailsPage} />
			<AuthorizedRoute exact={true} path="/notifications" component={NotificationsPage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	);
});

/**
 * Routes that require a log in and optionally some roles
 */
const AuthorizedRoute = ({role, ...rest}: {role?: UserRole} & RouteProps) => {
	const user = useSelector((state: AppState) => state.user);

	const isAuthenticated = user.data?.id != null;

	const isRoleRequired = role != null;
	const isRoleValid = isRoleRequired && user.data && user.data.role === role;

	if (!isAuthenticated) {
		// save path to redirect the user after login
		return (
			<Redirect
				from={rest.path!.toString()}
				to={{
					pathname: "/",
					state: {referrer: window.location.pathname + window.location.search},
				}}
			/>
		);
	}
	if ((isAuthenticated && !isRoleRequired) || (isAuthenticated && isRoleRequired && isRoleValid)) {
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
