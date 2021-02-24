import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {themeColor} from '../../utils/themeColor';
import logo from '../../assets/images/logo.png';
import { appConfig } from '../../config';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        {appConfig.title}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: themeColor,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3),
      backgroundColor: themeColor,
      color: '#ffffff',
      width: '100%',
      fontSize: '20px',
    },
  });

interface EntryInputProps extends WithStyles<typeof styles> {
  onEntryHandler: () => void;
}

const EntryInput: React.FC<EntryInputProps> = (props) => {
  const {classes, onEntryHandler} = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={logo} className={classes.avatar} variant="rounded" />
        <Typography component="h1" variant="h5">
          {appConfig.title}入場
        </Typography>
        <Typography>
          もくもくを開始しましょう！
        </Typography>
        <Button
          type="submit"
          size="large"
          variant="contained"
          className={classes.submit}
          onClick={onEntryHandler}
        >
          Googleで入場する
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withStyles(styles)(EntryInput);