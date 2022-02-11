/**
  MultiChatClient for use with MultiChatServer
  Demonstration of a TCP client for a server that can handle multiple clients.

  Clients connect to MultiChatServer, send messages, and those messages
  are relayed to every other connected client.

  Saleem Bhatti, 01 Oct 2019
*/

import java.io.*;
import java.net.*;

class MultiChatClient {

  private static Socket s_ = null;
  private static SimpleObjectQueue rxQ_; // receive - from server
  private static SimpleObjectQueue txQ_; // transmit - to server

  private static final int soTimeout_ = 10; // ms - not used
  private static final int sleepTime_ = 2000; // ms: slow down for demo only
  private static final int maxMessages_ = 2;
  private static final String logName_ = "client_log.txt";
  private static final String username_ = "@" +  System.getProperty("user.name");

  private static final String bye_ = "!bye!";

  public static void main(String[] args) {

    if (args.length != 2) { // user has not provided arguments
      System.out.println("\n MultiChatClient <servername> <portnumber>\n");
      System.exit(0);
    }

    // these queues are not necessary - just for demonstrating use
    rxQ_ = new SimpleObjectQueue("rx");
    txQ_ = new SimpleObjectQueue("tx");

    PrintWriter tx = null;
    BufferedReader rx = null;
    BufferedReader keyboard = null;
    LogFileWriter log = null;

    log = new LogFileWriter(logName_);
    System.out.println("logging started -> " + logName_);
    log.writeLog("logging started.");

    try {
      s_ = new Socket(args[0], Integer.parseInt(args[1]));
      tx = new PrintWriter(s_.getOutputStream(), true);
      rx = new BufferedReader(new InputStreamReader(s_.getInputStream()));
      keyboard = new BufferedReader(new InputStreamReader(System.in));

      log.writeLog("connected to: " + s_ + " as " + username_);
    }
    catch (IOException e) { System.out.println(e); }

    ChatMessage m;
    String s;

    boolean finished = false;

    while (!finished) {

      try {

        // check keyboard
        if (keyboard.ready()) {
          s = keyboard.readLine();
          txQ_.add(s);
          if (s.equalsIgnoreCase(bye_)) { finished = true; }
        }

        // check incoming from network
        if (rx.ready()) {
          s = rx.readLine();
          log.writeLog("rx: " + s);
          m = ChatMessage.decode(s);
          rxQ_.add(m.getSrc() + " : " + m.getBody());
        }

        Thread.sleep(sleepTime_);

        // transmit anything that is waiting
        if (!txQ_.isEmpty()) {
          s = (String) txQ_.remove();
          m = ChatMessage.encode(username_, s);
          s = m.getMessage();
          tx.println(s);
          tx.flush();
          log.writeLog("tx: " + s);
          System.out.println("tx -> " + s);
        }

        Thread.sleep(sleepTime_);

        // display anything that is waiting
        if (!rxQ_.isEmpty()) {
          s = (String) rxQ_.remove();
          System.out.println("rx -> " + s);
        }

      } // try

      catch (IOException e) { System.out.println(e); }
      catch (QueueFullException e) { System.err.println(e); }
      catch (QueueEmptyException e) { System.err.println(e); }
      catch (ChatMessageDecodeException e) { System.err.println(e); }
      catch (ChatMessageEncodeException e) { System.err.println(e); }
      catch (InterruptedException e) {
        // Thread.sleep() interrupted - do not care.
      }

    } // while(!finished)

    try { s_.close(); }
    catch (IOException e) { /* ignore */ }

  } //main()

} // class MultiChatClient
