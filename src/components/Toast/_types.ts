export type NotificationReducerStateType = Readonly<{
  notification: GlobalNotification | null;
}>;

export enum Status {
    SUCCESS= "success",
    ERROR="error",
    INFO="info",
    WARNING="warning"
}
export interface GlobalNotification {
    code: Status;
    message: string;
  }
  