import {getManager, getConnection, createQueryBuilder, getRepository} from "typeorm";
import {NotificationType, Notification, INotificationDescription} from "../../entity/Notification";
import {User} from "../../entity/User";
import {msgs} from "../../utils/responseMsgs";
import {Product} from "../../entity/Product";

async function getOne(id: string) {
	try {
		const notificationsRepository = getManager().getRepository(Notification);
		const notification = await notificationsRepository.findOne(id);

		return notification;
	} catch (error) {
		return null;
	}
}

async function getAll() {
	const notificationsRepository = getManager().getRepository(Notification);
	try {
		// return await await getRepository(Notification)
		// 	.createQueryBuilder("notification")
		// 	.leftJoinAndSelect("notification.product", "Product")
		// 	.leftJoinAndSelect("notification.to_user", "User")
		// 	.orderBy("notification.updated_at", "DESC")
		// 	.execute();
		return await notificationsRepository.find({relations: ["product", "to_user", "from_user"]});
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function geAllById(userId: string) {
	try {
		const notificationsRepository = getManager().getRepository(Notification);
		return await notificationsRepository.find({
			relations: ["product", "to_user", "from_user"],
			where: {to_user: {id: userId}},
			order: {created_at: "DESC"},
		});
	} catch (error) {
		return null;
	}
}

async function updateNotification(id: string) {
	try {
		const notificationsRepository = getManager().getRepository(Notification);
		const notif = new Notification({is_read: true});
		const result = await notificationsRepository.update(id, notif);
		if (result.affected === 1) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}

async function deleteNotification(id: string) {
	try {
		const notificationsRepository = getManager().getRepository(Notification);
		const result = await notificationsRepository.delete(id);
		if (result.affected == 1) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}

export interface ICreateNotification {
	description: INotificationDescription;
	type: NotificationType;
	product: Product;
	fromUser?: User;
	toUsers: User[];
}

async function sendNotifications(props: ICreateNotification) {
	const {description, type, fromUser, toUsers, product} = props;
	const queryRunner = getConnection().createQueryRunner();

	await queryRunner.startTransaction("READ UNCOMMITTED");

	try {
		await Promise.all(
			toUsers.map(async u => {
				const notification = new Notification({
					is_read: false,
					type: type,
					description: description,
					message: getNotificationMessage(type),
					from_user: type === NotificationType.REFILL_DONE ? fromUser : null,
					product: product,
					to_user: u,
				});

				queryRunner.manager.create(Notification, notification);
				await queryRunner.manager.save(notification);
			}),
		);

		await queryRunner.commitTransaction();
	} catch (err) {
		console.log(err);
		await queryRunner.rollbackTransaction();
	} finally {
		await queryRunner.release();
	}
}

export default {
	getAll,
	geAllById,
	updateNotification,
	deleteNotification,
	sendNotifications,
};

function getNotificationMessage(type: NotificationType) {
	switch (type) {
		case NotificationType.REFILL_DONE:
			return msgs.notificationsRefill;
		case NotificationType.LOW_STOCK:
			return msgs.notificationsMissingUnits;
		default:
			return "";
	}
}
