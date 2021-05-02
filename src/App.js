import React, { Component } from 'react';
import './App.css';

import Event from './API/Event';
import ScheduledTask from './API/ScheduledTask'

window.EventHandler = new Event();
window.Scheduler = new ScheduledTask();

import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import FadeIn from 'react-fade-in';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Session from './API/Session';

import './statics/styles.css'


class App extends Component {

  constructor() {
    super();

    this.session = new Session();
    this.loadingInterval = null;
    this.payload = null;

    this.state = {
      loadingClass:"show",
      showLogin:false,
      showLoader:true,
      showDashboard:false
    };

    var lPtr = this;

    this.onLoggedIn = () => {
      this.setState({showLogin: false});
      this.setState({showDashboard: true});
    };

    this.startHeartBeat = () => {
      window.Scheduler.addTask('heartbeat', lPtr.heartbeat, 300000);
    }

    this.stopHeartBeat = () => {
      window.Scheduler.stopTask('heartbeat');
    }

    this.heartbeat = () => {
      this.session.heartBeatSession().then((pResult) => {
        
        if(!pResult)
        {
          this.setState({showDashboard: false});
          this.setState({showLogin : true});

          this.stopHeartBeat();
          this.session.removeSession();
        }

      });
    }

    this.session.checkSession().then( (pData) => {

        lPtr.setState({showLoader: false});

        if(!pData.success)
        {
          lPtr.setState({showLogin: true});
          lPtr.payload = pData.payload;

          return;
        }

        window.EventHandler.triggerEvent('startHeartBeat');
        lPtr.setState({showDashboard:true});
        
    });
    
    this.loadingInterval = setInterval(() => {

      if(!this.state.loadingClass)
        this.setState({loadingClass:"show"});
      else
        this.setState({loadingClass:""});

    }, 1000);
    
  }

  componentWillMount() {
    window.EventHandler.listenEvent('onLoggedIn', this.onLoggedIn);
    window.EventHandler.listenEvent('startHeartBeat', this.startHeartBeat);
  }

  render() {
    return (
      <div className="App">

      { this.state.showLoader && 
        <FadeIn>
          <Grid container style={{margin:"300px 0"}}>
            <Grid item xs={12} style={{marginBottom:20}} className="loader">
              <span className={this.state.loadingClass}>Chargement ...</span>
            </Grid>
            <Grid item xs={12}>
              <CircularProgress style={{color:"#00c9ff"}} />
            </Grid>
          </Grid>
        </FadeIn>
      }

      

       { this.state.showLogin &&
          <FadeIn>
            <Login payload={this.payload} session={this.session}></Login>
          </FadeIn>
       }


       { this.state.showDashboard &&
        <FadeIn>
          <Dashboard></Dashboard> 
        </FadeIn>
       }
      </div>
    );
  }
}

export default App;
