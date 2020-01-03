import notifications from "../repositories/notifications";
import {Product, ProductType} from "../../entity/Product";
import {NotificationType} from "../../entity/Notification";
import {User} from "../../entity/User";
import userRepository from "../repositories/users";
import productRepository from "../repositories/products";

const MAX_PACKETS_TEA = 600;
const MAX_PACKETS_COFFEE = 200;
const PRODUCT_THRESHOLD = 45;

async function notifyUsers(product: Product, quantityBefore: number, fromUser: string) {
	let toUsers: Array<User>;

	if (quantityBefore < PRODUCT_THRESHOLD && product.quantity >= PRODUCT_THRESHOLD) {
		//Notify managers
		toUsers = await userRepository.getAllManagers();
		const getUser = await userRepository.getOne(fromUser);

		notifications.sendNotifications({
			type: NotificationType.REFILL_DONE,
			fromUser: getUser!,
			toUsers: toUsers,
			product: product,
			description: {quantityBefore: quantityBefore, quantityAfter: product.quantity},
		});
	} else if (quantityBefore >= PRODUCT_THRESHOLD && product.quantity < PRODUCT_THRESHOLD) {
		//Notify everybody
		toUsers = await userRepository.getAll();

		notifications.sendNotifications({
			type: NotificationType.LOW_STOCK,
			toUsers: toUsers,
			product: product,
			description: {quantityBefore: quantityBefore, quantityAfter: product.quantity},
		});
	}
}

async function checkStockLimits(type: ProductType, newQuantity: number, quantityBefore = 0) {
	const count = await productRepository.getAllByTypeCount(type);
	let overflow = count - quantityBefore + newQuantity;

	if (type === ProductType.COFFEE) {
		overflow = MAX_PACKETS_COFFEE - overflow;
		if (overflow >= 0) {
			return {ok: true};
		}
	} else if (type === ProductType.TEA) {
		overflow = MAX_PACKETS_TEA - overflow;
		if (overflow >= 0) {
			return {ok: true};
		}
	}

	return {ok: false, overflow};
}

export default {
	notifyUsers,
	checkStockLimits,
};
