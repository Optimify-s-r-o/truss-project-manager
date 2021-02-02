import { getType } from "typesafe-actions";
import {
  clearNotificationAction,
  notificationAction,
  NotificationActionType
} from "./_actions";
import { NotificationReducerStateType } from "./_types";

const initialState: NotificationReducerStateType = {
  notification: null
};

export default (
  state: NotificationReducerStateType = initialState,
  action: NotificationActionType
): NotificationReducerStateType => {
  switch (action.type) {
    case getType(clearNotificationAction):
      return {
        notification: null
      };

    case getType(notificationAction):
      return {
        notification: action.payload
      };

    default:
      return state;
  }
};
