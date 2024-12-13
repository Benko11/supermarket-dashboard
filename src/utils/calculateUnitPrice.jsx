export default function calculateUnitPrice(title, price) {
  const regexes = {
    GRAM: /(\d+)g/,
    LITRE: /(\d+)l/,
    PIECE: /(\d+)ks/,
    KILOGRAM: /(\d+)kg/,
  };

  let match = title.match(regexes.GRAM);
  if (match != null) {
    const number = match[1];
    return [Math.ceil((price / number) * 100), "100g"];
  }

  match = title.match(regexes.LITRE);
  if (match != null) {
    const number = match[1];
    return [Math.ceil(price / number), "l"];
  }

  match = title.match(regexes.PIECE);
  if (match != null) {
    const number = match[1];
    return [Math.ceil(price / number), "ks"];
  }

  match = title.match(regexes.KILOGRAM);
  if (match != null) {
    const number = match[1];
    return [Math.ceil(price / number), "kg"];
  }

  return null;
}
