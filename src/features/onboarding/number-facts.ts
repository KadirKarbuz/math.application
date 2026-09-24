const sup = (n: number) => [...String(n)].map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]).join('');

export function isPrime(n: number) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

/** 12 → "2² × 3" */
export function primeFactorization(n: number) {
  const parts: string[] = [];
  let rest = n;
  for (let p = 2; p * p <= rest; p++) {
    let power = 0;
    while (rest % p === 0) {
      rest /= p;
      power++;
    }
    if (power > 0) parts.push(power > 1 ? `${p}${sup(power)}` : `${p}`);
  }
  if (rest > 1) parts.push(`${rest}`);
  return parts.join(' × ');
}

/** A short, fun fact about a whole number, e.g. for the user's age or name length. */
export function numberFact(n: number) {
  const root = Math.round(Math.sqrt(n));
  if (root * root === n) return `${n} = ${root}², tam kare bir sayı!`;
  const cube = Math.round(Math.cbrt(n));
  if (cube ** 3 === n) return `${n} = ${cube}³, tam küp bir sayı!`;
  if (isPrime(n)) return `${n} bir asal sayı, sadece 1'e ve kendisine bölünür.`;
  return `${n} = ${primeFactorization(n)}`;
}
