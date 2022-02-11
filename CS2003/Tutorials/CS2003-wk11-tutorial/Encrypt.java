/* 
 * Super secret encryption 
 * By Anonymouse, Nov 2020
 */

/* see https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/RandomStringUtils.html */
import org.apache.commons.lang3.RandomStringUtils;

class Encrypt {

    public static void main(String[] args) {

        if (args.length == 1) {
            /* take the input string (plaintext) and return 
             * ciphertext of the same length
             */

            System.out.println("Plaintext: " + args[0]);
            String ciphertext = RandomStringUtils.randomAscii(args[0].length());
            System.out.println("Ciphertext: " + ciphertext);

        } else {
            
            System.out.println("Try passing a string as an argument");
        
        }
    }
}
