import React from 'react';

const useTimer = (time: any) => {
  const [countDown, setCountDown] = React.useState<number>(1);
  const [runTimer, setRunTimer] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timerId: any;

    if (runTimer) {
      setCountDown(time);
      timerId = setInterval(() => {
        setCountDown(countDown => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer, time]);

  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer(t => !t);

  const seconds: any = String(countDown % 60).padStart(2, '0');
  const minutes: any = String(Math.floor(countDown / 60)).padStart(2, '0');
  return {
    minutes,
    seconds,
    togglerTimer,
    runTimer,
  };
};

export default useTimer;
