import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import Checkbox from '@material-ui/core/Checkbox';

import { contentStyles as styles } from "../../../assets/styles";
import { useAuth } from "../../../contexts/AuthContext";

export interface ContentProps extends WithStyles<typeof styles> {}

interface ITodo {
  text: string;
  done: boolean;
}

const Index: React.FC<ContentProps> = (props) => {
  const [todo, setTodo] = useState('');
  const { addTodo, removeTodo, doneTodo, todos } = useAuth();
  const { classes } = props;

  const onKeyupHandler = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      addTodos(e)
    }
  }

  const addTodos = (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    addTodo(todo);
    setTodo('');
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  }

  const onCheckChangeHandler = (e) => {
    if (e.target.value) {
      removeTodo(e.target.value);
      doneTodo(todos[e.target.value].text);
    }
  }

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center" >
            <Grid item>
              <PlaylistAddIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="今日やることをここに追加しましょう！"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                type="text"
                value={todo}
                onChange={onChangeHandler}
                onKeyUp={onKeyupHandler}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser} onClick={addTodos}>
                追加
              </Button>
              <IconButton>
                <FileCopyIcon className={classes.block} color="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" variant="h6" component="p" align="center">
          残 {todos ? Object.keys(todos).length : '0'} タスク
        </Typography>
        <List>
          {todos ? (
            Object.keys(todos).map((key, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        value={key}
                        onChange={onCheckChangeHandler}
                        checked={false}
                      />
                    </ListItemIcon>
                    <ListItemText primary={todos[key].text} />
                  </ListItem>
                )
            })
          ): (
            <ListItem>まだタスクの登録がありません</ListItem>
          )}
        </List>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Index);