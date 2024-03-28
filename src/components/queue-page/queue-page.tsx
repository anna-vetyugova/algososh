import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../stack-page/stack-page.module.css";
import { Queue
 } from "./gueue-algo";
import { ElementStates } from "../../types/element-states";


export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueIndex, setInputValueIndex] = useState<number | null>(null);
  const [queue, setQueue] = useState(() => new Queue<string>(7));
  const [queueArr, setQueueArr] = useState<(string)[]>([]);
  const [isLoader, setLoader] = useState(false);

  React.useEffect(() => {
    const arr: string[] = new Array(7).fill('');
    setQueueArr(arr);
  },[]); 

  const addItem = () => {
    if (!inputValue.length) return;
    setLoader(true);
    
    queue.enqueue(inputValue);
    const index = queue.getLastAddedIndex();
    setInputValueIndex(index);

    setTimeout(() => {
    const newArr = queue.toArray(); 
    setQueueArr(newArr); 
      setInputValueIndex(null);
      setInputValue('');
      setLoader(false);
    }, 500);
  }

  const deleteItem = () => {
    if (queueArr && queueArr.length > 0) {
      setLoader(true);
      
      queue.dequeue();
      const index = queue.getLastDeletedIndex();
      console.log(index);
      setInputValueIndex(index);
  
      setTimeout(() => {
      const newArr = queue.toArray(); 
      setQueueArr(newArr); 
        setInputValueIndex(null);
        setInputValue('');
        setLoader(false);
      }, 500);
    }
  }

  const deleteQueue = () => {
    queue.clear();
    setQueueArr(queue.toArray());
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.inputContainer}>
            <Input
              isLimitText={true}  
              max={4}
              maxLength={4}
              placeholder='Введите текст'
              type={'text'}
              onChange={onChange}
              extraClass={styles.input}
              value={inputValue}
            />
            <Button
              text={"Добавить"}
              onClick={addItem}
              disabled={inputValue.length > 0 ? false : true}
              isLoader={isLoader ? true : false}
            />
            <Button
              text={"Удалить"}
              onClick={deleteItem}
              disabled={queue.getLength() > 0 ? false : true}
              isLoader={isLoader ? true : false}
            />
          </div>
          <Button
            text={"Очистить"}
            onClick={deleteQueue}
            isLoader={isLoader ? true : false}
          />         
        </div>
        <ul className={styles.circles}>
        {queueArr?.map((item, index, arr) => {
          const head = queue.getHead() === index && queue.getLength() > 0 ? 'head' : '';
          const tail = queue.getTail() - 1 === index && queue.getLength() > 0 ? 'tail' : '';
          const state = index === inputValueIndex ? ElementStates.Changing : ElementStates.Default;
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={item?.toString()} tail={tail} head={head} index={index} state={state}/>
            </li>
          );
        })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
