import React from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {createStyles, Theme, useTheme, WithStyles, withStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';

import {blueColor, themeColor} from "../../utils/themeColor";
import {useAuth} from "../../contexts/AuthContext";
import AppImage from '../../assets/images/logo_full.png'
import Icon from "../../assets/images/logo_title.png";
import {appConfig} from "../../config";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: 'auto',
      border: '1px solid #D9D9D9',
      marginTop: 50,
      height: 200,
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
      padding: theme.spacing(3)
      // paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(1),
      // paddingBottom: theme.spacing(1),
    },
    entryButton: {
      backgroundColor: themeColor,
      color: '#ffffff',
      width: '100%',
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
})

interface IEntranceProps extends WithStyles<typeof styles> {}

const Main: React.FC<IEntranceProps> = (props) => {
  const { classes } = props;
  const {onlineMembers} = useAuth();
  const theme = useTheme();

  return (
    <>
      <header className={classes.appHeader}>
        <img src={Icon} alt={appConfig.title} className={classes.image} />
      </header>
      <Container component="main">
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {onlineMembers ? (
                  <span>{Object.keys(onlineMembers).length}人が作業中...</span>
                ): (
                  <span>まだ誰もオンラインになっていません。最初のユーザーになりましょう！</span>
                )}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {appConfig.title}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <Button variant="contained" className={classes.entryButton}>入室する<MeetingRoomOutlinedIcon /></Button>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={AppImage}
            title="Entrance"
          />
        </Card>
      </Container>
    </>
  )
}

export default withStyles(styles)(Main);