import type { IFirestoreMetaData } from "./interfaces";

// This is just here for Kitbook demonstration use
export interface Message extends IFirestoreMetaData {
  text: string;
}