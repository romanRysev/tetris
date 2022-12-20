/* eslint-disable prefer-spread */
export async function realFetch<T extends [input: RequestInfo | URL, init?: RequestInit | undefined]>(...args: T) {
  const res = await fetch.apply(null, args);
  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return json;
}

export async function okFetch<T extends [input: RequestInfo | URL, init?: RequestInit | undefined]>(...args: T) {
  const res = await fetch.apply(null, args);
  if (!res.ok) {
    const json = await res.json();
    throw json;
  }
  return res;
}
