export type SubmissionState<
  DATA extends Record<string, any>,
  VALIDATION_ERRORS
> =
  | {
      intent: 'idle';
      origin: 'client';
      data: null;
      validationErrors: null;
      error: null;
    }
  | {
      intent: 'pending';
      origin: 'client';
      data: DATA;
      validationErrors: null;
      error: null;
    }
  | {
      intent: 'error';
      origin: 'client' | 'server';
      data: null;
      validationErrors: VALIDATION_ERRORS | null;
      error: string | null;
    }
  | {
      intent: 'success';
      origin: 'server';
      data: DATA | null;
      validationErrors: VALIDATION_ERRORS | null;
      error: string | null;
    };
