/**
 * Simple, blocking UDP server
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

public class UdpServer1 {

  private static int port_ = ZZZZ; // your port number here
  private static int bufferSize_ = 256;

  public static void main(String[] args)
  {
    try {
      // create socket
      DatagramSocket server =
      new DatagramSocket(port_, InetAddress.getLocalHost());

      System.out.println("Starting server");
      System.out.println("host: "
                         + server.getLocalAddress().getHostName() + " "
                         + server.getLocalAddress().getHostAddress());
      System.out.println("port: " + server.getLocalPort());

      // wait for a packet
      byte[] buffer = new byte[bufferSize_];
      DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
      server.receive(packet);

      // print packet contents
      System.out.println("Received packet");
      System.out.println("from: "
                         + packet.getAddress().getHostName() + "/"
                         + packet.getAddress().getHostAddress());
      System.out.println("length: " + packet.getLength());
      System.out.println("data: " + new String(packet.getData()));

      // close socket
      server.close();
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

} // class
