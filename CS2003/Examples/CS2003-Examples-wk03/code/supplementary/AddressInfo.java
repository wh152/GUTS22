/**
 * AddressInfo server - send local/remote address information to client
 *
 * Saleem Bhatti
 * Sep 2019
 */

// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/InetAddress.html
// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/ServerSocket.html
// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/Socket.html

import java.net.*;
import java.util.*;
import java.io.*;

public class AddressInfo {

  public static void main(String arg[]) {
    int port = 4242; // your "personal" unique port number goes here

    try {
      ServerSocket srv = new ServerSocket(port);

      InetAddress ipAddr = InetAddress.getLocalHost();
      String hostname = ipAddr.getHostName();

      while (true) { // forever!

        /* the call to accept blocks until a connection request is received */
        /* a new "working" socket is created to handle the server end */
        Socket c = srv.accept();

        /* connect a character-oriented stream writer to the connection */
        PrintWriter tx = new PrintWriter(c.getOutputStream(), true);

        /* get the remote (client) IP address and port number */
        SocketAddress s = c.getRemoteSocketAddress();

        /* send the name & address */
        tx.println("Me: " +
                    c.getLocalAddress().getHostName() + " / " +
                    c.getLocalAddress().getHostAddress() +
                    " port " + c.getLocalPort());
        tx.println("You: " +
                    c.getInetAddress().getHostName() + " / " +
                    c.getInetAddress().getHostAddress() +
                    " port " + c.getPort());

        c.close();
      }
    }

    catch(Exception e) {
      System.out.println("We have a problem!");
    }

  } // main()

} // YourAddress
