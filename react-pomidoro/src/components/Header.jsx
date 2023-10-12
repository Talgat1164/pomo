import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import TuneIcon from "@mui/icons-material/Tune";

const Header = () => {
  return (
    <header className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/settings'>
              <TuneIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
