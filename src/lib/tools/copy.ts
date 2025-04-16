export default function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
