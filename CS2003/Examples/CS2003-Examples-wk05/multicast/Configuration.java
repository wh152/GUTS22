/*
  HeartBeat - Config information

  Saleem Bhatti
  Sep 2019
  Oct 2018

  Send out a multicast heartbeat and listen out
  for other heartbeats.
*/

/*
  This is an object that gets passed around, containing useful information.
*/

import java.io.*;
import java.net.*;

// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Properties.html
import java.util.Properties;

public class Configuration
{
  public Properties    properties_;
  public String        propertiesFile_ = "multicast.properties";
  public LogFileWriter log_;
  public String        logFile_ = "multicast.log";

  // These default values can be overriden in the properties file.
  public String     mAddr_="239.0.20.03"; // CS2003 whole class group
  public int        mPort_=2003;
  public int        mTTL_=2; // plenty for the lab
  public int        soTimeout_=1; // ms
  public boolean    loopbackOff_=true; // ignore my own transmissions
  public boolean    reuseAddr_=true; // allow address use by otehr apps

  // application config
  public int        msgSize_=256; // bytes
  public int        sleepTime_=5000; // ms
  public int        heartbeat_=100; // how many to send

  // these should not be loaded from a config file, of course
  public InetAddress mGroup_;
  public String      hostInfo_;

  Configuration(String propertiesFile)
  {
    InetAddress i;
    String h = "hostname";

    if (propertiesFile != null) { propertiesFile_ = propertiesFile; }

    try {
      i = InetAddress.getLocalHost();
      h = i.getHostName();

      hostInfo_ = h + " " + i.getHostAddress();

      properties_ = new Properties();
      InputStream p = getClass().getClassLoader().getResourceAsStream(propertiesFile_);
      if (p != null) {
        properties_.load(p);
        String s;

        if ((s = properties_.getProperty("logFile")) != null) {
          System.out.println(propertiesFile_ + " logFile: " + logFile_ + " -> " + s);
          logFile_ = new String(s);
        }

        if ((s = properties_.getProperty("mAddr")) != null) {
          System.out.println(propertiesFile_ + " mAddr: " + mAddr_ + " -> " + s);
          mAddr_ = new String(s);
        }
        if ((s = properties_.getProperty("mPort")) != null){
          System.out.println(propertiesFile_ + " mPort: " + mPort_ + " -> " + s);
          mPort_ = Integer.parseInt(s);
        }
        if ((s = properties_.getProperty("mTTL")) != null) {
          System.out.println(propertiesFile_ + " mTTL: " + mTTL_ + " -> " + s);
          mTTL_ = Integer.parseInt(s);
        }
        if ((s = properties_.getProperty("soTimeout")) != null) {
          System.out.println(propertiesFile_ + " soTimeout: " + soTimeout_ + " -> " + s);
          soTimeout_ = Integer.parseInt(s);
        }
        if ((s = properties_.getProperty("loopbackOff")) != null) {
          System.out.println(propertiesFile_ + " loopbackOff: " + loopbackOff_ + " -> " + s);
          loopbackOff_ = Boolean.valueOf(s);
        }
        if ((s = properties_.getProperty("reuseAddr")) != null) {
          System.out.println(propertiesFile_ + " reuseAddr: " + reuseAddr_ + " -> " + s);
          reuseAddr_ = Boolean.valueOf(s);
        }

        if ((s = properties_.getProperty("msgSize")) != null) {
          System.out.println(propertiesFile_ + " msgSize: " + msgSize_ + " -> " + s);
          msgSize_ = Integer.parseInt(s);
        }

        if ((s = properties_.getProperty("sleepTime")) != null) {
          System.out.println(propertiesFile_ + " sleepTime: " + sleepTime_ + " -> " + s);
          sleepTime_ = Integer.parseInt(s);
        }

        if ((s = properties_.getProperty("heartbeat")) != null) {
          System.out.println(propertiesFile_ + " heartbeat: " + heartbeat_ + " -> " + s);
          heartbeat_ = Integer.parseInt(s);
        }

        p.close();
      }

      log_ = new LogFileWriter(logFile_);
      log_.writeLog("-* logFile=" + logFile_, true);
      log_.writeLog("-* mAddr=" + mAddr_, true);
      log_.writeLog("-* mPort=" + mPort_, true);
      log_.writeLog("-* mTTL=" + mTTL_, true);
      log_.writeLog("-* soTimeout=" + soTimeout_, true);
      log_.writeLog("-* loopbackOff=" + loopbackOff_, true);
      log_.writeLog("-* reuseAddr=" + reuseAddr_, true);
      log_.writeLog("-* msgSize=" + msgSize_, true);
      log_.writeLog("-* sleepTime=" + sleepTime_, true);
      log_.writeLog("-* heartbeat=" + heartbeat_, true);
    }

    catch (UnknownHostException e) {
      System.out.println("Problem: " + e.getMessage());
    }

    catch (NumberFormatException e) {
      System.out.println("Problem: " + e.getMessage());
    }

    catch (IOException e) {
      System.out.println("Problem: " + e.getMessage());
    }

  }
}
