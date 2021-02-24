import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import List from "@material-ui/core/List";
import DoneIcon from '@material-ui/icons/Done';

import { contentStyles as styles } from "../../../../assets/styles";
import { useAuth } from "../../../../contexts/AuthContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

export interface DoneTodoProps extends WithStyles<typeof styles> {}

const Main: React.FC<DoneTodoProps> = (props) => {
  const { doneTodos } = useAuth();
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center" >
            <Typography color="textSecondary" variant="h6" component="p" align="center">
              完了 {doneTodos ? Object.keys(doneTodos).length : '0'} タスク
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <List>
          {doneTodos ? (
            Object.keys(doneTodos).map((key, i) => {
              return (
                <ListItem key={i}>
                  <ListItemIcon>
                    <span className={classes.doneIcon}>
                      <DoneIcon />
                    </span>
                  </ListItemIcon>
                  <ListItemText primary={doneTodos[key].text} />
                </ListItem>
              )
            })
          ): (
            <ListItem>完了タスクがまだありません</ListItem>
          )}
        </List>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Main);