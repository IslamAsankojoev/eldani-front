import { ZodObject, ZodRawShape } from 'zod'

type SchemaKeys<T extends ZodRawShape> = keyof T

export const isFieldRequired = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  fieldName: SchemaKeys<T>,
): boolean => {
  const fieldSchema = schema?.shape[fieldName]
  return (fieldSchema as any)?._def?.checks?.some(
    (check: any) => check?.kind === 'min',
  )
}
