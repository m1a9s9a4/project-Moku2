import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { exitColor } from '../../utils/themeColor';

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
      width: '100%',
      fontSize: '20px',
      fontWeight: 800,
      borderColor: exitColor,
      color: '#FFFFFF',
      backgroundColor: exitColor
    }
  });

export interface ExitBtnContentProps extends WithStyles<typeof styles> {
  onExitHandler: () => void;
}

const ExitBtnContent: React.FC<ExitBtnContentProps> = (props) => {
  const { classes, onExitHandler } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.contentWrapper}>
        <Grid container spacing={2} justify="center">
          <Grid container item md={6} justify="center" >
            <Button className={classes.btn} variant="contained" onClick={onExitHandler} >
              作業を終了する
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ExitBtnContent);