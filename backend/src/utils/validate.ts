// src/utils/validate.ts
import { ObjectSchema, ValidationError } from 'joi';

/**
 * Validate and coerce `payload` against a Joi schema.
 * @param schema  Joi schema typed to T.
 * @param payload  Arbitrary input to validate.
 * @returns        Validated value as T.
 * @throws         HTTP 400 error if validation fails.
 */
export function validateSchema<T>(
  schema: ObjectSchema<T>,
  payload: unknown
): T {
  const { value, error } = schema.validate(payload, {
    abortEarly: false,   // gather all errors
    stripUnknown: true,  // remove extra fields
    convert: true,       // coerce types (e.g. strings → numbers)
  });

  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    const err = new Error(`Validation failed: ${message}`);
    (err as any).status = 400;
    throw err;
  }

  return value;  // now strongly typed as T
}
