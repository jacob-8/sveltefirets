import type { OAuthCredential, User } from 'firebase/auth';
export interface AuthResult {
  additionalUserInfo: {
    isNewUser: boolean;
    providerId: string;
    profile: any;
  };
  credential?: OAuthCredential;
  operationType: 'link' | 'reauthenticate' | 'signIn';
  user: User;
}