import type { FieldValue, Timestamp } from 'firebase/firestore';
export interface IFirestoreMetaData {
    id?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Timestamp & FieldValue;
    updatedAt?: Timestamp & FieldValue;
}
export interface IFirestoreMetaDataAbbreviated {
    id?: string;
    cb?: string;
    ub?: string;
    ca?: Timestamp & FieldValue;
    ua?: Timestamp & FieldValue;
}
