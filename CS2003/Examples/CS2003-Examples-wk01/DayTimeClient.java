/* With thanks to Colin Allison */

import java.net.*;
import java.io.*;

class DayTimeClient {

    public static void main(String[] args) {

        String ntp_hostname = "minervamedia.cs.st-andrews.ac.uk";
        String hostname ="";

        int i = args.length;

        if (i != 0) hostname =  args[0];
        else hostname = ntp_hostname;

        try {
            Socket theSocket = new Socket(hostname, 13);
            BufferedReader timeIn = new BufferedReader(
                       new InputStreamReader(theSocket.getInputStream()));
            String timeString = timeIn.readLine();
                 if (timeString.isEmpty()) timeString = timeIn.readLine();
            System.out.println("It is " + timeString + " at " + hostname);
        } // end try

    catch (UnknownHostException e) {
        System.err.println(e);
    }

    catch (IOException e) {
        System.err.println(e);
    }

    } // end main

} // end DaytimeClient
