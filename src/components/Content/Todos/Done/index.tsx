import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import List from "@material-ui/core/List";

import { contentStyles as styles } from "../../../../assets/styles";
import { useAuth } from "../../../../contexts/AuthContext";

export interface DoneTodoProps extends WithStyles<typeof styles> {}

const Main: React.FC<DoneTodoProps> = (props) => {
  const { doneTodos } = useAuth();
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" variant="h6" component="p" align="center">
          完了 {doneTodos ? Object.keys(doneTodos).length : '0'} タスク
        </Typography>
        <List>
          {doneTodos ? (
            Object.keys(doneTodos).map((key, i) => {
              return (
                <ListItem key={i}>
                  <ListItemIcon>
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