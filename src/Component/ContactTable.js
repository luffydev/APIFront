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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import WhatshappDialog from './Dialogs'
import Contact from './../API/Contact'
import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
  const [favoriteIconIsChecked, setFavoriteIconIsChecked] = React.useState({});
  const [displayModal, setDisplayModal] = React.useState(false);
  const [modalNameSubname, setModalNameSubname] = React.useState("");
  const [modalData, setModalData] = React.useState({});
  const [modalError, setModalError] = React.useState(false);
  const [displaySuccess, setDisplaySuccess] = React.useState(false);
  const [SnackbarMessage, setSnabarMessage] = React.useState("");

  lArray.map((pRow) => {
    favoriteIconIsChecked[pRow.id] = pRow.is_favorite;
    return true;
  });

  const toggleFavorite = (pRow) => {
    
    var lFrom = props.from;
    var lContact = new Contact();

    var lValue = false;

    if(!pRow.is_favorite)
    {
        lValue = true;
        pRow.is_favorite = true;
        setSnabarMessage("Contact ajouté aux favoris !");

    }else
    {
        lValue = false;
        pRow.is_favorite = false;
        setSnabarMessage("Contact retiré des favoris !");
    }

    if(favoriteIconIsChecked[pRow.id])
    {
      setFavoriteIconIsChecked(prevDisplayed => ({
        ...prevDisplayed,
        [pRow.id]: false
      }));
    }else
    {
      setFavoriteIconIsChecked(prevDisplayed => ({
        ...prevDisplayed,
        [pRow.id]: true
      }));
    }    

    setDisplaySuccess(true);

    setTimeout(() => { setDisplaySuccess(false); }, 3000)
    lContact.toggleToFavorite(pRow.id, lFrom, lValue);
  }

  const checkWhatsApp = pRow => {

    if(global.onLoading)
      return;

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

    lContact.getWhatsAppStatus(pRow.num).then(pData => {

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
    <TableContainer component={Paper} style={{width:900, margin:"0 auto"}}>
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
          {lArray.map((row, index) => (
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

                { (!(row.id in whatsappIconDisplay) || whatsappIconDisplay[row.id] === true) &&

                  <IconButton aria-label="Whats App" component="span">
                    <WhatsAppIcon style={{fill: "green"}} onClick={() => checkWhatsApp(row) } />
                  </IconButton>

                }

                

                <FormControlLabel
                  control={<Checkbox key={index} icon={<StarBorder style={{fill: "#f1f100"}} />} checkedIcon={<StarIcon style={{fill: "#f1f100"}} />}
                            checked={ favoriteIconIsChecked[row.id] } onClick={() => toggleFavorite(row, index)}  />}
                />

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

          <Snackbar open={displaySuccess} autoHideDuration={6000}>
            <Alert severity="success">
                { SnackbarMessage }
            </Alert>
          </Snackbar>

          <WhatshappDialog displayModal={displayModal} modalNameSubname={modalNameSubname} modalData={modalData} modalError={modalError}></WhatshappDialog>
        </TableBody>
      </Table>
    </TableContainer>
  );
}