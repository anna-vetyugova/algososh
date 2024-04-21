import React, { ChangeEvent } from "react";

export function useForm(inputinput={}) {
  const [input, setinput] = React.useState(inputinput);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setinput({...input, [name]: value});
  };
  return {input, handleChange, setinput};
}