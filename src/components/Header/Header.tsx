import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import {themeColor, lightColor} from '../../utils/themeColor';
import {useAuth} from "../../contexts/AuthContext";
import {Tab, Tabs} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: themeColor,
    },
    secondaryBar: {
      backgroundColor: themeColor,
      zIndex: 0,
      paddingTop: '15px',
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
    appTitle: {
      fontFamily: 'Borsok',
      fontWeight: 900,
      fontSize: '30px',
    }
  });

interface HeaderProps extends WithStyles<typeof styles> {
  setTab: (tab: number) => void;
  tab: number;
}

const Header = (props: HeaderProps) => {
  const { setTab, tab, classes } = props;

  const onChangeHandler = (e: React.ChangeEvent<{}>, newVal: number) => {
    setTab(newVal);
  }

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                <span className={classes.appTitle}>{process.env.REACT_APP_TITLE}</span>
                にようこそ！今日の作業も頑張りましょう！
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" >
                「{process.env.REACT_APP_TITLE}」はオンライン上で不特定多数と「もくもく会」をする場所を提供し、他の頑張っている人を見てモチベーションを生むきっかけを作ります。<br />
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={tab} textColor="inherit" onChange={onChangeHandler}>
          <Tab textColor="inherit" label="トップ" />
          <Tab textColor="inherit" label="完了タスク一覧" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);