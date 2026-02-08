
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `Firestore Permission Denied: Your request to ${context.operation} on '${context.path}' was denied by security rules.`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }

  toContextObject() {
    return {
      message: this.message,
      name: this.name,
      context: this.context,
    };
  }
}
