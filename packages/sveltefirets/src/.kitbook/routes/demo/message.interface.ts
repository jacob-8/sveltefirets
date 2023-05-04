import type { IFirestoreMetaData } from '$lib';
export interface IMessage extends IFirestoreMetaData {
  text: string;
}
