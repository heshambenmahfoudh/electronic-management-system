/* eslint-disable @typescript-eslint/no-explicit-any */
export function spliteObject(item: any) {
  let values: any = []
  for (const key in item) {
    const value = item[key]
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      values = values.concat(spliteObject(value))
    } else {
      values?.push(String(value))
    }
  }
  return values as any
}
