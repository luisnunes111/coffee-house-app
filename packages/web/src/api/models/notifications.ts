import {APIClient} from "..";

/**
 * Get notifications List
 */
const getAll = async (): Promise<Utils.ApiResponse<Models.INotificationsList>> => {
	return await APIClient.request<Models.INotificationsList>("/user/notifications");
};

/**
 * Sets a notification as read
 */
const markAsRead = async (id: string): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/product/" + id, {method: "put"});
};

/**
 * Deletes a notification
 */
const deleteIt = async (id: string): Promise<Utils.ApiResponse<null>> => {
	return await APIClient.request<null>("/product/" + id, {method: "delete"});
};

export default {
	getAll,
	markAsRead,
	deleteIt,
};
