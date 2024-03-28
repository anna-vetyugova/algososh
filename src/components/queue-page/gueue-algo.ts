interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  toArray: () => T[];
  getTail: () => number;
  getHead: () => number;
  getLength: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private lastAddedIndex: number | null = null;
  private lastDeletedIndex: number | null = null;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  getLastAddedIndex = (): number | null => {
    return this.lastAddedIndex;
  };
  getLastDeletedIndex = (): number | null => {
    return this.lastDeletedIndex;
  };

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    
   const index = this.tail % this.size;
   this.container[index] = item;
   this.tail++;
   this.length++;
   this.lastAddedIndex = index; 
   
  };

  dequeue = () => {
    const index = this.head % this.size;
    this.container[index] = null;
    this.head++;
    this.length--;
    this.lastDeletedIndex = index; 
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  clear = (): void => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  toArray = (): T[] => {
    const returnArr: T[] = [];
    for (let i = 0; i < this.size; i++) {
      returnArr.push(this.container[i] as T);
    }
    return returnArr;
  }
  getTail = (): number => {
    return this.tail
  }
  getHead = (): number => {
    return this.head
  }
  getLength = (): number => {
    return this.length
  }

  isEmpty = () => this.length === 0;
}
