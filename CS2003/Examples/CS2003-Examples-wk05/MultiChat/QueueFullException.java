/*
 * CS2003 Simple queue example : "circular" FIFO queue.
 * Saleem Bhatti, 01 Oct 2019.
 * Original concept, Colin Allison.
 *
 */

public class QueueFullException extends Exception {
  public QueueFullException() { }
  public QueueFullException(String s) { super(s); }
}
