import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import WhatshappDialog from './Dialogs'
import Contact from './../API/Contact'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const openFacebookLink = ((pFB_id) => {
    window.open('https://facebook.com/' + pFB_id, '_blank');
});

global.onLoading = false;

export default function ContactTable(props) {

  global.modalDisplayed = false;

  const classes = useStyles();
  let lArray = props.contactList.data;
  const [loaders, setDisplayLoader] = React.useState({});
  const [whatsappIconDisplay, setWhatsappIconDisplay] = React.useState({});
  const [displayModal, setDisplayModal] = React.useState(false);
  const [modalNameSubname, setModalNameSubname] = React.useState("");
  const [modalData, setModalData] = React.useState({});
  const [modalError, setModalError] = React.useState(false);

  const checkWhatsApp = pRow => {

    if(global.onLoading)
      return;

    var from = props.from;

    var lContact = new Contact();
    global.onLoading = true;
    
    
    setWhatsappIconDisplay(prevDisplayed => ({
      ...prevDisplayed,
      [pRow.id]: false
    }));
    
    setDisplayLoader(prevDisplayed => ({
      ...prevDisplayed,
      [pRow.id]: true
    }));

    console.log(from);

    lContact.getWhatsAppStatus(pRow.num, from).then(pData => {

      if(!('success' in pData) || !pData.success )
      {
        setModalError(true);
        setDisplayModal(true);
      }else
      {
        setDisplayModal(true);
        setModalData(pData.data);
        setModalError(false);
      }

        setModalNameSubname(pRow.nom+ " " + pRow.prenom);
    
        global.onLoading = false;

        setWhatsappIconDisplay(prevDisplayed => ({
          ...prevDisplayed,
          [pRow.id]: true
        }));
        
        setDisplayLoader(prevDisplayed => ({
          ...prevDisplayed,
          [pRow.id]: false
        }));        
        
        setDisplayModal(false);
      });  
  };

  
  return (
    <TableContainer component={Paper} style={{width:1300, marginLeft:150}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Pr&eacute;nom</TableCell>
            <TableCell align="center">Num&eacute;ro</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lArray.map((row) => (
            <TableRow key={row.id}>
             
              <TableCell align="center">
                <Avatar alt="Remy Sharp" src="https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg" />
              </TableCell>

              <TableCell align="center">{row.nom}</TableCell>
              <TableCell align="center">{row.prenom}</TableCell>
              <TableCell align="center">{row.num}</TableCell>

              <TableCell align="right">
                <IconButton color="primary" aria-label="Facebook" component="span" onClick={() => openFacebookLink(row.fb_id)}>
                  <FacebookIcon />
                </IconButton>

                {console.log((!(row.id in whatsappIconDisplay) || whatsappIconDisplay[row.id] == true))}

                { (!(row.id in whatsappIconDisplay) || whatsappIconDisplay[row.id] == true) &&

                  <IconButton aria-label="Whats App" component="span">
                    <WhatsAppIcon style={{fill: "green"}} onClick={() => checkWhatsApp(row) } />
                  </IconButton>

                }

               

                { loaders[row.id] &&
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classes.top}
                    classes={{
                      circle: classes.circle,
                    }}
                    size={15}
                    thickness={4}
                    style={{marginLeft:16, marginRight:16}}
                  />
                }

                
				

              </TableCell>

            </TableRow>
          ))}

          <WhatshappDialog displayModal={displayModal} modalNameSubname={modalNameSubname} modalData={modalData} modalError={modalError}></WhatshappDialog>
        </TableBody>
      </Table>
    </TableContainer>
  );
}