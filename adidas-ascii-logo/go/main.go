package main

import (
  "fmt"
  "strings"
  "math"
)

func replaceRange(s string, c rune, start, end int) string {
  runes := []rune(s)
  for i := start; i < end; i++ {
    runes[i] = c;
  }
  return string(runes)
}

func createAdidasAsciiLogo(width int) string {
  firstRowHeight  := int(math.Round(math.Sqrt(float64(width))))
  secondRowHeight := firstRowHeight * 2
  logoHeight      := secondRowHeight + firstRowHeight

  logo := make([]string, logoHeight)
  // create first row
  logo[0] = strings.Repeat(" ", width*2) + strings.Repeat("@", width)

  for i := 1; i < logoHeight; i++ {
    newRow := " " + logo[i-1]
    if (logoHeight - firstRowHeight == i) { // start of first stripe
      newRow = replaceRange(newRow, '@', 0, width)
    } else if (logoHeight - secondRowHeight == i) { // start of second stripe
      newRow = replaceRange(newRow, '@', width, width*2)
    }
    logo[i] = newRow
  }

  return strings.Join(logo, "\n")
}

func main(){

  widths := []int{2, 3, 5, 7, 9, 16, 21}

  for _, width := range widths {
    fmt.Println(fmt.Sprintf("\nadidas (width %d)",width))
    fmt.Println("\n-------------------------------------------------------------")
    fmt.Println(fmt.Sprintf("\n%s\n\n",createAdidasAsciiLogo(width)))
  }
}
