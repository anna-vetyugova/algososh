interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null; // узнать значение на вершине стека
  getSize: () => number;
  clear: () => void;
  toArray: () => T[]
}

export default class Stack<T> implements IStack<T> {
  private container: T[] = [];
  
  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.getSize() - 1];
  };

  getSize = (): number => this.container.length;

  clear = (): void => {
    this.container = [];
  };

  toArray = (): T[] => {
    return [...this.container];
  }

}

