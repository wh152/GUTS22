/*
  HeartBeat - multicast goop wrapper.

  Saleem Bhatti
  Sep 2019
  Oct 2018

  Send out a multicast heartbeat and
  listen out for other heartbeats.

*/

/*
  This encapsulates the process of setting up a multicast
  communication endpoint, as well as sending and receiving
  from that endpoint.
*/

// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/MulticastSocket.html

import java.io.*;
import java.net.*;

public class MulticastEndpoint
{
  MulticastSocket mSocket_;
  Configuration   c_;

  MulticastEndpoint(Configuration configuration)
  {
    InetAddress  mGroup;
    c_ = configuration;

    try {
      mGroup   = InetAddress.getByName(c_.mAddr_);
      mSocket_ = new MulticastSocket(c_.mPort_);

      mSocket_.setLoopbackMode(c_.loopbackOff_);
      mSocket_.setReuseAddress(c_.reuseAddr_);
      mSocket_.setTimeToLive(c_.mTTL_);
      mSocket_.setSoTimeout(c_.soTimeout_); // non-blocking

      c_.mGroup_ = mGroup;
    }

    catch (IOException e) {
      System.out.println("MulticastEndpoint(): " + e.getMessage());
    }
  }

  void join()
  {
    try {
      mSocket_.joinGroup(c_.mGroup_);
      c_.log_.writeLog("joined multicast group", true);
    }
    catch (IOException e) {
      System.out.println("MulticastEndpoint.join(): " + e.getMessage());
    }
  }

  void leave()
  {
    try {
      mSocket_.leaveGroup(c_.mGroup_);
      mSocket_.close();
      c_.log_.writeLog("left multicast group", true);
    }
    catch (IOException e) {
      System.out.println("MulticastEndpoint.leave(): " + e.getMessage());
    }
  }

  byte[] rx()
  {
    boolean done = false;
    byte[] data = null;

    try {
      byte b[] = new byte[c_.msgSize_];
      DatagramPacket d = new DatagramPacket(b, b.length);
      mSocket_.receive(d);
      int l = d.getLength();
      if (l > 0) {
        data = new byte[l];
        for (int i = 0; i < l; ++i) { data[i] = b[i]; }
        done = true;
      }
    }
    catch (SocketTimeoutException e) {
      // do nothing
    }
    catch (IOException e) {
      System.out.println("MulticastEndpoint.rx(): " + e.getMessage());
    }

    return done ? data : null;
  }

  boolean tx(byte b[])
  {
    boolean done;
    DatagramPacket d;

    done = false;
    try {
      d = new DatagramPacket(b, b.length, c_.mGroup_, c_.mPort_);
      mSocket_.send(d);
      done = true;
    }

    catch (SocketTimeoutException e) {
      System.out.println("MulticastEndpoint.tx(): could not send - " + e.getMessage());
    }
    catch (IOException e) {
      System.out.println("MulticastEndpoint.tx(): " + e.getMessage());
    }

    return done;
  }
}
