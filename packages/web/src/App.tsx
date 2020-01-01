import React, {Suspense} from "react";
import {configureStore} from "./configurations/redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {PageErrorBoundary} from "./components/PageErrorBoundary";
import {Spin} from "antd";

const store = configureStore();

const App: React.FC = () => {
	return (
		<PageErrorBoundary>
			<Provider store={store}>
				<Suspense fallback={<Loading />}>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</Suspense>
			</Provider>
		</PageErrorBoundary>
	);
};

export default App;

const Loading = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}>
			<Spin size="large" />
		</div>
	);
};
