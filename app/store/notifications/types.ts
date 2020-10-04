export enum NotifTypes {
  Error,
  Warning,
  Success,
  Info,
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotifTypes;
}
