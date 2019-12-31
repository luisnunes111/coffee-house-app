declare namespace Models {
	//
	// Products
	// ----------------------------------------------------------------------
	type IProductsList = Array<IProductListItem>;

	interface IProductListItem {
		id: string;
		name: string;
		description: string;
	}
}
