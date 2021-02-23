import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import randomColor from "randomcolor";

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  })

interface IAvatarItem extends WithStyles<typeof styles> {
  username: string,
}

const AvatarItem: React.FC<IAvatarItem> = (props) => {
  const { classes, username } = props;
  const color = randomColor({
    luminosity: 'dark',
    format: 'rgba',
    hue: 'random',
    alpha: 0.8,
  });

  return (
    <Avatar alt={username} className={classes.icon} style={{backgroundColor: color}} key={username}>
      {username.slice(0, 1)}
    </Avatar>
  )
}

export default withStyles(styles)(AvatarItem);