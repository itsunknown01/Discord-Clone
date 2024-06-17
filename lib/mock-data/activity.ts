export enum ActivityTypes {
    Playing = "playing",
    Streaming = "streaming",
    Listening = "listening",
    Watching = "watching",
  }
  export type Activity = {
    type: ActivityTypes;
    name: string;
    since: Date;
  };
  
  
export function calculateHoursBetweenDates(date1: Date, date2: Date) {
    return Math.floor(Math.abs(date1?.getTime() - date2.getTime()) / 3600000);
  }