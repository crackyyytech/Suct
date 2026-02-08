
'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  Query,
  DocumentData,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '../errors';

type CollectionData<T> = T & { id: string };

export function useCollection<T>(q: Query | null) {
  const [data, setData] = useState<CollectionData<T>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CollectionData<T>[];
        setData(documents);
        setLoading(false);
      },
      (err) => {
        const path = (q as CollectionReference).path || 'unknown collection';
        const permissionError = new FirestorePermissionError({
            path: path,
            operation: 'list',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
}
