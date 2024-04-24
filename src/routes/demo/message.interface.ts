import type { IFirestoreMetaData } from '$lib';
export interface Message extends IFirestoreMetaData {
  text: string;
}
