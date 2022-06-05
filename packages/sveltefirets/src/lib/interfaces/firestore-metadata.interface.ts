import type { Timestamp } from 'firebase/firestore';

export interface IFirestoreMetaData {
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface IFirestoreMetaDataAbbreviated {
  id?: string;
  cb?: string;
  ub?: string;
  ca?: Timestamp;
  ua?: Timestamp;
}
