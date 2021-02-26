import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";

import { contentStyles as styles } from "../../assets/styles";
import { useAuth } from "../../contexts/AuthContext";
import {Person} from "@material-ui/icons";

export interface ISettingsContent extends WithStyles<typeof styles> {}


const Main: React.FC<ISettingsContent> = (props) => {
  const { classes } = props;
  const {username, updateUser} = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const updateHandler = async () => {
    if (!newUsername || newUsername === username) {
      return;
    }

    await updateUser(newUsername);
  }

  const onUsernameChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  }

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
              onChange={onUsernameChangeHandler}
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid style={{marginTop: '10px'}} md={5}>
            <Button fullWidth color="primary" variant="contained" onClick={updateHandler}>更新</Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Main);