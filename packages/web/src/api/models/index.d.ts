declare namespace Models {
	//
	// Products
	// ----------------------------------------------------------------------

	type IProductsList = Array<IProductListItem>;

	interface IProductListItem {
		id: string;
		name: string;
		description: string;
		quantity: number;
		type: ProductType;
		image_name: string | null;
		created_at: string;
		updated_at: string;
	}
}
