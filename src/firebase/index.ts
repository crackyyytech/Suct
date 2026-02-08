
import { initializeApp, getApps, getApp } from 'firebase/app';
import firebaseConfig from './config';

function initializeFirebase() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

export { initializeFirebase };
export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';
