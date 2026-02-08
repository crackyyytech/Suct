
'use client';

import { ReactNode, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { initializeFirebase } from './';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseInstances = useMemo(() => {
    const app = initializeFirebase();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return { app, auth, firestore };
  }, []);

  return <FirebaseProvider value={firebaseInstances}>{children}</FirebaseProvider>;
}
