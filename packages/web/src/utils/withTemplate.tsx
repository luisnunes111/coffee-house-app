import React from "react";
import Template from "../components/Template";

export const withPageTemplate = (Component: any) => {
	function Wrapper(props: any, ref: any) {
		return (
			<Template>
				<Component {...props} ref={ref} />
			</Template>
		);
	}

	return React.forwardRef(Wrapper);
};
