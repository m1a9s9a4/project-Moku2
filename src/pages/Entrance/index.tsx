import React from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {blueColor, themeColor} from "../../utils/themeColor";
import {useAuth} from "../../contexts/AuthContext";
import Icon from "../../assets/images/logo_title.png";
import {appConfig} from "../../config";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AvatarList from "./AvatarList";
import Logo from '../../assets/images/logo.png';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: 'auto',
      border: '1px solid #D9D9D9',
      marginTop: 50,
      maxWidth: 420,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 200,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: Icon,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      width: 220,
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
    entryButton: {
      backgroundColor: themeColor,
      color: '#ffffff',
      width: '100%',
      height: 100,
      fontSize: '25px',
      fontWeight: 800,
    },
    image: {
      position: 'relative',
      height: '50px',
      margin: 'auto',
      display: 'block',

    },
    appHeader: {
      backgroundColor: blueColor,
      height: '50px',
      color: '#ffffff',
      position: 'relative',
    },
    exitBtn: {
      width: '100%',
      height: 50,
      fontSize: '20px',
      fontWeight: 800,
    },
    wrapper: {
      marginTop: 50,
      maxWidth: 420,
      margin: 'auto',
    },
    pageTitle: {
      color: themeColor,
      fontWeight: 900,
    },
    logoImage: {
      width: 50,
      borderRadius: 50,
    },
})

interface IEntranceProps extends WithStyles<typeof styles> {}

const Entrance: React.FC<IEntranceProps> = (props) => {
  const { classes } = props;
  const {onlineMembers, logout, toOnline } = useAuth();
  const history = useHistory();

  const onEntryHandler = async () => {
    await toOnline();
    history.push('/room')
  }

  const onExitHandler = async () => {
    try {
      await logout();
      history.push('/entry');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <header className={classes.appHeader}>
        <img src={Icon} alt={appConfig.title} className={classes.image} />
      </header>
      <Container component="main">
        <Grid container justify="center" style={{marginTop: 50}}>
          <Typography component="h2" variant="h2" align="center">
            ようこそ<br />
            <span className={classes.pageTitle}>{appConfig.title}</span>へ
            <img src={Logo} alt={appConfig.title} className={classes.logoImage} />
          </Typography>
        </Grid>
        <Grid container spacing={2} justify="center" className={classes.wrapper}>
          <Grid container justify="center" item>
            <Typography component="h5" variant="h5">
              {onlineMembers ? (
                <span>{Object.keys(onlineMembers).length}人がもくもく中...</span>
              ): (
                <span>今は誰もオンラインではありません</span>
              )}
            </Typography>
          </Grid>
          <Grid container justify="center" item>
            <AvatarList onlineMembers={onlineMembers} />
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.wrapper}>
          <Button
            variant="contained"
            className={classes.entryButton}
            onClick={onEntryHandler}
          >
            入室する<MeetingRoomOutlinedIcon />
          </Button>
        </Grid>
        <Grid container justify="center" className={classes.wrapper}>
          <Button className={classes.exitBtn} variant="contained" onClick={onExitHandler} >
            ログアウト<ExitToAppIcon />
          </Button>
        </Grid>
      </Container>
    </>
  )
}

export default withStyles(styles)(Entrance);