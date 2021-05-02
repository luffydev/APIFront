import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Session from './../API/Session';


export default function MainListItems() {

  const logoutButton = () => {
    const session = new Session();

    session.removeSession();
    window.location.reload();
  }

  return (  
  <div>
    <ListItem button>
      <ListItemIcon onClick={logoutButton}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Deconnexion" />
    </ListItem>
  </div>
  );
}

