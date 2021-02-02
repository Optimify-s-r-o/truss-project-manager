import { ActionType, createAction } from "typesafe-actions";
import { GlobalNotification } from "./_types";

export const clearNotificationAction = createAction(
	"@common/CLEAR_NOTIFICATION"
)();

export const notificationAction = createAction(
	"@common/SET_NOTIFICATION"
)<GlobalNotification>();

export type NotificationActionType = ActionType<
	typeof clearNotificationAction | typeof notificationAction
>;
