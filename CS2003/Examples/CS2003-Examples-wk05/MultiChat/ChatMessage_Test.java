/**
  ChatMessageFormat for use with MultiChatClient and MultiChatServer

  Testing via visual inspection of encode and decode process.

  Saleem Bhatti, 01 Oct 2019
*/

public class ChatMessage_Test {

  public static void main(String[] args) {

    String m = "[src=@saleem][body=Hello World!]";

    try {
      ChatMessage cm1 = ChatMessage.decode(m);
      System.out.println("cm1 src: " + cm1.getSrc());
      System.out.println("cm1 body: " + cm1.getBody());

      ChatMessage cm2 = ChatMessage.encode("@guest", "Hello Back!");
      String cm2_m = cm2.getMessage();
      System.out.println("cm2: " + cm2_m);

      ChatMessage cm3 = ChatMessage.decode(cm2_m);
      System.out.println("cm3 src: " + cm3.getSrc());
      System.out.println("cm3 body: " + cm3.getBody());
    }
    catch (ChatMessageDecodeException e) { System.out.println(e); }
    catch (ChatMessageEncodeException e) { System.out.println(e); }

  }

}
