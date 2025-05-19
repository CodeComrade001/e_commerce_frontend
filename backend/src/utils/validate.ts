import { Schema, ValidationError } from 'joi';

/**
 * Validate and coerce `payload` against a Joi schema (object or array).
 * @param schema  Joi Schema<T> (object or array) typed to T.
 * @param payload  Arbitrary input to validate.
 * @returns        Validated value as T.
 * @throws         HTTP 400 error if validation fails.
 */
export function validateSchema<T>(
  schema: Schema<T>,
  payload: unknown
): T {
  const { value, error } = schema.validate(payload, {
    abortEarly: false,   // gather all errors
    stripUnknown: true,  // remove extra fields
    convert: true,       // coerce types (e.g. strings → numbers)
  });

  if (error) {
    const message = (error as ValidationError)
      .details
      .map(d => d.message)
      .join(', ');
    const err = new Error(`Validation failed: ${message}`);
    // mark as HTTP 400
    (err as any).status = 400;
    throw err;
  }

  return value;
}
