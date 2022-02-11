
/**
  * Simple example of a timestamp.
  *
  * Saleem Bhatti, https://saleem.host.cs.st-andrews.ac.uk/
  * 28 Aug 2019
  *
  */

import java.util.*;
import java.text.*;

public class TimeStamp {

  public static void main(String[] args) {
    Date               d = new Date();
    String            df = new String("yyyy-MM-dd_HH-mm-ss.SSS");
    SimpleDateFormat sdf = new SimpleDateFormat(df);
    String             s = sdf.format(d);
    String             u = System.getProperty("user.name");

    System.out.println("Hello, " + u + ", the time is : " + s);
  }
}
