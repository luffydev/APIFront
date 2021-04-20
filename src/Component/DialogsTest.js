import React from 'react';
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



class Dialogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    }



    handleClickOpen() {
        setOpen(true);
      };
    
    handleClose = {
        props.displayModal = false;
        setOpen(false);
     };

    componentDidMount() {
        this.setState({
          players: this.props.initialPlayers
        });
    };

    render = () => {
        return(
            <div>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Whatsapp de {lName}
                </DialogTitle>
                <DialogContent dividers>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                src={'https://api.checkwa.com/img/n/33627584926.jpg'}
                            />
                        </ListItemAvatar>
                        <ListItemText primary="Salut ! J'utilise WhatsApp." secondary="Last seen : " />
                    </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                    Save changes
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
      }
    
}