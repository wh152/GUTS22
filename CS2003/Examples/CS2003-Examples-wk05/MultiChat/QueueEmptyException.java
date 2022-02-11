/*
 * CS2003 Simple queue example : "circular" FIFO queue.
 * Saleem Bhatti, 01 Oct 2019.
 * Original concept, Colin Allison.
 *
 */

public class QueueEmptyException extends Exception {
  public QueueEmptyException() { }
  public QueueEmptyException(String s) { super(s); }
}
