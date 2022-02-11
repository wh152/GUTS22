/* 
 * Using split to parse a simple CSV file
 * Adapt this to use regex groups instead
 * (Regex might be overkill here but it is hopefully instructive)
 * Tristan Henderson, Oct 2020
 */

/*
 Regular Expressions in Java 11
 https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html
 https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Matcher.html
*/

import java.io.*;
import java.util.regex.*;

public class RegexCSV {

    public static void main(String[] args) {

        // Replace this variable with your regular expression
        // Your code should look something like
        // String r = "(pattern),(pattern)";
        String r = "YOUR REGEX GOES HERE";

        Pattern p  = Pattern.compile(r);

        // check the number of arguments
        if (args.length != 1) {
            System.err.println("Incorrect number of arguments: need to pass filename as argument");
            System.exit(0);
        }

        // read in the file passed in as the first argument
        try {
            File inputFile = new File(args[0]);
            FileReader fileReader = new FileReader(inputFile);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
    
            // iterate over each line
            String csvLine, username, port;
            while ((csvLine = bufferedReader.readLine()) !=null) {

                // split the line by commas - split() actually takes
                // a regex so you could have something more sophisticated here
                String [] columns = csvLine.split(",");
                // assign each element of the array to a named variable
                username = columns[0];
                port = columns[1];
                System.out.println("Used split() to determine that username is " + username + ", port is " + port);

                // now split the line using a regex pattern and groups
                Matcher m = p.matcher(csvLine);
                // is it a match?
                if (m.find()) {
                    username = m.group(1);
                    port = m.group(2);
                    System.out.println("Used regex groups to determine that username is " + username + ", port is " + port);
                } else {
                    System.out.println("Regex did not match this line: " + csvLine);
                }
            }
        } catch (IOException e) {
            System.err.println("IO Exception: " + e.getMessage());
            System.exit(1);
        }
  
    }
}
