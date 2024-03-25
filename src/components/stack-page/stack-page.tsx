import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../stack-page/stack-page.module.css";
import Stack from "./stack";

export const StackPage: React.FC = () => {
  const [isLoader, setLoader] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [stack, setStack] = useState(() => new Stack<string>());
  const [inputValue, setInputValue] = useState<string>('');
  const [stackArr, setStackArr] = useState<string[] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const addItem = () => {
    if(!inputValue.length) return;

    setInputValue('');
    if (!inputValue.length) return; 
    
    stack.push(inputValue);
    setStackArr(stack.toArray());
    setCurrentStepIndex(0);

  }

  const deleteItem = () => {
    if (stackArr && stackArr.length > 0) {
      stack.pop(); 
      setStackArr(stack.toArray());
    }
    return
  };

  const deleteStack = () => {
    stack.clear();
    setStackArr(stack.toArray());
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <SolutionLayout title="Стек">
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
              isLoader={isLoader}
              disabled={inputValue.length === 0 ? true : false}
            />
            <Button
              text={"Удалить"}
              onClick={deleteItem}
              isLoader={isLoader}
              disabled={stack.getSize() > 0 ? false : true}
            />
          </div>
          <Button
            text={"Очистить"}
            onClick={deleteStack}
            isLoader={isLoader}
            disabled={stack.getSize() > 0 ? false : true}
          />         
        </div>
        <ul className={styles.circles}>
        {stackArr?.map((item, index, arr) => {
          const head = index === arr.length-1 ? 'top' : '';
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={item} tail={index.toString()} head={head}/>
            </li>
          );
        })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
