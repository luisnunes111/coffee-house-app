import {NotificationType} from "../../../entity/Notification";
import {ProductType} from "../../../entity/Product";

export interface INotificationItemResponse {
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
