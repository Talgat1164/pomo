import classes from './Settings.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateModeTime } from './redux/timerSlice';
import { useNavigate } from 'react-router-dom'; // rrd5 useHistory

const Settings = () => {
  const navigate = useNavigate(); // useHistory

  const back = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  const { modes } = useSelector((state) => state.timer);
  const dispatch = useDispatch();

  return (
    <div>
      

      <div className="section">
        <h2 className={classes.sectionTitle}>Time Settings</h2>
        <div className="sectionControls">
          {Object.values(modes).map(({ id, label, time }) => (
            <input key={id} className={classes.timeInput} onChange={(e) => {
              dispatch(updateModeTime({ mode: id, time: e.target.value }))
            }} min={1} type="number" value={time} />
          ))}
        </div>
        <div>
            <button onClick={back}>OK</button>
          </div>
      </div>
    </div>
  )
}

export default Settings