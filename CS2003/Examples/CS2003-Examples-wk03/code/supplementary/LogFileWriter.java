/**
 * LogFileWriter - simple logging
 *
 * Saleem Bhatti
 * Sep 2019
 * Oct 2018
 *
 */

import java.io.*;
import java.util.*;
import java.text.*;

public class LogFileWriter {

  public FileWriter fw_;
  public SimpleDateFormat sdf_;

  public LogFileWriter(String fileName) {
    File lf = new File(fileName);
    sdf_ = new SimpleDateFormat(new String("yyyyMMdd-HHmmss.SSS"));

    try {
      if (lf.exists()) fw_ = new FileWriter(fileName, true);
      else {
          lf.createNewFile();
          fw_ = new FileWriter(fileName, true);
      }
    }
    catch (Exception e) { System.out.println(e);}
  }

  public void writeLog(String logRequest) { writeLog(logRequest, false); }

  public void writeLog(String logRequest, Boolean stdout) {
    try {
      String now = sdf_.format(new Date());
      String logEntry = new String(now.toString() + "| " + logRequest + "\n");
      fw_.write(logEntry, 0, logEntry.length());
      fw_.flush();
      if (stdout) { System.out.print(logEntry); }
    }
    catch (Exception e) { System.out.println(e); }
  }

}
