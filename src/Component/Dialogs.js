import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogContentText from '@material-ui/core/DialogContentText';
import { red } from '@material-ui/core/colors';

import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));



export default function WhatshappDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    var lName = props.modalNameSubname;
    var lData = props.modalData;
    var lError = props.modalError;

    if(props.displayModal && global.modalDisplayed == false)
    {
        global.modalDisplayed = true;
        setOpen(true);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Whatsapp de {lName}
          </DialogTitle>
          {!lError && 
            <DialogContent dividers>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                src={lData.avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={lData.status} secondary={"Last seen : " + lData.lastSeen } />
                    </ListItem>
                </List>
            </DialogContent>
          }

          {lError &&
            <DialogContentText id="alert-dialog-description" style={{color:red[500], fontWeight:"bold", width:400, textAlign:"center"}}>
                Aucun WhatsApp pour ce compte.
            </DialogContentText>
          }
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="red">
                Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}