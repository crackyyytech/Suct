
'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '../errors';

type DocData<T> = T & { id: string };

export function useDoc<T>(ref: DocumentReference | null) {
  const [data, setData] = useState<DocData<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (docSnapshot: DocumentSnapshot<DocumentData>) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() } as DocData<T>);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
            path: ref.path,
            operation: 'get',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading, error };
}
