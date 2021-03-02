import React, {useEffect, useRef, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import {exitColor} from "../../utils/themeColor";
import {Input} from "@material-ui/core";

import { useVoiceChatContext } from '../../contexts/VoiceChatContext';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Room from "../../pages/Room/Room";
import {SfuRoom} from "skyway-js";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      marginBottom: '15px',
    },
    searchBar: {
      backgroundColor: '#e0e0e0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
    },
    block: {
      display: 'block',
    },
    addUser: {
      marginRight: theme.spacing(1),
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    btn: {
      width: '80%',
      fontSize: '20px',
      fontWeight: 800,
      borderColor: exitColor,
      color: '#FFFFFF',
    }
  });

export interface IVoiceChatContent extends WithStyles<typeof styles> {
}

const VoiceChatContent: React.FC<IVoiceChatContent> = (props) => {
  const { classes } = props;
  const [newRoomName, setNewRoomName] = useState('');
  const [room, setRoom] = useState<SfuRoom|null>(null);
  const [talking, setTalking] = useState(false);
  const { peer } = useVoiceChatContext();
  const [localStream, setLocalStream] = useState<MediaStream|null>(null);
  const localVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.once('open', async () => {
      // const devices = await navigator.mediaDevices.enumerateDevices();
      // const hasVideoDevices = devices.filter(device => device.kind === 'videoinput').length !== 0;
      // if (hasVideoDevices) {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(localStream => {
          setLocalStream(localStream);
          localVideo.current!.srcObject = localStream
        })
      // }
    })
  }, [localVideo])

  const onCreateRoomHandler = () => {
    console.log('onClick');
    if (!newRoomName) {
      return;
    }

    const newRoom = peer.joinRoom(newRoomName, {
      mode: 'sfu',
      stream: localStream,
    }) as SfuRoom;

    if (newRoom) {

    }

    setTalking(true);
    setRoom(newRoom);
  }

  if (room) {
    room.on('peerJoin', () => {

    })
  }

  console.log(talking);
  console.log(localVideo);

  return (
    <>
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center" >
              新しくルームを作る
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Grid container spacing={2} justify="center">
            <Grid md={2}>ルーム名</Grid>
            <Grid md={4}>
              <Input type="text" onChange={e => setNewRoomName(e.target.value)} fullWidth />
            </Grid>
            <Grid container item md={6} justify="center" >
              <Button className={classes.btn} variant="contained" color="primary" onClick={onCreateRoomHandler} >
                ボイスチャットを始める
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
      {talking ? (
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center" >
                「{newRoomName}」参加中
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Grid container spacing={2} justify="center">
              <video width="400px" ref={localVideo} autoPlay playsInline />
            </Grid>
          </div>
        </Paper>
      ) : (<></>)}
    </>
  )
}

export default withStyles(styles)(VoiceChatContent);
