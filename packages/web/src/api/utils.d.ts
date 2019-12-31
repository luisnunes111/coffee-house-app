declare namespace Utils {
	/**
	 * Api Response type
	 */

	type ApiResponse<T = any, E = string> =
		| {
				success: true;
				data: T;
		  }
		| {
				success: false;
				error: E;
		  };
}
