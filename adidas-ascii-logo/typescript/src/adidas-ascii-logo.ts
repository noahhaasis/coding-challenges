/**
 * Returns the adidas three stripes logo using `@` characters.
 * @param width - Width of a stripe.
 * @returns adidas logo.
 */
export function createAdidasAsciiLogo(width: number): string {
  if (width < 2) {
    throw new Error('Error, minimum width is 2');
  }

  const firstStripeHeight = Math.round(Math.sqrt(width));
  const secondStripeHeight = firstStripeHeight * 2;
  const logoHeight = firstStripeHeight + secondStripeHeight;

  const stripePattern = '@'.repeat(width);
  const logo: Array<String> = new Array(logoHeight);
  // insert first row
  logo[0] = ' '.repeat(width * 2) + stripePattern;

  for (let i = 0; i < logo.length; i++) {
    if (i === 0) continue;

    let newRow = ` ${logo[i - 1]}`; // shift new row to the right
    if (logoHeight - firstStripeHeight === i) {
      // start first stripe
      newRow = replaceRange(newRow, stripePattern, 0, width);
    } else if (logoHeight - secondStripeHeight === i) {
      // start second stripe
      newRow = replaceRange(newRow, stripePattern, width, width * 2);
    }
    logo[i] = newRow;
  }

  return logo.join('\n');
}

function replaceRange(str: string, subs: string, start: number, end: number): string {
  return `${str.substring(0, start)}${subs}${str.substring(end, str.length)}`;
}
