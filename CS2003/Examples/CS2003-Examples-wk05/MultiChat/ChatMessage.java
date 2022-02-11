/**
  ChatMessageFormat for use with MultiChatClient and MultiChatServer

  Demonstration of a TCP server that can handle multiple clients.

  Clients connect, send messages, and those messages are relayed to every
  other connected client.

  Saleem Bhatti, 01 Oct 2019
*/

import java.util.regex.*;

class ChatMessage {

  private String src_;
  private String body_;
  private String message_;

  // Oracle Java 11 Tutorial on Regular Expressions is at:
  // https://docs.oracle.com/javase/tutorial/essential/regex/

  // message format is:
  //   [src=<srcC>][body=<bodyC>]
  // where <srcC> and <bodyC> are defined below.
  // For example:
  //   [src=@saleem][body=Hello World!]

  // content for each field
  static private final String srcC_ = "[a-zA-Z0-9@]+"; // a userid
  static private final String bodyC_ = "[^\\[\\]]+";
  static private final Pattern srcC_P_ = Pattern.compile(srcC_);
  static private final Pattern bodyC_P_ = Pattern.compile(bodyC_);

  // field definitions

  static private final String srcF_ = "\\[src=(?<src>" + srcC_ + ")\\]";
  static private final String bodyF_ = "\\[body=(?<body>" + bodyC_ + ")\\]";
  static private final Pattern srcF_P_ = Pattern.compile(srcF_);
  static private final Pattern bodyF_P_ = Pattern.compile(bodyF_);

  // message format defintion
  static private final String messageF_ = srcF_ + bodyF_;
  static private final Pattern messageF_P_ = Pattern.compile(messageF_);

  public String getSrc() { return new String(src_); }
  public String getBody() { return new String(body_); }
  public String getMessage() { return new String(message_); }

  public static ChatMessage encode(String src, String body)
  throws ChatMessageEncodeException {

    if (src == null || body == null) {
      throw new ChatMessageEncodeException("null info passed");
    }

    if (!src.matches(srcC_)) {
      throw new ChatMessageEncodeException("src has bad format");
    }

    if (!body.matches(bodyC_)) {
      throw new ChatMessageEncodeException("body has bad format");
    }

    ChatMessage c = new ChatMessage();
    c.src_ = new String(src);
    c.body_ = new String(body);
    c.message_ = new String("[src=" + src + "][body=" + body + "]");

    return c;
  }

  public static ChatMessage decode(String message)
  throws ChatMessageDecodeException {

    if (message == null) {
      throw new ChatMessageDecodeException("null message");
    }

    Matcher m = messageF_P_.matcher(message);

    if (!m.find()) {
      throw new ChatMessageDecodeException("bad message format");
    }
    /*
     * To get more detailed error reporting during debugging,
     * use the regex for each field and match against each.
     */

    ChatMessage c = new ChatMessage();
    c.message_ = new String(message);
    c.src_ = m.group("src");
    c.body_ = m.group("body");

    return c;
  }

}
