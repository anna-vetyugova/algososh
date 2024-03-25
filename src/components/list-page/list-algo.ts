export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: (element: T) => void;
  deleteTail: (element: T) => void;
  toArray: () => T[];
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(element: T) {
    const node = new Node(element);

    if(this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }
  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
  }
  const node = new Node(element);

  // добавить элемент в начало списка
  if (index === 0) {
      node.next = this.head;
      this.head = node;
  } else {
      let curr = this.head;
      let prev: Node<T> | null = null;
      let currIndex = 0;

      // перебрать элементы в списке до нужной позиции
      while (currIndex < index && curr !== null) {
          prev = curr;
          curr = curr.next;
          currIndex++;
      }

      // добавить элемент
      if (prev !== null) {
          prev.next = node;
      }
      node.next = curr;
  }

  this.size++;
  }

  deleteByIndex(index: number): void {
    if (index < 0 || index >= this.size) {
        console.log('Enter a valid index');
        return;
    }

    let curr = this.head;
    let prev: Node<T> | null = null;
    let currIndex = 0;

    // перебрать элементы в списке до нужной позиции
    while (currIndex < index && curr !== null) {
        prev = curr;
        curr = curr.next;
        currIndex++;
    }

    // если узел найден, удалить его
    if (curr !== null) {
        if (prev === null) {
            // удаление из начала списка
            this.head = curr.next;
        } else {
            // удаление из середины или конца списка
            prev.next = curr.next;
        }
        this.size--;
    }
  }

  deleteHead() {
    let current: Node<T> | null = this.head;
    
    while(current && current.next !== null) {
      current = current?.next;  
    }
  }

  deleteTail() {
    // если один элемент в списке
    if (this.head && this.head.next === null) {
      this.head = null;
      this.size = 0;
      return;
    }

    let current: Node<T> | null = this.head;
    let prev: Node<T> | null = null;

    while(current && current.next !== null) {
      prev = current;
      current = current?.next;  
    }
    if (prev !== null) {
      prev.next = null;
    }

    if (current === this.head) {
      this.head = null;
    }
    this.size--;
  }
  
  getSize() {
    return this.size;
  }

  toArray = (): T[] => {
    const returnArr: T[] = [];
    let current = this.head;
    
    while (current !== null) {
      returnArr.push(current.value);
      current = current.next;
    }

    return returnArr;
  }
}

