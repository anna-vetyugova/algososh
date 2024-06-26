import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../fibonacci-page/fibonacci-page.module.css";
import { fibbonacchiNumber } from "./fibonacci-algo";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setLoader] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [input, setInput] = useState<string>('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<number[] | null>(null);

  const startAlgorithm = () => {
    const newSteps: number[] = fibbonacchiNumber(parseInt(input));
    setSteps(newSteps);
    setLoader(true);
    setCurrentStepIndex(0);
  
    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setLoader(false);
        return;
      }
      setCurrentStepIndex(++index);
    }, DELAY_IN_MS);
  }


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(Number.isInteger(parseFloat(e.target.value)) === false) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setInput(e.target.value);
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.inputContainer}>
            <Input
              isLimitText={true}
              max={19}
              min={1}
              maxLength={19}
              placeholder='Введите число'
              type={'number'}
              onChange={onChange}
              value={input}
            />
          </div>
          <Button
            text={"Развернуть"}
            onClick={startAlgorithm}
            isLoader={isLoader}
            disabled={ input.length > 2 ||  parseInt(input) > 19 || isDisabled ||  parseInt(input) < 0 ? true : false}
          />
        </div>
        <ul className={styles.circles}>
          {steps?.map((number, index) => {
            while(index <= currentStepIndex) {
              return (
                <li key={index} className={styles.circle}>
                  <Circle letter={number.toString()} index={index}/>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
