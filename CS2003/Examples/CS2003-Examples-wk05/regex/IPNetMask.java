
/*
 * CS2003 IP address and mask
 * Saleem Bhatti, 01 Oct 2019
 *
 * Print IPv4 address, mask, and prefix, in decimal-dot,
 * hex, and binary.
 */

import java.util.regex.*;

class IPNetMask {

  /*
   Regular Expressions in Java 11
   https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html
   https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Matcher.html
  */
  protected static final String ipv4_ =
  "^(?<w>\\d{1,3})\\.(?<x>\\d{1,3})\\.(?<y>\\d{1,3})\\.(?<z>\\d{1,3})\\/(?<m>\\d{1,2})$";
  protected static final Pattern ipv4_p_ = Pattern.compile(ipv4_);

  protected static void quit(String a) {
    if (a != "") {
      System.out.println("  Incorrect address/mask value -> '" + a + "'\n");
    }
    System.out.println(String.format("%s\n%s\n%s\n%s\n%s\n",
    "  IPNetMask w.x.y.z/m",
    "  w.x.y.z is a 'decimal dot notation' IPv4 address",
    "  m is a mask length (1 <= m <= 32)",
    "  for example:",
    "    java IPNetMask 138.251.195.61/24"
    ));
    System.exit(0);
  }

  protected static boolean check(int a)
  { return (a >= 0 && a <= 255); }

  /*
  Bitwise operators
  https://docs.oracle.com/javase/tutorial/java/nutsandbolts/opsummary.html
  https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op3.html
  */
  protected static String dotted(int v) {
    // Java integers are signed, right-shift of sign-bit fills
    // with one bits, so remove sign-bit by masking lower 8 bits
    int w = ((v & 0xff000000) >> 24) & 0x000000ff;
    int x =  (v & 0x00ff0000) >> 16;
    int y =  (v & 0x0000ff00) >>  8;
    int z =  (v & 0x000000ff);

    return String.format("%d.%d.%d.%d", w, x, y, z);
  }

  protected static String hex(int v) {
    return String.format("%x", v);
  }

  protected static String binary(int v) {
    String b = Integer.toBinaryString(v);

    // make easily readable, using nibbles with spaces in between
    String binary = new String(
                    b.substring( 0,  4) + " " +
                    b.substring( 4,  8) + " " +
                    b.substring( 8, 12) + " " +
                    b.substring(12, 16) + " " +
                    b.substring(16, 20) + " " +
                    b.substring(20, 24) + " " +
                    b.substring(24, 28) + " " +
                    b.substring(28));
    return binary;
  }

  public static void main(String[] args) {

    if (args.length != 1) { quit("No address/mask value provided."); }

    // syntactic/format checks on input
    String a = args[0];

    // Create matcher for pattern with input string.
    Matcher p_m = ipv4_p_.matcher(a);

    // Check that regex matches input string.
    if (!p_m.find()) { quit(a); }

    // convert strings to integers
    int w = Integer.parseInt(p_m.group("w"));
    int x = Integer.parseInt(p_m.group("x"));
    int y = Integer.parseInt(p_m.group("y"));
    int z = Integer.parseInt(p_m.group("z"));
    int m = Integer.parseInt(p_m.group("m"));

    // semantic/value checks on input
    if (!check(w) || !check(x) || !check(y) || !check(z) ||
        !(m > 0 && m < 33)) { quit(a); }

    // generate the values
    int ipv4, mask, prefix; // no unsigned integers in Java
    ipv4 = (w << 24) | (x << 16) | (y << 8) | z;
    mask = 0x1 << (32 - m); // lower, zero bits
    for (int i = m; i > 0; --i) { mask |= (mask << 1); } // one bits
    prefix = ipv4 & mask;

    // String.format() https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Formatter.html#syntax
    System.out.println(String.format("%8s: %-15s  0x%8s  %39s",
                                     "address",
                                     dotted(ipv4), hex(ipv4), binary(ipv4)));
    System.out.println(String.format("%8s: %-15s  0x%8s  %39s",
                                     "mask",
                                     dotted(mask), hex(mask), binary(mask)));
    System.out.println(String.format("%8s: %-15s  0x%8s  %39s",
                                     "prefix",
                                     dotted(prefix), hex(prefix), binary(prefix)));
  }
}
