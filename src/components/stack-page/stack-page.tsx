import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../stack-page/stack-page.module.css";
import Stack from "./stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [isLoader, setLoader] = useState<string>('');
  const [stack, setStack] = useState(() => new Stack<string>());
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueIndex, setInputValueIndex] = useState<number | null>(null);
  const [stackArr, setStackArr] = useState<string[] | null>(null);

  const addItem = () => {
    if (!inputValue.length) return;
    setLoader('addItem');
    
    stack.push(inputValue);
    const newArr = stack.toArray();
    setStackArr(newArr);
    setInputValueIndex(newArr.length);

    setTimeout(() => {
      setInputValue('');
      setLoader('');
      setInputValueIndex(null);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteItem = () => {
    if (stack.getSize() > 0) {
      setLoader('deleteItem');
      if(stackArr) setInputValueIndex(stackArr.length); 

      setTimeout(() => {
        stack.pop();
        setStackArr(stack.toArray());
        setLoader('');
        setInputValueIndex(null);
      }, SHORT_DELAY_IN_MS);

    }
  };

  const deleteStack = () => {
    setLoader('deleteStack');

    setTimeout(() => {
      stack.clear();
      setStackArr(stack.toArray());
      setLoader('');
    }, SHORT_DELAY_IN_MS);
  };

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
              isLoader={isLoader === 'addItem' ? true : false}
              disabled={inputValue.length === 0 || isLoader ? true : false}
            />
            <Button
              text={"Удалить"}
              onClick={deleteItem}
              isLoader={isLoader === 'deleteItem' ? true : false}
              disabled={stack.getSize() === 0 || isLoader ? true : false}
            />
          </div>
          <Button
            text={"Очистить"}
            onClick={deleteStack}
            isLoader={isLoader === 'deleteStack' ? true : false}
            disabled={stack.getSize() === 0 || isLoader ? true : false}
          />         
        </div>
        <ul className={styles.circles}>
        {stackArr?.map((item, index, arr) => {
          const head = index === arr.length-1 ? 'top' : '';
          const state = index === arr.length-1 && inputValueIndex !== null ? ElementStates.Changing : ElementStates.Default;
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={item} tail={index.toString()} head={head} state={state} />
            </li>
          );
        })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
