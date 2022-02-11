/**
 * Simple, blocking UDP client with keyboard input
 *
 * Saleem Bhatti
 * Oct 2018
 *
 */

 // https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/InetAddress.html
 // https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/DatagramPacket.html
 // https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/DatagramSocket.html

import java.io.*;
import java.net.*;

public class UdpClient1a {

  public static void main(String[] args)
  {
    if (args.length != 2) { // user has not provided arguments
      System.out.println("\n UdpClient1a <servername> <port> \n");
      System.exit(0);
    }

    try {

      // parse input
      InetAddress addr = InetAddress.getByName(args[0]);
      int port = Integer.parseInt(args[1]);

      if (port < 0 || port > 65535) {
        System.err.println("Bad port number: " + port);
        System.exit(0);
      }

      // create socket
      DatagramSocket client = new DatagramSocket();

      System.out.println("Sending to server");
      System.out.println("server: "
                         + addr.getHostName() + " "
                         + addr.getHostAddress());
      System.out.println("port: " + port);

      String quit = new String("quit"); // to stop the program
      BufferedReader keyboard =
        new BufferedReader(new InputStreamReader(System.in));
      boolean flag = true;
      while (flag) {

        String text;

        System.out.print("type here -->: ");
        text = keyboard.readLine();

        DatagramPacket packet =
          new DatagramPacket(text.getBytes(), text.length(), addr, port);
        client.send(packet);

        System.out.println("Sent packet");
        System.out.println("to: " + addr);
        System.out.println("length: " + text.length());
        System.out.println("");

        if (text.equalsIgnoreCase(quit)) { flag = false; }
      } // while (flag)

      // close socket
      client.close();

    }
    catch (UnknownHostException e) {
      System.err.println("Unknown host: " + e.getMessage());
    }
    catch (SocketException e) {
      System.err.println("Socket problem: " + e.getMessage());
    }
    catch (IOException e) {
      System.err.println("IO problem: " + e.getMessage());
    }

  } // main()

}
