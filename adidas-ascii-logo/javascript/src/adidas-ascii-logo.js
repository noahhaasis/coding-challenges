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
        throw "Error, minimun width is 2";
    }
    let stripeRowPattern = '@'.repeat(width);

    let firstStripeHeight = Math.round(Math.sqrt(width));
    let secondStripeHeight = firstStripeHeight * 2;
    let thirdStripeHeight = firstStripeHeight + secondStripeHeight;

    // TODO: Maybe do it in reverse (start at the bottom)
    let stripeRows = [' '.repeat(2*width) + stripeRowPattern];
    // Create first row
    for (var i = 1; i < thirdStripeHeight; i++) {
        var newRow = " " + stripeRows[i-1]; // Copy and shift previous row
        if (i === (thirdStripeHeight - firstStripeHeight)) { // start of first stripe
            newRow = replaceRange(newRow, 0, width, stripeRowPattern);
        } else if (i === (thirdStripeHeight - secondStripeHeight)) { // start of second stripe
            newRow = replaceRange(newRow, width, width*2, stripeRowPattern);
        }
        stripeRows.push(newRow);
    }

    return stripeRows.join('\n');
};

/******************************* SOLUTION 2 *******************************/


/**
 * Idea:
 * Split the logo in three straight lines with different heights and a array of offsets.
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
 * Now the only thing which really differs from row to row is the array of offsets
 *
 */

function solution2(width) {
    if (width < 2) {
        throw "Error, minimun width is 2";
    }
    let firstStripeHeight   = Math.round(Math.sqrt(width));
    let secondStripeHeight  = firstStripeHeight * 2;
    let thirdStripeHeight   = firstStripeHeight + secondStripeHeight;
    let spaceBetweenStripes = ' '.repeat(Math.round(Math.sqrt(width)));
    let stripePattern       = '@'.repeat(width);

    // Generate the three straight lines
    stripes = [
        new Array(firstStripeHeight).fill(stripePattern + spaceBetweenStripes),
        new Array(secondStripeHeight).fill(stripePattern + spaceBetweenStripes),
        new Array(thirdStripeHeight).fill(stripePattern)
    ];

    offsets = new Array(thirdStripeHeight).fill("").map(function(val, i) {
        let stripeLengths = [firstStripeHeight, secondStripeHeight, thirdStripeHeight];
        let closestStripeEnd = stripeLengths.findIndex(h => h > i);
        let offset = stripeLengths[closestStripeEnd] + width*closestStripeEnd - (i+1);
        return ' '.repeat(offset);
    });

    stripes.unshift(offsets);

    /**
      * Stripe should now look like the following
      *       [ ][@@@  ][@@@  ][@@@]
      *        [][@@@  ][@@@  ][@@@]
      *    [    ]       [@@@  ][@@@]
      *     [   ]       [@@@  ][@@@]
      * [       ]              [@@@]
      *  [      ]              [@@@]
      * Now concatenate it to a array of lines.
      */
    logo = [];
    for (var i = 0; i < thirdStripeHeight; i++) {
        var line = "";
        line += stripes[0][i]; // offset
        if (i < firstStripeHeight) {
            line += stripes[1][i]; // first stripe
        }
        if (i < secondStripeHeight) {
            line += stripes[2][i]; // second stripe
        }
        line += stripes[3][i]; // third stripe

        logo.push(line);
    }

    return logo.reverse().join('\n');
}
