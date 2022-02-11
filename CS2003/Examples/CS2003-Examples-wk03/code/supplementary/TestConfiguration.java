/*
 * Demo of the Configuration class
 */

import java.io.*;
import java.net.*;
import java.text.*;
import java.util.*;

class TestConfiguration {

    static Configuration c_;

    public static void main(String args[]) {
        c_ = new Configuration("server.properties");
        System.out.println("Configured port number is: " + c_.port_);
    }
}
