import _ from "lodash";

export const VERSION_NUMBER = 20;
export const DEV_VERSION_NUMBER = 4;

/**
 * Serializes the provided array of values as a string
 * separated by the provided separator
 *
 * @param values The values to serialize
 * @returns The serialized value
 */
export function serializeValues(
  values: (string | number | boolean)[],
  separator: string = ";"
): string {
  return values
    .map((value) => {
      if (typeof value === "boolean") {
        return value ? "True" : "False";
      } else if (typeof value === "number") {
        if (Number.isInteger(value)) {
          return value.toString();
        } else {
          // Floats are formatted to 4dp
          return value.toFixed(4);
        }
      } else {
        return value.toString();
      }
    })
    .join(separator);
}

/**
 * Parses an int value from a string returning a default value
 * if the provided string was not a number
 *
 * @param rawValue     The raw string to parse
 * @param defaultValue The default value to use
 * @returns            The parsed number or default string
 */
export function parseIntWithDefault(
  rawValue: string,
  defaultValue: number = 0
): number {
  const value: number = parseInt(rawValue);
  return _.isNaN(value) ? defaultValue : value;
}

/**
 * Parses a float value from a string returning a default
 * value if the provided string was not a valid number
 *
 * @param rawValue The raw string value
 * @param defaultValue The default value to use
 * @returns The parsed number
 */
export function parseFloatWithDefault(
  rawValue: string,
  defaultValue: number = 0.0
): number {
  const value: number = parseFloat(rawValue);
  return _.isNaN(value) ? defaultValue : value;
}
