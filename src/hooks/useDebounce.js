import { useEffect, useState } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;

/*
We will use the useEffect hook to implement the debouncing
effect. Inside the useEffect hook, we will create a timer
that updates the debouncedValue state with the current value
passed as an argument after a delay of 350 milliseconds. We
will implement the timer using the setTimeout method.

To cancel the previous timer if the value changes before the
timer elapses, we'll define a cleanup function using the
clearTimeout method.

When the user's input value changes, the component re-renders,
causing the custom hook to be called again. This time, the
value passed to the hook is different. Since the useEffect
inside the hook depends on this value, it will re-run. As we
have learned earlier, it will call the cleanup function for
the previous render before re-running. Effectively, when the
user keeps typing, this hook will keep clearing the previous
timer and registering the new timer.
*/

/*
Making an API request for every keystroke can overload the
server and slow down the application. Additionally, another
issue arises when multiple API requests are triggered one
after the other with each keystroke. If the first request
takes longer to process and is served after the second one,
the user might end up interacting with inaccurate or outdated data.

To fix this issue we will use a debouncing. Debouncing is a
technique where frequent execution of a function is prevented
by delaying it for some time. All invocations except the last
one will be ignored.

In our case, we can use debouncing to ensure that the search
request to a server is only sent after a certain time interval
has passed after the user stops typing. This prevents sending
a request for each keystroke.
*/
