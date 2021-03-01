import {createStyles, Theme} from "@material-ui/core/styles";

export const contentStyles = (theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 936,
      margin: '10px auto',
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
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    doneIcon: {
      color: '#35a506',
      fontWeight: 'bold',
    },
    textField: {
      border: '1px solid grey',
      borderRadius: '5px',
      padding: '5px 10px',
    }
  });