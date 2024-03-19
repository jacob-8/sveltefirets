// Firestore REST API
// https://cloud.google.com/firestore/docs/use-rest-api leads to https://cloud.google.com/firestore/docs/reference/rest/?apix=true
// https://www.jeansnyman.com/Firebase/Google-Firestore-REST-API-Examples

// For Authentication on the server side if needed w/ service account and JWT: https://github.com/sagi/workers-jwt, https://blog.cloudboost.io/, how-to-use-googles-firestore-with-cloudflare-s-edge-worker-37f04eb838cc, https://blog.cloudflare.com/api-at-the-edge-workers-and-firestore/
// Can't use API key but not needed for authenticated requests: https://stackoverflow.com/a/57029319/7053575

import { FireStoreParser } from './RESTParser';

function firestoreRESTUrl(path: string): string {
  return `TODO`;
  // return `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${path}`;
}

export async function fetchDoc<T>(path: string): Promise<T> {
  const pathParts = path.split('/');
  const id = pathParts.pop();
  const collection = pathParts.join('/');
  const url = firestoreRESTUrl(`${collection}/${id}`);
  const res = await fetch(url);
  const json = await res.json();
  if (json && json.fields) {
    const doc = FireStoreParser<T>(json.fields);
    // @ts-ignore
    doc.id = id;
    return doc;
  }
  return null;
}

// export async function fetchCollection<T>(path: string): Promise<T[]> {
//   const url = firestoreRESTUrl(path);
//   const res = await fetch(url);
//   const json = await res.json();
//   return json;
// }
