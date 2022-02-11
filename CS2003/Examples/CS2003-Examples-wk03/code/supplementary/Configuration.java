/*
  Using java.util.Properties to demonstrate configuration information
  
  Based on code from Saleem Bhatti
  Sep 2019
  Oct 2018

*/

import java.io.*;
import java.net.*;

// https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Properties.html
import java.util.Properties;

public class Configuration
{
  public Properties    properties_;
  public String        propertiesFile_ = "server.properties";
  public LogFileWriter log_;
  public String        logFile_ = "server.log";

  // These default values can be overriden in the properties file.
  public String     serverName_="Test UDP Server"; // A name for the server
  public int        port_=12345; // A default port value

  Configuration(String propertiesFile)
  {
    if (propertiesFile != null) {
        propertiesFile_ = propertiesFile;
    }

    try {
      properties_ = new Properties();
      InputStream p = getClass().getClassLoader().getResourceAsStream(propertiesFile_);
      if (p != null) {
        properties_.load(p);
        String s;

        if ((s = properties_.getProperty("logFile")) != null) {
          System.out.println(propertiesFile_ + " logFile: " + logFile_ + " -> " + s);
          logFile_ = new String(s);
        }

        if ((s = properties_.getProperty("serverName")) != null) {
          System.out.println(propertiesFile_ + " serverName: " + serverName_ + " -> " + s);
          serverName_ = new String(s);
        }

        if ((s = properties_.getProperty("port")) != null){
          System.out.println(propertiesFile_ + " port: " + port_ + " -> " + s);
          port_ = Integer.parseInt(s);
        }

        p.close();
      }

      log_ = new LogFileWriter(logFile_);
      log_.writeLog("-* logFile=" + logFile_, true);
      log_.writeLog("-* serverName=" + serverName_, true);
      log_.writeLog("-* port=" + port_, true);
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
