/*
 * CS2003 Simple queue example
 * Saleem Bhatti, 01 Oct 2019
 * Original concept, Colin Allison.
 *
 */

import java.io.*;
import java.lang.*;

public class Main {
  public static void main(String[] args) {
    SimpleStringQueue sq = new SimpleStringQueue();

    String q_element;
    String value;
    String op = "";
    BufferedReader kb = new BufferedReader(
        new InputStreamReader(System.in));
    while (!op.equals("q")) {
      System.out.print("Operation ([a]dd, [r]emove, [p]rint, [q]uit): ");

      try {
        op = kb.readLine();
        if (op.equals("r")) {
            String retrieved = sq.remove();
            System.out.println("Retrieved: " + retrieved);
        }
        if (op.equals("a")) {
            System.out.print("String: ");
            value = kb.readLine();
            q_element = value;
            sq.add(q_element);
        }
        if (op.equals("p"))
            sq.printQ();
      }

      catch (QueueEmptyException qe) {
        System.out.println(qe);
      }

      catch (QueueFullException qf) {
        System.out.println(qf);
      }
      catch (IOException e) {
        System.out.println(e);
      }

    } // while()

  } // main()

} // Main
