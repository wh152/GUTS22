
/*
 * CS2003 Simple regex classes example
 * Saleem Bhatti, 01 Oct 2019
 *
 */

/*
 Regular Expressions in Java 11
 https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html
 https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Matcher.html
*/

import java.util.regex.*;

class RegexGroups {

  final static String[][] r_ = {
    // year -> 4-digit sequence
    {"(?<year>\\b\\d{4}\\b)", "year"},
    //   ^^^^                  ^^^^

    // number5 -> 5-digit number
    {"(?<number5>\\b\\d{5}\\b)", "number5"},
    //   ^^^^^^^                  ^^^^^^^

    // tla -> 3-uppercase-letter word (abbreviation)
    {"(?<tla>\\b[A-Z]{3}\\b)", "tla"},
    //   ^^^                    ^^^

    // d2word -> a word that starts with 2 digits
    {"(?<d2word>\\b\\d{2}[a-zA-Z-_]{1,})", "d2word"},
    //   ^^^^^^                             ^^^^^^

    // uid -> 1 to 5 letters, 1 or more digits
    {"(?<uid>\\b[a-z]{1,5}\\d+\\b)", "uid"}
    //   ^^^                          ^^^

  };

  final static String[] i_ = {
    "Going to party like it's 1999, glob?",
    "2(^16) = 65536 - the number of TCP ports.",
    "6-string guitar or 12-string guitar?",
    "Shall we call it glob42, or just glob?",
    "How about just glob then?"
  };

  static void check(String r, String g, String i) {

    // compile a pattern from a string regex.
    Pattern p = Pattern.compile(r);

    // Create matcher for input string.
    Matcher m = p.matcher(i);

    // Check that input string has a match.
    boolean found = m.find();

    // Retrieve value as named capture group.
    String value = found ? m.group(g) : "";

    String c = String.format("%-7s match '%s' in -> '%s'",
      found ? "Did" : "Did not", r, i);
    if (found) {
      c = c + "\n             ---> " + g + " = '" + value + "'";
    }
    System.out.println(c);
  }

  public static void main(String[] args) {

    for (String i : i_) {
      System.out.println();
      for (String[] r : r_) { check(r[0], r[1], i); }
    }
  }

}
