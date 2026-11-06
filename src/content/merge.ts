// Overlay Sanity content on top of the built-in defaults.
// - empty strings / null / undefined → keep the default
// - empty arrays → keep the default list
// - objects are merged key by key; list items are merged with the default item shape

type Plain = Record<string, unknown>;

const isPlain = (v: unknown): v is Plain =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function isEmpty(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

export function mergeContent<T>(defaults: T, override: unknown): T {
  if (isEmpty(override)) return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(override)) return defaults;
    const template = defaults.find(isPlain);
    return override
      .filter((item) => !isEmpty(item))
      .map((item, index) => {
        // Keep a stable id for list items coming from Sanity
        if (isPlain(item) && template) {
          const base = { ...(template as Plain) };
          for (const k of Object.keys(base)) {
            base[k] = Array.isArray(base[k]) ? [] : typeof base[k] === "number" ? base[k] : "";
          }
          const merged = mergeContent(base, item) as Plain;
          if (!merged.id) merged.id = (item._key as string) || `item-${index}`;
          return merged;
        }
        return item;
      }) as T;
  }

  if (isPlain(defaults)) {
    if (!isPlain(override)) return defaults;
    const out: Plain = { ...defaults };
    for (const key of Object.keys(override)) {
      if (key.startsWith("_")) continue;
      out[key] = key in defaults ? mergeContent((defaults as Plain)[key], override[key]) : override[key];
    }
    return out as T;
  }

  // Primitive: same type wins, otherwise keep default
  if (typeof defaults === "number" && typeof override === "number") return override as T;
  if (typeof defaults === "string" && typeof override === "string") return override as T;
  if (typeof defaults === "boolean" && typeof override === "boolean") return override as T;
  return defaults;
}
