package ascii

import kotlin.math.*

fun createAdidasAsciiLogo(width: Int):String{
    if (width < 2) {
        throw Exception("Error, minimun width is 2")
    }

    fun heightOfStripe(i: Int):Int = 
        if (i==0) sqrt(width.toDouble()).roundToInt()
        else heightOfStripe(0) + heightOfStripe(i-1)

    val stripePattern = "@".repeat(width)
    val logoHeight = heightOfStripe(2)
    // create first row
    val logoRows = mutableListOf(" ".repeat(2*width) + stripePattern)
    for (i in 1..logoHeight-1) {
        // shift row and optionally insert new stripe
        var newRow = " " + logoRows.get(i-1)
        newRow = when (i) {
            heightOfStripe(2) - heightOfStripe(0) ->  // start first stripe
                newRow.replaceRange(0, width, stripePattern) 
            heightOfStripe(2) - heightOfStripe(1) ->  //start second stripe
                newRow.replaceRange(width, width*2, stripePattern)
            else -> newRow
        }
        logoRows.add(newRow)
    }

    return logoRows.joinToString("\n")
}