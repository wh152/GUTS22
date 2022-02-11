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
  public String        propertiesFile_ = "cs2003-net2.properties";

  // These default values must be overridden in the properties file.
  public String     serverAddress="To be configured"; // server FQDN
  public int        serverPort=-1; // default server port
  public String     boardDirectory="To be configured";
  public String     logFile="To be configured";
  public String     directoryFile="To be configured";

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

        if ((s = properties_.getProperty("serverAddress")) != null) {
          System.out.println(propertiesFile_ + " serverAddress: " + serverAddress + " -> " + s);
          serverAddress = new String(s);
        }

        if ((s = properties_.getProperty("serverPort")) != null){
          System.out.println(propertiesFile_ + " serverPort: " + serverPort + " -> " + s);
          serverPort = Integer.parseInt(s);
        }
        
        if ((s = properties_.getProperty("boardDirectory")) != null){
          System.out.println(propertiesFile_ + " boardDirectory: " + boardDirectory + " -> " + s);
          boardDirectory = new String(s);
        }
        
        if ((s = properties_.getProperty("logFile")) != null){
          System.out.println(propertiesFile_ + " logFile: " + logFile + " -> " + s);
          logFile = new String(s);
        }

        if ((s = properties_.getProperty("directoryFile")) != null){
          System.out.println(propertiesFile_ + " directoryFile: " + directoryFile + " -> " + s);
          directoryFile = new String(s);
        }

        p.close();
      } else {
          System.err.println("can't find properties file " + propertiesFile_);
      }

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
