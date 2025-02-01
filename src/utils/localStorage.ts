import { IS_SERVER } from './environment';

/**
 * Smartly reads value from localStorage
 */
export function localStorageGet(name: string, defaultValue: any = ''): string | any {
  if (IS_SERVER) {
    return defaultValue; // No tenemos acceso a localStorage en el servidor
  }

  const valueFromStore = localStorage.getItem(name);
  if (valueFromStore === null) return defaultValue; // No hay valor en el store, se devuelve el valor por defecto

  try {
    const jsonParsed = JSON.parse(valueFromStore);
    // Si el valor parseado es un tipo JSON válido, lo retornamos
    if (['boolean', 'number', 'bigint', 'string', 'object'].includes(typeof jsonParsed)) {
      return jsonParsed;
    }
  } catch (error) {
    // Si JSON.parse falla, devolvemos el valor como string
  }

  return valueFromStore; // Devolvemos el valor como string si no es JSON
}

/**
 * Smartly writes value into localStorage
 */
export function localStorageSet(name: string, value: any) {
  if (IS_SERVER) {
    return; // Do nothing on server side
  }
  if (typeof value === 'undefined') {
    return; // Do not store undefined values
  }
  let valueAsString: string;
  if (typeof value === 'object') {
    valueAsString = JSON.stringify(value);
  } else {
    valueAsString = String(value);
  }

  localStorage.setItem(name, valueAsString);
}

/**
 * Deletes value by name from localStorage, if specified name is empty entire localStorage is cleared.
 */
export function localStorageDelete(name: string) {
  if (IS_SERVER) {
    return; // Do nothing on server side
  }
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
}
