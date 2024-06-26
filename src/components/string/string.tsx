import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../string/string.module.css";
import reverseStringWithSteps from "./string-algo";
import { getChartStatus } from "./utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");


  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoader, setLoader] = useState(false);

  const startAlgorithm = () => {
    const newSteps = reverseStringWithSteps(input);
    setSteps(newSteps);
    setLoader(true);
    setCurrentStepIndex(0);

    if (!newSteps.length) return;
    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setLoader(false);
        return;
      }
      setCurrentStepIndex(++index);
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.main}>
          <Input
            isLimitText={true}
            maxLength={11}
            extraClass={styles.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            value={input}
          />
          <Button
            text={"Развернуть"}
            onClick={startAlgorithm}
            isLoader={isLoader}
            disabled={ input.length ? false : true}
          />
        </div>
        <ul className={styles.circles}>
          {steps?.[currentStepIndex].map((char, index) => {
            // console.log(char);
            const status = getChartStatus({ index, steps, currentStepIndex });
            const state =
              status === "sorted"
                ? ElementStates.Modified
                : status === "sorting"
                ? ElementStates.Changing
                : ElementStates.Default;
            return (
              <li key={index} className={styles.circle}>
                <Circle letter={char} state={state} />
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
