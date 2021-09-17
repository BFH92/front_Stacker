import React, { useEffect } from "react";
import './header.scss';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Settings from "../../Assets/Svg/Header/Settings";
import Notifications from '../../Assets/Svg/Header/Notifications';
import Badge from '@material-ui/core/Badge';
import ThemeSwitch from './ThemeSwitch';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Nav from './NavTabs';
import UserMenu from "./UserMenu";
import VisitorMenu from './VisitorMenu';
import { useHistory } from "react-router";
import UsersAPIManager from "../../Services/RailsApi/UsersFetch";
import { RegisterUserLogoutStatus } from "../../Store";
import CompaniesAPIManager from "../../Services/RailsApi/CompaniesFetch";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    logo: {
      flexGrow: 1,
      display: "grid",
      justifyContent: "start",
    },
    grid_column_auto: {
      display: "grid",
      gridAutoFlow: "column",
      placeItems: "center",
      gridGap: 20,
    }
  })
);

const Header = ({ user }) => {
  const isLogged = useSelector((state) => state.user.isLogged);
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  let logged_as
  logged_as = useSelector(state=> state.user.logged_as)

  const logout = async (e) => {
  
    e.preventDefault();
    let response;
    dispatch(RegisterUserLogoutStatus());
    logged_as === "company" ? response = await CompaniesAPIManager.logout() : response = await UsersAPIManager.logout();
  
    user.setIsLogged(false);
    console.log(response);
    history.push("/");
  };

  useEffect(() => {    
    return () => {};
  }, [logged_as]);
  
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Nav />
        <div className={classes.grid_column_auto}>        
          <ThemeSwitch />
          {isLogged ? (
            <div className={classes.grid_column_auto}>
              <Link to="/user/notifications">
                <Badge color="secondary" variant="dot">
                  <Notifications />
                </Badge>
              </Link>
              <Link to="/user/settings">
                <Settings />
              </Link>
              <UserMenu logout={logout}/>
            </div>
          ) : (
            <VisitorMenu />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
