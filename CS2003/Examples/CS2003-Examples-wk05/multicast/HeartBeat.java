/*
  HeartBeat

  Saleem Bhatti
  Sep 2019
  Oct 2018

  Send out a multicast heartbeat and listen out
  for other heartbeats.

*/

import java.io.*;
import java.net.*;
import java.text.*;
import java.util.*;

class HeartBeat
{
  static Configuration     c_;
  static MulticastEndpoint m_;
  static String username_ = System.getProperty("user.name");

  public static void main(String args[])
  {
    c_ = new Configuration("heartbeat.properties");
    m_ = new MulticastEndpoint(c_);

    m_.join();

    for (int h = c_.heartbeat_; h > 0; --h) {

      txHeartBeat();

      rxHeartBeat();

      try { Thread.sleep(c_.sleepTime_); /* avoid CPU hogging  */ }
      catch (InterruptedException e) { /* do nothing */ }

    } // for (h)

    m_.leave();
  }

  static String heartBeat()
  {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd-HHmmss.SSS");
    String now = sdf.format(new Date());
    String s = new String(now + "|" + username_ + "|" + c_.hostInfo_);
    return s;
  }

  static void rxHeartBeat()
  {
    byte[] b = null;

    try {
      if ((b = m_.rx()) != null && b.length > 0) {
        String logRequest = "-> rx : " + new String(b, "US-ASCII");
        c_.log_.writeLog(logRequest, true);
      }
    }

    catch (UnsupportedEncodingException e) {
      System.out.println("rxHeartBeat(): " + e.getMessage());
    }
  }

  static void txHeartBeat()
  {
    byte[] b = null;
    String h = heartBeat();

    try {
      b = h.getBytes("US-ASCII");
      if (m_.tx(b)) {
        c_.log_.writeLog("<- tx : " + h, true);
      }
    }

    catch (UnsupportedEncodingException e) {
      System.out.println("txHeartBeat(): " + e.getMessage());
    }
  }

}
