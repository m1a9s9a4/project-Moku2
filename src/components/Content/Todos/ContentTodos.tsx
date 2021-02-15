import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import Checkbox from '@material-ui/core/Checkbox';



const styles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    },
    searchBar: {
      backgroundColor: '#e0e0e0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
      backgroundColor: '#FFFFFF',
      padding: '2px 5px',
      borderRadius: '5px',
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
    icon: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  });

export interface ContentProps extends WithStyles<typeof styles> {}

interface ITodo {
  text: string;
  done: boolean;
}

const ContentTodos: React.FC<ContentProps> = (props) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState('');
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
    setTodos([
      ...todos,
      {
        text: todo,
        done: false,
      }
    ])
    setTodo('');
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  }

  const onCheckChangeHandler = (e) => {
    if (!e.target.checked) {
      return;
    }

    console.log(todos);
    const tmpTodos = todos.splice(e.target.value, 1);
    console.log(e.target.value);
    console.log(tmpTodos.length);
    console.log(tmpTodos);
    if (!tmpTodos.length) {
      console.log('in');
      console.log(todos);
      setTodos([]);
      return;
    }
    console.log('out');
    console.log(todos);
    setTodos(tmpTodos);
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
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" variant="h6" component="p" align="center">
          残 {todos ? todos.length : '0'} タスク
        </Typography>
        <List>
          {todos.map((todo, i) => {
            return (
              <ListItem key={i}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    value={i}
                    onChange={onCheckChangeHandler}
                  />
                </ListItemIcon>
                <ListItemText primary={todo.text} />
              </ListItem>
            )
          })}
        </List>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ContentTodos);