import React from 'react';
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import AvatarItem from "./AvatarItem";

const styles = (theme: Theme) =>
  createStyles({

  })

interface IAvatarList extends WithStyles<typeof styles> {
  onlineMembers: object,
}

const AvatarList: React.FC<IAvatarList> = (props) => {
  const { classes, onlineMembers } = props;
  return (
    <>
      {onlineMembers ? Object.keys(onlineMembers).map((key, i) => (
          <AvatarGroup max={10}>
            <AvatarItem username={onlineMembers[key].username} key={key}/>
          </AvatarGroup>
        )) : (
        <></>
      )}
    </>
  )
}

export default withStyles(styles)(AvatarList);