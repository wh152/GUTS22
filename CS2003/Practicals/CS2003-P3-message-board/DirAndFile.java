/**
  * Simple example creating a directory and a file.
  *
  * Saleem Bhatti, https://saleem.host.cs.st-andrews.ac.uk/
  * 28 Aug 2019
  *
  */

import java.io.*;

public class DirAndFile {

  public static void main(String[] args) {
    if (args.length != 1) {
      System.out.println("  usage:\n java DirAndFile <word>");
      System.exit(0);
    }

    String dirName = new String(args[0]);
    String fileName = new String(args[0]);
    String text = new String(args[0]);

    File dir = new File(dirName);

    if (dir.exists()) {
      System.out.println("++ File already exists: " + dirName);
      System.exit(0);
    }

    if (dir.mkdir()) {
      System.out.println("++ Created directory: " + dirName);
    }
    else {
      System.out.println("++ Failed to create directory: " + dirName);
      System.exit(0);
    }

    fileName = dirName + File.separator + fileName;
    File file = new File(fileName);

    if (file.exists()) {
      System.out.println("++ File already exists: " + fileName);
      System.exit(0);
    }

    try {
      FileWriter fw = new FileWriter(file);
      fw.write(text);
      fw.flush();
      fw.close();
    }
    catch (IOException e) {
      System.out.println("IOException - write(): " + e.getMessage());
    }

    System.out.println("++ Wrote \"" + text + "\" to file: " + fileName);
    }
}
