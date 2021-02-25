import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import Checkbox from '@material-ui/core/Checkbox';

import { contentStyles as styles } from "../../assets/styles";
import { useAuth } from "../../contexts/AuthContext";
import {Person} from "@material-ui/icons";

export interface ISettingsContent extends WithStyles<typeof styles> {}


const Main: React.FC<ISettingsContent> = (props) => {
  const { classes } = props;
  const {username} = useAuth();
  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center" >
            <Person />
            <Typography>ユーザー情報</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Grid container>
          <Grid md={2} >
            <Typography>ユーザー名</Typography>
          </Grid>
          <Grid md={7} >
            <TextField
              fullWidth
              type="text"
              defaultValue={username}
              className={classes.textField}
            />
          </Grid>
          <Grid md={2}>
            <Button>追加</Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Main);