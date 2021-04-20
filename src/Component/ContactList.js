import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 5000,
    maxWidth: 360,
    marginLeft:330,
    paddingTop:30,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContactList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  
  let lArray = props.contactList.data;

    useEffect( ()=>{
  
   });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {lArray.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem key={value} style={{width:1000}}>
            <ListItemAvatar>
              <Avatar
                src={'https://api.checkwa.com/img/n/33627584926.jpg'}
              />
            </ListItemAvatar>

            <ListItemText style={{textAlign:'left'}} id={labelId} primary={`${value.nom}`} />
            <ListItemText style={{textAlign:'left'}} id={labelId} primary={`${value.prenom}`} />
            <ListItemText style={{textAlign:'left'}} id={labelId} primary={`${value.num}`} />

              <IconButton color="primary" aria-label="Facebook" component="span">
                <FacebookIcon />
              </IconButton>

              <IconButton aria-label="Whats App" component="span">
                <WhatsAppIcon style={{fill: "green"}} />
              </IconButton>

          </ListItem>
        );
      })}
    </List>
  );
}
