import classes from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateModeTime, setLongBreakInterval} from './redux/timerSlice';
import { useNavigate } from 'react-router-dom'; // rrd5 useHistory

const Settings = () => {
  const navigate = useNavigate(); // useHistory

  const back = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  const { modes, longBreakInterval} = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  const handleTimeChange = (modeId, newTime) => {
    dispatch(updateModeTime({mode: modeId, time: newTime})); 

    const updatedModes = {...modes, [modeId]: {...modes[modeId], time: newTime}};
    localStorage.setItem('modes', JSON.stringify(updatedModes))
  }

  return (
    <div>
      <div className="section">
        <h2 className={classes.sectionTitle}>Time Settings</h2>
        <div className="sectionControls">
          {Object.values(modes).map(({ id, label, time }) => (
            <input key={id} className={classes.timeInput} onChange={(e) => {
              const newTime = parseInt(e.target.value) * 60; 
              handleTimeChange(id, newTime);           
            }} min={1} type="number" value={time / 60} />
          ))}
        </div>
        
      </div>
      <div className="section">
        <h2 className={classes.sectionTitle}>Long Break Interval{` => ${longBreakInterval}`}</h2>
        <input type="number" value={longBreakInterval} onChange={(e) => {
          dispatch(setLongBreakInterval(e.target.value));
        }} />
      </div>
      <div>
        <button onClick={back}>OK</button>
      </div>
    </div>
  )
}

export default Settings