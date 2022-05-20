import type { IFirestoreMetaData } from 'sveltefirets';
export interface IMessage extends IFirestoreMetaData {
  text: string;
}
