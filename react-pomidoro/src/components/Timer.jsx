import classes from "./Timer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setMode } from "../redux/timerSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const { mode, modes } = useSelector((state) => state.timer);
  console.log(mode, modes);

  const jumpTo = useCallback(
    (id) => {
        dispatch(setMode(id));
    }, [dispatch]
  )

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
        <div className="time">
            {`${mode} = ${modes[mode].time}`}
        </div>
      </div>
    </div>
  );
};

export default Timer;
