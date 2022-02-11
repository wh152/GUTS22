
import java.io.*;
import java.net.*;

/**
  * Daily Message Board Client
  *
  * based on code by Saleem Bhatti, 28 Aug 2019
  *
  */
public class DMBClient {

  static int maxTextLen_ = 256;
  static Configuration c_;

  // from configuration file
  static String server; // FQDN
  static int port; //server port

  public static void main(String[] args)
  {

    c_ = new Configuration("cs2003-net2.properties");

    try {
        server = c_.serverAddress;
        port = c_.serverPort;
    }
    catch (NumberFormatException e) {
        System.out.println("can't configure port: " + e.getMessage());
    }

    if (args.length != 1) { // user has not provided arguments
      System.out.println("\n DMBClient <string>\n");
      System.exit(0);
    }

    try {
      Socket       connection;
      OutputStream tx;
      InputStream  rx;
      byte[]       buffer;
      String       s = new String("");
      String       quit = new String("quit");
      int          r;

      connection = startClient(server, port);
      tx = connection.getOutputStream();
      rx = connection.getInputStream();

      buffer = args[0].getBytes();
      r = buffer.length;
      if (r > maxTextLen_) {
        System.out.println("++ You entered more than " + maxTextLen_ + "bytes ... truncating.");
        r = maxTextLen_;
      }
      System.out.println("Sending " + r + " bytes");
      tx.write(buffer, 0, r); // to server

      System.out.print("\n++ Closing connection ... ");
      connection.close();
      System.out.println("... closed.");
    }

    catch (IOException e) {
      System.err.println("IO Exception: " + e.getMessage());
    }
  } // main

  static Socket startClient(String hostname, int portnumber)
  {
    Socket connection = null;

    try {
      InetAddress address;
      int         port;

      address = InetAddress.getByName(hostname);
      port = portnumber;

      connection = new Socket(address, port); // make a socket

      System.out.println("++ Connecting to " + hostname + ":" + port
      + " -> " + connection);
    }

    catch (UnknownHostException e) {
      System.err.println("UnknownHost Exception: " + hostname + " "
                        + e.getMessage());
    }
    catch (IOException e) {
      System.err.println("IO Exception: " + e.getMessage());
    }

    return connection;
  } // startClient

} // DMBClient
