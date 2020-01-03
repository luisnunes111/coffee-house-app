declare namespace Models {
	//
	// User
	// ----------------------------------------------------------------------

	interface ILogin {
		accessToken: string;
		user: IUserLogin;
	}

	interface IUserLogin {
		id: string;
		name: string;
		email: string;
		role: string;
	}

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

	//
	// Notifications
	// ----------------------------------------------------------------------

	type INotificationsList = Array<INotificationListItem>;

	interface INotificationListItem {
		id: string;
		message: string;
		description:
			| string
			| {
					quantityBefore: number;
					quantityAfter: number;
			  };
		is_read: boolean;
		type: NotificationType;
		created_at: string;
		updated_at: string;
		product: INotificationProduct;
		to_user: INotificationUser;
		from_user: INotificationUser | null;
	}

	interface INotificationUser {
		id: string;
		name: string;
		email: string;
		created_at: string;
		updated_at: string;
	}
	interface INotificationProduct {
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
