import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import FadeIn from 'react-fade-in';

var lFieldData = {username: "", password: ""};
var lHasFormError = false;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00c9ff",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00c9ff",

    "&:hover": {
        backgroundColor: "#0d81a0"
      },
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const [loginHasError, setLoginHasError] = React.useState(false);
  const [passwordHasError, setPasswordHasError] = React.useState(false);
  const [onSendingCredential, setOnSendingCredential] = React.useState(false);
  const [netLoginError, setNetLoginError] = React.useState(false);

  const session = props.session;
  const payload = props.payload;


  const sendCredential = () => {
    session.checkCredential(lFieldData.username, lFieldData.password, payload).then(function(pResult){

      if(!pResult.success)
      {
        setNetLoginError(true);
        setOnSendingCredential(false);
      }else
      {
        var lCredential = pResult.session_id;
        session.saveSession(lCredential);
        
        window.EventHandler.triggerEvent('onLoggedIn');
        window.EventHandler.triggerEvent('startHeartBeat');
      }
    });
};

  const checkForm = () => {

      setPasswordHasError(false);
      setLoginHasError(false);
      setNetLoginError(false);

      lHasFormError = false;

      if(!lFieldData.username)
      {
        lHasFormError = true;
        setLoginHasError(true);
      }

      if(!lFieldData.password)
      {
        lHasFormError = true;
        setPasswordHasError(true);
      }

      if(lHasFormError)
        return;

      setOnSendingCredential(true);
      sendCredential();
  };

  

  const handleChangeUsername = (pEvent) => {
      lFieldData.username = pEvent.target.value;
  };

  const handleChangePassword = (pEvent) => {
      lFieldData.password = pEvent.target.value;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Connexion
        </Typography>

        { netLoginError &&

        <FadeIn>
          <Typography style={{color:"red", fontWeight:"bold", margin:"21px 0"}} component="h3">
              Nom d'utilisateur ou mot de passe incorrect !
          </Typography>
        </FadeIn>

        }

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="email"
            error={loginHasError}
            onChange={handleChangeUsername}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            error={passwordHasError}
            onChange={handleChangePassword}
            autoComplete="current-password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={checkForm}
            disabled={onSendingCredential}
          >
            {onSendingCredential &&
                <CircularProgress style={{color:"#fff"}} size={20} />
            }

            {!onSendingCredential &&
                <Typography>Connexion</Typography> 
            }
            
          </Button>
        </form>
      </div>
    </Container>
  );
}