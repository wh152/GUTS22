/**
  MultiChatServer
  Demonstration of a TCP server that can handle multiple clients.

  Clients connect, send messages, and those messages are relayed to every
  other connected client.

  Saleem Bhatti, 01 Oct 2019
*/

import java.io.*;
import java.net.*;

class MultiChatServer {

  private static int port_ = ZZZZ; // your "personal" port number goes here
  private static int maxClients_ = 30; // This may be too many!
  private static SimpleObjectQueue clientQ_;
  private static int maxMessages_ = 90; // This may be too many!
  private static SimpleObjectQueue messageQ_;
  private static int soTimeout_ = 10; // ms
  private static int sleepTime_ = 2000; // ms: slow down for demo only
  private static ServerSocket listen_;
  private static String logName_ = "server_log.txt";
  private static LogFileWriter log_;

  private static final String bye_ = "!bye!";

  static void startServer() {

    log_ = new LogFileWriter(logName_);
    log_.writeLog("logging started.");

    try {
      listen_ = new ServerSocket(port_);
      listen_.setSoTimeout(soTimeout_);
      System.out.println("server socket started: " + listen_);
      log_.writeLog("server socket started: " + listen_);
    }
    catch (IOException e) { System.err.println(e); }

    clientQ_ = new SimpleObjectQueue("ClientQ", maxClients_);
    messageQ_ = new SimpleObjectQueue("MessageQ", maxMessages_);

  } //startServer()


  public static void main(String[] args) {
    startServer();

    while (true) { // CTRL-C to quit this server

      Socket client = null;
      try { client = listen_.accept(); }
      catch (SocketTimeoutException e) {
        // nothing to do - non-blocking socket
      }
      catch (IOException e) {
        System.err.println(e);
      }

      try {

        // new clients
        if (client != null) {
          client.setTcpNoDelay(true); // Turn off NAGLE algorithm, optional
          log_.writeLog("clientQ[" + clientQ_.tail() + "] added: " + client);
          clientQ_.add(client);
        }

        Thread.sleep(sleepTime_);

        // check transmissions from each client
        for (int i = 0; i < clientQ_.size(); ++i) {

          Socket c = (Socket) clientQ_.get(i);

          if (c != null) {
            BufferedReader rx = new BufferedReader(new InputStreamReader(c.getInputStream()));

            if (rx.ready()) {
              String s = rx.readLine();
              ChatMessage cm = ChatMessage.decode(s);

              if (cm != null) {
                messageQ_.add(s);
                log_.writeLog("rx (" + c + "): '" + s + "'");

                String src = cm.getSrc();
                String body = cm.getBody();
                if (body.equalsIgnoreCase(bye_)) { // client finished
                  log_.writeLog("clientQ[" + i + "] removed: " + src + " at " + c);
                  c.close();
                  clientQ_.delete(c);
                }

              } // if (cm != null)

            } // if (rx.ready())

          } // if (c != null)

        } // for (clientQ_)

        Thread.sleep(sleepTime_);

        // relay any queued messages to all clients
        if (!messageQ_.isEmpty() && !clientQ_.isEmpty()) {
          String s = (String) messageQ_.remove();

          for (int i = 0; i < clientQ_.size(); ++i) {
            Socket c = (Socket) clientQ_.get(i);

            if (c != null) {
              PrintWriter tx = new PrintWriter(c.getOutputStream());
              tx.println(s);
              tx.flush();
              log_.writeLog("tx (" + c + ") '" + s + "'");
            } // if (c != null)

          } // for (clientQ_)

        } // if (messageQ_ && clientQ_)

      } // try

      catch (QueueFullException e) { System.err.println(e); }
      catch (QueueEmptyException e) { System.err.println(e); }
      catch (ChatMessageDecodeException e) { System.err.println(e); }
      catch (IOException e) { System.err.println(e); }
      catch (InterruptedException e) {
        // Thread.sleep() interrupted - do not care.
      }

    } // while(true)

  } // main()

}
