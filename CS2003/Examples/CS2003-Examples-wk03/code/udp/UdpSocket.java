/**
 * Simple, UDP socket abstraction,
 * sends / recieves strings of length <= 256
 *
 * Saleem Bhatti
 * Sep 2019
 * Oct 2018
 *
 */

// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/DatagramSocket.html
// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/DatagramPacket.html

import java.io.*;
import java.net.*;

class UdpSocket {

  DatagramSocket udpSocket_ = null;
  InetAddress dstAddr_;
  int dstPort_;

  final int soTimeout_ = 10; // ms

  UdpSocket(int port, String dstHost, String dstPort)
  {
    try {
      dstAddr_ = InetAddress.getByName(dstHost);
      dstPort_ = Integer.parseInt(dstPort);

      if (dstPort_ < 1024 || dstPort_ > 65535) {
        System.err.println("Port number: " + dstPort_ + "(range is 1024 - 65535)");
        System.exit(0);
      }
    }
    catch (UnknownHostException e) {
      System.err.println("UdpSocket: " + e.getMessage());
      System.exit(0);
    }


    try {
      udpSocket_ = new DatagramSocket(port, InetAddress.getLocalHost());

      System.out.println("Starting server");
      System.out.println("host: "
                         + udpSocket_.getLocalAddress().getHostName() + "/"
                         + udpSocket_.getLocalAddress().getHostAddress()
                         + ":" + udpSocket_.getLocalPort());

      System.out.println("destination port: "
                         + dstAddr_.getHostName() + " "
                         + dstAddr_.getHostAddress()
                         + ":" + port);

      udpSocket_.setSoTimeout(soTimeout_); // non-blocking
    }
    catch (UnknownHostException e) {
      System.err.println("UdpSocket: " + e.getMessage());
    }
    catch (SocketException e) {
      System.err.println("UdpSocket: " + e.getMessage());
    }
  } // UdpSocket


  public String rx() {

    String line = null;

    try {
      byte[] buffer = new byte[256];
      DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
      udpSocket_.receive(packet);
      String text = new String(packet.getData(), 0, packet.getLength());

      line = new String(packet.getAddress().getHostName() + ":"
            + packet.getAddress().getHostAddress() + ":"
            + packet.getPort() + " -> "
            + text);
    }
    catch (SocketTimeoutException e) {
      // do nothing - no incoming requests
    }
    catch (IOException e) {
      System.err.println("UdpSocket.rx(): " + e.getMessage());
    }

    return line;
  } // rx()


  public void tx(String line) {

    try {
      DatagramPacket packet =
      new DatagramPacket(line.getBytes(), line.length(), dstAddr_, dstPort_);
      udpSocket_.send(packet);
    }
    catch (IOException e) {
      System.err.println("UdpSocket.tx(): " + e.getMessage());
    }

  } // tx()

} // class
