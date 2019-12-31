import React from "react";

export class PageErrorBoundary extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {error: null, errorInfo: null};
	}

	componentDidCatch(error: any, errorInfo: any) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		const {error, errorInfo} = this.state;
		if (error != null) {
			return (
				<div>
					<h1>Error</h1>
					<h4>{error}</h4>
					<code>{errorInfo}</code>
				</div>
			);
		}

		return this.props.children;
	}
}
