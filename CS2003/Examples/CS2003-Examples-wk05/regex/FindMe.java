/*
 * CS2003 Simple regex example
 * Saleem Bhatti, 01 Oct 2019
 *
 */

 /*
  Regular Expressions in Java 11
  https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html
  https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Matcher.html
 */

import java.util.regex.*;

class FindMe {

  final static String[] r_ = {"FindMe"};

  final static String[] i_ = {
    "Can you FindMe in here?",
    "Can you Find Me in here?",
    "Can you findme in here?",
    "Can you find me in here?",
    "CanyouFindMeinhere?"
  };

  static void check(String r, String i) {

    // Compile pattern from regex string.
    Pattern p = Pattern.compile(r);

    // Create matcher from pattern with input string.
    Matcher m = p.matcher(i);

    // Check if input macthes regex.
    boolean found = m.find();

    // Print result.
    String c = String.format("%-7s match '%s' in -> '%s'",
    found ? "Did" : "Did not", r, i);
    System.out.println(c);
  }

  public static void main(String[] args) {

    for (String r : r_) {
      System.out.println();
      for (String i : i_) { check(r, i); }
    }
  }

}
