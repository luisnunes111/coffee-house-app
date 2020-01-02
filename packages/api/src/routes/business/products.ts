import notifications from "../repositories/notifications";
import {Product} from "../../entity/Product";
import {NotificationType} from "../../entity/Notification";
import {User} from "../../entity/User";
import users from "../repositories/users";

const MAX_PACKETS_TEA = 600;
const MAX_PACKETS_COFFEE = 200;
const PRODUCT_THRESHOLD = 45;

async function notifyUsers(product: Product, quantityBefore: number, fromUser: string) {
	let toUsers: Array<User>;

	if (quantityBefore < PRODUCT_THRESHOLD && product.quantity >= PRODUCT_THRESHOLD) {
		//Notify managers
		toUsers = await users.getAllManagers();
		const getUser = await users.getOne(fromUser);

		notifications.sendNotifications({
			type: NotificationType.REFILL_DONE,
			fromUser: getUser!,
			toUsers: toUsers,
			product: product,
			description: {quantityBefore: quantityBefore, quantityAfter: product.quantity},
		});
	} else if (quantityBefore >= PRODUCT_THRESHOLD && product.quantity < PRODUCT_THRESHOLD) {
		//Notify everybody
		toUsers = await users.getAll();

		notifications.sendNotifications({
			type: NotificationType.LOW_STOCK,
			toUsers: toUsers,
			product: product,
			description: {quantityBefore: quantityBefore, quantityAfter: product.quantity},
		});
	}
}

export default {
	notifyUsers,
};
