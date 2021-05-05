import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './listItems';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ContactTable from './ContactTable';

import Contact from './../API/Contact'
import Event from './../API/Event'

import {
  IconFlagFR,
  IconFlagES,
  IconFlagUK
} from 'material-ui-flags';

const drawerWidth = 240;
var lFieldsData = {name : null, subName : null, type : 0, number : null , from : null};
var lEventHandler = new Event();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  defaultText: {

  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {

  const lContact = new Contact();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [loader, showLoader] = React.useState(false);
  const [contactListContainer, showContactListContainer] = React.useState(false);
  const [contactList, setContactList] = React.useState({});
  const [searchbarWidth, setSearchbarWidth] = React.useState(400);
  const [searchbarText, setSearchbarText] = React.useState("Rechercher");
  const [displaySubnameField, setDisplaySubnameField] = React.useState(false);
  const [selectorWidth, setSelectorWidth] = React.useState(150);
  const [emptyResult, setEmptyResult] = React.useState(false);
  
  const [nameHasError, setNameHasError] = React.useState(false);
  const [subnameHasError, setSubnameHasError] = React.useState(false);
  const [typeHasError, setTypeHasError] = React.useState(false);
  const [fromHasError, setFromHasError] = React.useState(false);

  const checkForm = () => {

      var hasError = false;

      setNameHasError(false);
      setTypeHasError(false);
      setFromHasError(false);
      setSubnameHasError(false);

      if(!lFieldsData.name)
      {
        hasError = true;
        setNameHasError(true);
      }

      if(!lFieldsData.type)
      {
        hasError = true;
        setTypeHasError(true);
      }

      if(!lFieldsData.from)
      {
        hasError = true;
        setFromHasError(true);
      }

      if(lFieldsData.type === 1)
      {
        if(!lFieldsData.name)
        {
          hasError = true;
          setNameHasError(true);
        }

        if(!lFieldsData.subName)
        {
          hasError = true;
          setSubnameHasError(true);
        }
      }

      if(lFieldsData.type === 4)
      {
        if(isNaN(parseInt(lFieldsData.name, 10)))
        {
          hasError = true;
          setNameHasError(true);
        }
      }

      return hasError;
  };

  lEventHandler.listenEvent('showData', function(pData)
  {
      if(!pData || pData.success === false)
      {
        setEmptyResult(true);
        showLoader(false);
      }
      else
      {
        showLoader(false);
        setContactList(pData);
        showContactListContainer(true);
      }
  });


  const getByName = (pName, pFrom) =>
  {
    lContact.getContactByName(pName, pFrom).then( pData => 
    {
      lEventHandler.triggerEvent('showData', pData);
    });
  }

  const getByNameAndSubname = (pName, pSubname, pFrom) => 
  {
    lContact.getContactByNameAndSubname(pName, pSubname, pFrom).then( pData => {
      lEventHandler.triggerEvent('showData', pData);
    });
  }

  const getByNumber = (pNumber, pFrom) => {
    lContact.getContactByNumber(pNumber, pFrom).then( pData => {
      lEventHandler.triggerEvent('showData', pData);
    });
  }

  const getByID = (pID, pFrom) => {
   
    lContact.getContactByID(pID, pFrom).then( pData => {
      lEventHandler.triggerEvent('showData', pData);
    });

  }

  const onButtonClick = () => {

      if(checkForm())
        return false;

      setEmptyResult(false);
      showLoader(true);
      showContactListContainer(false);

      switch(lFieldsData.type)
      {

        // Search by name and subname
        case 1:
          getByNameAndSubname(lFieldsData.name, lFieldsData.subName, lFieldsData.from);
        break;

        //Search by number
        case 3:
          getByNumber(lFieldsData.name, lFieldsData.from);
        break;

        //Search by id
        case 4:
          getByID(lFieldsData.name, lFieldsData.from);
        break;

        // Search by name
        case 2:
        default:
          getByName(lFieldsData.name, lFieldsData.from);
        break;
      }
      
  };

  const onLoadFavorite = (pFrom) => {

    showLoader(true);
    showContactListContainer(false);

    lFieldsData.from = pFrom;

    lContact.loadFavorite(pFrom).then( pData => {
      lEventHandler.triggerEvent('showData', pData);
    });
    
  }
  

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleNameChange = (event) => {
    lFieldsData.name = event.target.value;
  }

  const handleSubnameChange = (event) => {
    lFieldsData.subName = event.target.value;
  }

  const handleTypeChange = (event) => {

    lFieldsData.type = event.target.value;

    if(lFieldsData.type === 1)
    {
      setSearchbarWidth(200);
      setSelectorWidth(200);
      setSearchbarText("Nom");
      setDisplaySubnameField(true);

      if(nameHasError)
        setSubnameHasError(true);
    }
    else
    {
      setSearchbarWidth(400);
      setSelectorWidth(150);
      setSearchbarText("Rechercher");
      setDisplaySubnameField(false);
      setSubnameHasError(false);
    }
  };

  const handleFromChange = (event) => {
    lFieldsData.from = event.target.value;

    switch(lFieldsData.from)
    {
      case 2:
        lFieldsData.from = 'spain';
      break;

      case 3:
        lFieldsData.from = 'uk';
      break;

      case 1:
      default:
        lFieldsData.from = 'france';
      break;
    }

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            API Test
          </Typography>
         
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <List>
            <MainListItems></MainListItems>
          </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <form className={classes.root} noValidate autoComplete="off" >
                <TextField id="outlined-basic" label={searchbarText} style={{width:searchbarWidth, marginRight:30, marginLeft:150}} variant="outlined"
                 onChange={handleNameChange} className={classes.warningStyles} error={nameHasError}
                 />

                { displaySubnameField &&
                  <TextField id="outlined-basic" label="Prénom" style={{width:200, marginRight:30}} variant="outlined"
                   onChange={handleSubnameChange} error={subnameHasError}
                   />
                }
                

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleTypeChange}
                    label="Type"
                    style={{width:selectorWidth, marginRight:30}}
                    error={typeHasError}
                  >
                    <MenuItem value={1}>Nom & Prénom</MenuItem>
                    <MenuItem value={2}>Nom</MenuItem>
                    <MenuItem value={3}>Téléphone</MenuItem>
                    <MenuItem value={4}>FB ID</MenuItem>
                  </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Pays</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Pays"
                    style={{width:150, marginRight:30}}
                    onChange={handleFromChange}
                    error={fromHasError}
                  >
                    <MenuItem value={1}>France</MenuItem>
                    <MenuItem value={2}>Espagne</MenuItem>
                    <MenuItem value={3}>Angleterre</MenuItem>
                  </Select>
              </FormControl>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={onButtonClick}
              >
                Rechercher
              </Button>
        </form>   
        </Container>

        <Container maxWidth="lg" style={{ marginBottom:50 }}>
          <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<IconFlagFR />}
                  onClick={ e => onLoadFavorite("france") }
                >
                  Favoris FR
          </Button>

          <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<IconFlagES />}
                  onClick={ e => onLoadFavorite("spain") }
                  style={{marginLeft:10, marginRight:10}}
                >
                  Favoris ES
          </Button>

          <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<IconFlagUK />}
                  onClick={ e => onLoadFavorite("uk") }
                >
                  Favoris UK
          </Button>

        </Container>

        
        { !loader && !contactListContainer && emptyResult &&
          <div style={{fontWeight: 'bold', paddingTop:50}}> Aucun r&eacute;sultat ! </div>
        }


        { !loader && !contactListContainer && !emptyResult &&
          <div style={{fontWeight: 'bold', paddingTop:50}} >Entrez une recherche pour trouver des contacts</div>
        }

        
        { loader &&
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={40}
            thickness={4}
          />
        }

        { contactListContainer &&

          <ContactTable contactList={contactList} from={lFieldsData.from}></ContactTable>
        }
        
      </main>
    </div>
  );
}
