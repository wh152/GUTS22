
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

class RegexClasses {

  final static String[] r_ = {
    "\\d{2,5}", // between 2 and 5 digits
    "\\d{4,}", // 4 or more digits
    "\\d{2}\\w?", // 2 digits with zero or more of [a-zA-Z_]
    "\\^\\d+", // '^' followed by at least one digit
    "\\s+glob\\s+" // "glob" with spaces either side
  };

  final static String[] i_ = {
    "Going to party like it's 1999, glob?",
    "2(^16) = 65536 - the number of TCP ports.",
    "6-string guitar, or 12-string guitar?",
    "Shall we call it glob42, or just glob?",
    "How about just glob then?"
  };

  static void check(String r, String i) {
    Pattern p = Pattern.compile(r);
    Matcher m = p.matcher(i);
    String c = String.format("%-7s match '%s' in -> '%s'",
      m.find() ? "Did" : "Did not", r, i);
    System.out.println(c);
  }

  public static void main(String[] args) {

    for (String i : i_) {
      System.out.println();
      for (String r : r_) { check(r, i); }
    }
  }

}
