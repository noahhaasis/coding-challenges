package com.adidas;

import java.util.ArrayList;
import java.util.Arrays;

public class AdidasAsciiLogo {

    public String createAdidasAsciiLogo(int width) {
        if (width < 2) {
            throw new IllegalArgumentException("Error, minimun width is 2");
        }
        
        int firstStripeHeight = (int)Math.round(Math.sqrt(width));
        int secondStripeHeight = firstStripeHeight*2;
        int logoHeight = firstStripeHeight + secondStripeHeight;

        ArrayList<String> logo = new ArrayList<String>(logoHeight);
        // insert first row
        logo.add(substituteRange(repeat(' ', width*3), '@', width*2, width*3));

        for (int i = 1; i < logoHeight; i++) {
            String newRow = " " + logo.get(i-1);
            if (logoHeight - firstStripeHeight == i) { // start of first stripe
                newRow = substituteRange(newRow, '@', 0, width);
            } else if (logoHeight - secondStripeHeight == i) { // start of second stripe
                newRow = substituteRange(newRow, '@', width, width*2);
            }
            logo.add(newRow);
        }
        return String.join("\n", logo) + "\n";
    }

    private String substituteRange(String src, char subs, int start, int end) {
        char[] res = src.toCharArray();
        for (int i = start; i < end; i++) {
            res[i] = subs;
        }
        return new String(res);
    }

    private String repeat(char c, int count) {
        char[] res = new char[count];
        Arrays.fill(res, c);
        return new String(res);
    }
}
