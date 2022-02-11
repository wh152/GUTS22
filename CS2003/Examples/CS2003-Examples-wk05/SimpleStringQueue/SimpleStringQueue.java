/*
 * CS2003 Simple queue example : "circular" FIFO queue.
 * Saleem Bhatti, 01 Oct 2019.
 * Original concept, Colin Allison.
 *
 */

public class SimpleStringQueue {

  private final int max_q_size_ = 4; // for ease of demonstration only
  private String[] queue_ = new String[max_q_size_]; // should be Object or Task, but easier to demonstrate by using String
  private int head_ = 0;
  private int tail_ = 0;
  private int count_ = 0;

  public boolean isEmpty() { return (count_ == 0); }

  public boolean isFull() { return (count_ == max_q_size_); }

  public void printQ() {
    String s;
    s = String.format("\n  head: %3d\n  tail: %3d\n count: %3d",
     head_, tail_, count_);
    System.out.println(s);
    if (isEmpty()) { System.out.println(" ** Q is empty\n"); }
    if (isFull()) { System.out.println(" ** Q is full\n"); }
    for (int i = 0; i < max_q_size_; ++i) {
      s = String.format("%3d %-8s %-8s : %s",
      i,
      i == head_ ? " <- head" : "",
      i == tail_ ? " <- tail" : "",
      queue_[i] == null ? "(null)" : queue_[i]);
      System.out.println(s);
    }
    System.out.println(); // blank line
  }

  public void add(String s) throws QueueFullException {
    if (isFull()) {
      QueueFullException qfe = new QueueFullException();
      throw qfe;
    }
    else {
      queue_[tail_] = s;
      count_++;
      if (count_ == 1) { head_ = tail_; }
      tail_ = (tail_ + 1) % max_q_size_;
    }
  }

  public String remove() throws QueueEmptyException {
    String s;
    if (isEmpty()) {
      QueueEmptyException qee = new QueueEmptyException();
      throw qee;
    }
    else {
      s = queue_[head_];
      queue_[head_] = null;
      count_--;
      head_ = (head_ + 1) % max_q_size_;
      return (s);
    }
  }

} // SimpleStringQueue
