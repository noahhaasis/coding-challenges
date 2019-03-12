function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}

/**
 * Returns the adidas three stripes logo using `@` characters.
 * @param {number} width - Width of a stripe.
 * @returns {string} adidas logo.
 */
module.exports = function(width) {
  if (width < 2) {
    throw "Error, minimun width is 2"
  }
  let stripeRowPattern = '@'.repeat(width)
  let spaceBetweenStripes = ' '.repeat(Math.round(Math.sqrt(width)))

  // TODO: Refactor
  let firstStripeHeight = Math.round(Math.sqrt(width))
  let secondStripeHeight = firstStripeHeight * 2
  let thirdStripeHeight = firstStripeHeight + secondStripeHeight

  let stripeRows = [' '.repeat(2*width) + stripeRowPattern]
  // Create first row
  for (var i = 1; i < thirdStripeHeight; i++) {
    var newRow = " " + stripeRows[i-1] // Copy and shift previous row
    if (i === (thirdStripeHeight - firstStripeHeight)) { // start of first stripe
      newRow = replaceRange(newRow, 0, width, stripeRowPattern)
    } else if (i === (thirdStripeHeight - secondStripeHeight)) { // start of second stripe
      newRow = replaceRange(newRow, width, width*2, stripeRowPattern)
    }
    stripeRows.push(newRow)
  }

  return stripeRows.join('\n')
};
