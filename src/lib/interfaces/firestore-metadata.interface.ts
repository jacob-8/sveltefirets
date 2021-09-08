import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface IFirestoreMetaData {
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Timestamp & FieldValue;
  updatedAt?: Timestamp & FieldValue;
}
