import React from "react";
import {configureStore} from "./configurations/redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {PageErrorBoundary} from "./components/PageErrorBoundary";

const store = configureStore();

const App: React.FC = () => {
	return (
		<PageErrorBoundary>
			<Provider store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</Provider>
		</PageErrorBoundary>
	);
};

export default App;
