import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../stack-page/stack-page.module.css";
import { Queue
 } from "./gueue-algo";
export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const [queue, setQueue] = useState(() => new Queue<string>(6));
  const [queueArr, setQueueArr] = useState<(string | null)[]>([]);

  React.useEffect(() => {
    const arr: string[] = new Array(6).fill('');
    setQueueArr(arr);
  },[]); 

  const addItem = () => {
    if(!inputValue.length) return;
    setInputValue('');
    
    queue.enqueue(inputValue);
    setQueueArr(queue.toArray()); 

    // console.log(queue);
  }
  const deleteItem = () => {
    if (queueArr && queueArr.length > 0) {
      queue.dequeue(); 
      setQueueArr(queue.toArray());  
    }
    // console.log(queue);
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
            />
            <Button
              text={"Удалить"}
              onClick={deleteItem}
              disabled={queue.getLength() > 0 ? false : true}
            />
          </div>
          <Button
            text={"Очистить"}
            onClick={deleteQueue}
            disabled={queue.getLength() > 0 ? false : true}
          />         
        </div>
        <ul className={styles.circles}>
        {queueArr?.map((item, index, arr) => {
          const head = queue.getHead() === index && queue.getLength() > 0 ? 'head' : '';
          const tail = queue.getTail() - 1 === index && queue.getLength() > 0 ? 'tail' : '';
          
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={item?.toString()} tail={tail} head={head}/>
            </li>
          );
        })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
