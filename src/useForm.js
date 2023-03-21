import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  //   console.log(e.target.name);

  return [
    values,
    (e) => {
      console.log(values);
      console.log([e.target.name]);
      setValues({
        ...values,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    },
  ];
}
