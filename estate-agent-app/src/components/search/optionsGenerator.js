// Helpers to generate options for search filters from a properties list

function toNumber(v) {
  if (v == null) return NaN;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace(/[^0-9.-]/g, "");
  const n = parseInt(cleaned, 10);
  return isNaN(n) ? NaN : n;
}

export function getUniquePropertyTypes(properties = []) {
  return [...new Set(properties.map((p) => p.type).filter(Boolean))]
    .sort()
    .map((type) => ({ value: String(type), label: String(type) }));
}

export function getLocationList(properties = []) {
  return [...new Set(properties.map((p) => p.location).filter(Boolean))].sort();
}

export function getPostcodeList(properties = []) {
  const postcodes = new Set();
  properties.forEach((p) => {
    if (!p.location) return;
    const parts = String(p.location).trim().split(/\s+/);
    const last = parts[parts.length - 1];
    if (last && /[A-Za-z0-9]/.test(last)) postcodes.add(last);
  });
  return [...postcodes].sort();
}

export function getBedroomOptions(properties = [], maxLabel = 5) {
  const nums = [
    ...new Set(
      properties
        .map((p) => toNumber(p.bedrooms))
        .filter((n) => !isNaN(n) && n >= 0)
    ),
  ].sort((a, b) => a - b);

  if (nums.length === 0) {
    // sensible defaults
    return [1, 2, 3, 4, 5].map((n) => ({
      value: String(n),
      label: n === maxLabel ? `${n}+` : String(n),
    }));
  }

  const unique = nums.map((n) => ({
    value: String(n),
    label: n >= maxLabel ? `${maxLabel}+` : String(n),
  }));

  // ensure we include at least 1..5 if data is sparse
  const defaults = [1, 2, 3, 4, 5].map((n) => ({
    value: String(n),
    label: n === maxLabel ? `${n}+` : String(n),
  }));
  const merged = [
    ...new Map([...unique, ...defaults].map((o) => [o.value, o])).values(),
  ];
  return merged;
}

// returns array of ranges: { min, max }
export function getPriceBuckets(properties = [], buckets = 6, minStep = 50000) {
  const prices = [
    ...new Set(
      properties
        .map((p) => toNumber(p.price))
        .filter((n) => !isNaN(n) && n >= 0)
    ),
  ].sort((a, b) => a - b);

  if (prices.length === 0) return [];
  if (prices.length <= buckets) {
    // return each unique price as its own 'bucket' (useful for small datasets)
    return prices.map((p) => ({ min: p, max: p }));
  }

  const min = prices[0];
  const max = prices[prices.length - 1];
  const range = max - min;

  let step = Math.ceil(range / buckets / minStep) * minStep;
  if (step === 0) step = minStep;

  // Align start to a round step
  const start = Math.floor(min / step) * step;

  const ranges = [];
  let cur = start;
  while (cur <= max) {
    const rmin = cur;
    const rmax = cur + step - 1;
    ranges.push({ min: rmin, max: rmax });
    cur += step;
    // safety guard
    if (ranges.length > buckets + 2) break;
  }

  // Merge last bucket if it goes beyond max
  return ranges;
}
