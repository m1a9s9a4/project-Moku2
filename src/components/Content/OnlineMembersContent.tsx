import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import {useAuth} from "../../contexts/AuthContext";
import { contentStyles as styles } from "../../assets/styles";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

export interface ContentProps extends WithStyles<typeof styles> {}

const OnlineMembersContent: React.FC<ContentProps> = (props) => {
  const { classes } = props;
  const { onlineMembers } = useAuth();

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center" >
            現在のオンラインユーザー
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" variant="h4" component="p" align="center">
          {onlineMembers ? Object.keys(onlineMembers).length : '0'} 人
        </Typography>
        <Grid container spacing={2} justify="center">
          {onlineMembers ? Object.keys(onlineMembers).map((key, i) => (
            <Grid container md={2} xs={3} justify="center" item key={key}>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
                >
                <Avatar alt={onlineMembers[key].username} className={classes.icon} >
                  {onlineMembers[key].username.slice(0, 2)}
                </Avatar>
              </StyledBadge>
            </Grid>
          )) : (
            <Grid container justify="center">オンラインメンバーはいません</Grid>
          )}
        </Grid>

      </div>
    </Paper>
  );
}

export default withStyles(styles)(OnlineMembersContent);