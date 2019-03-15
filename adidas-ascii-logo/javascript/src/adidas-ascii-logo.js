/******************************* SOLUTION 1 *******************************/
/**
  * Idea:
  * Every row in the logo is equal to the previous row
  * shifted by one " " to the right, except rows where
  * a new stripe starts. These are the only special cases.
  */
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
        throw "Error, minimum width is 2";
    }
    const stripeRowPattern = "@".repeat(width);

    const firstStripeHeight = Math.round(Math.sqrt(width));
    const secondStripeHeight = firstStripeHeight * 2;
    const thirdStripeHeight = firstStripeHeight + secondStripeHeight;

    let stripeRows = [" ".repeat(2*width) + stripeRowPattern];
    // Create first row
    for (i = 1; i < thirdStripeHeight; i+=1) {
        let newRow = " " + stripeRows[i-1]; // Copy and shift previous row
        if (i === (thirdStripeHeight - firstStripeHeight)) {
            // start of first stripe
            newRow = replaceRange(newRow, 0, width, stripeRowPattern);
        } else if (i === (thirdStripeHeight - secondStripeHeight)) {
            // start of second stripe
            newRow = replaceRange(newRow, width, width*2, stripeRowPattern);
        }
        stripeRows.push(newRow);
    }

    return stripeRows.join("\n");
};

/******************************* SOLUTION 2 *******************************/


/**
 * Idea:
 * Split the logo in three straight lines
 * with different heights and a array of offsets.
 *[[      @@@],
 * [       @@@],
 * [   @@@  @@@],
 * [    @@@  @@@],
 * [@@@  @@@  @@@],
 * [ @@@  @@@  @@@]]
 *       ||
 *       ||
 *       \/
 *  [      ]              [@@@]
 * [       ]              [@@@]
 *     [   ]       [@@@  ][@@@]
 *    [    ]       [@@@  ][@@@]
 *        [][@@@  ][@@@  ][@@@]
 *       [ ][@@@  ][@@@  ][@@@]
 *
 * Now the only thing which really differs
 * from row to row is the array of offsets.
 *
 */

function solution2(width) {
    if (width < 2) {
        throw "Error, minimum width is 2";
    }
    const firstStripeHeight   = Math.round(Math.sqrt(width));
    const secondStripeHeight  = firstStripeHeight * 2;
    const thirdStripeHeight   = firstStripeHeight + secondStripeHeight;
    const spaceBetweenStripes = " ".repeat(Math.round(Math.sqrt(width)));
    const stripePattern       = "@".repeat(width);

    // Generate the three straight lines
    let stripes = [
        new Array(thirdStripeHeight).fill("")
            .fill(stripePattern + spaceBetweenStripes, 0, firstStripeHeight),
        new Array(thirdStripeHeight).fill("")
            .fill(stripePattern + spaceBetweenStripes, 0, secondStripeHeight),
        new Array(thirdStripeHeight).fill(stripePattern)
    ];

    const offsets = new Array(thirdStripeHeight).fill("").map(function(val, i) {
        const stripeLengths = [firstStripeHeight, secondStripeHeight, thirdStripeHeight];
        const closestStripeEnd = stripeLengths.findIndex(h => h > i);
        const offset = stripeLengths[closestStripeEnd] + width*closestStripeEnd - (i+1);
        return " ".repeat(offset);
    });

    stripes.unshift(offsets);

    /**
      * Stripe should now look like the following
      *      [" " ["@@@  "  ["@@@  "  ["@@@"
      *       ,""  ,@@@  "  ,"@@@  "  ,"@@@"
      *   ,"    "  ,""      ,"@@@  "  ,"@@@"
      *    ,"   "  ,""      ,"@@@  "  ,"@@@"
      *,"       "  ,""      ,"",      ,"@@@"
      * ,"      "] ,""    ] ,""     ] ,"@@@"]
      *     /\
      *     ||
      *     ||
      *   offsets
      *
      * Now concatenate it to a array of lines. (in reverse order)
      */
    var logo = [];
    for (row = thirdStripeHeight - 1; row >= 0; row-=1) {
        logo.push(stripes.map(s => s[row]).join(""));
    }

    return logo.join("\n");
}
