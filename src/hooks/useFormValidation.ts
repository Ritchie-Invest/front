import { z } from 'zod';

export const useFormValidation = <T extends z.ZodTypeAny>(schema: T, values: z.infer<T>) => {
  const result = schema.safeParse(values);
  return {
    isValid: result.success,
    errors: !result.success ? result.error.flatten().fieldErrors : {},
  };
};
