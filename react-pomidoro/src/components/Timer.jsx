import classes from "./Timer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { incrementRound, setMode, updateModeTime} from "../redux/timerSlice";
import useCountdown from "../hooks/useCountdown";
import { LONG_BREAK, POMODORO, SHORT_BREAK } from "../constants";
import { formatTime } from "../helpers"; 

const Timer = () => {
  const dispatch = useDispatch();
  const { mode, modes, round, longBreakInterval} = useSelector((state) => state.timer);
  console.log(mode, modes);

  const jumpTo = useCallback(
    (id) => {
      dispatch(setMode(id));
      reset();
    },
    [dispatch]
  );

  const { ticking, start, stop, reset, timeLeft } = useCountdown({
    minutes: modes[mode].time,
    onStart: () => {},
    onStop: () => {},
    onComplete: () => {
      next(); 
    },
  });

  const toggleTimer = useCallback(() => {
    if (ticking) {
      stop();
    } else {
      start();
    }
  }, [start, stop, ticking]);

  const next = useCallback(() => {
    switch(mode) {
      case LONG_BREAK: 
      case SHORT_BREAK:
        jumpTo(POMODORO);
        break; 
      default:
        dispatch(incrementRound());
       
        if (round % (longBreakInterval+1) === 0) {
          console.log('hi')
          jumpTo(LONG_BREAK)
        } else {
          jumpTo(SHORT_BREAK)
        }
        
        break;
    }
  }, [dispatch, jumpTo, mode, start]);

  useEffect(() => {
    const storedModes = JSON.parse(localStorage.getItem('modes'));
    if (storedModes) {
      for (const modeId in storedModes) {
        if (modes[modeId]) {
          dispatch(updateModeTime({ mode: modeId, time: storedModes[modeId].time }));
        }
      }
    };
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <ul>
          {Object.values(modes).map(({ id, label }) => (
            <button key={id} active={id === mode} id={id} onClick={() => jumpTo(id)}>
              {label}
            </button>
          ))}
        </ul>
        <div><span style={{color: 'red', fontSize: '50px'}}>{`${mode}`}</span>{`round = ${round}, longBreakInterval = ${longBreakInterval}`}</div>
        <div className={classes.time}>
            {`${mode} = ${formatTime(timeLeft)}`}
        </div>
        <div className={classes.timeBtns}>
          <button onClick={toggleTimer}>TOGGLE</button>
          <button onClick={next}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
