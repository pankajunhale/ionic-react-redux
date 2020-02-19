import React, { Component } from 'react';
import { Redirect, Route, Router, withRouter, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';
import history from './history';

import Menu from './components/Menu';
import Home from './pages/Home';
import List from './pages/List';
import ViewEmployee from './pages/ViewEmployee';
//import AppLoginFormContainer from './pages/AppLoginFormContainer';

import { home, list } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import 'bootstrap/dist/css/bootstrap.css';

import LoginForm from './components/LoginForm';
import AppLoginFormContainer from './container/AppLoginFormContainer';
import EditEmployeeContainer from './container/EditEployeeContainer';
const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'List',
    url: '/list',
    icon: list
  },
  {
    title: 'Login',
    url: '/login',
    icon: list
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: home
  }
];
interface IApp{

}
class App extends Component<IApp>{
  
  constructor(props:any){
    super(props);

  }

  render(){
    return(
      // <Router history={history}>
      // {/* <IonApp> */}
      // {/* <IonPage id="main"> */}
      //   <IonReactRouter>
      //     <IonSplitPane contentId="main">
      //       <Menu appPages={appPages} />
      //       <IonRouterOutlet id="main">   
      //           <Route path="/home" component={Home} exact={true} />
      //           <Route path="/list" component={List} exact={true} />
      //           <Route path="/" render={() => <Redirect to="/home"/> } exact={true} />
      //           <Route path="/view/:id"  component={ViewEmployee}  />
      //       </IonRouterOutlet>
      //     </IonSplitPane>
      //   </IonReactRouter>
      // {/* </IonPage> */}
      // {/* </IonApp> */}
      // </Router>

      <Router history={history}>
        <div className="App">
          <IonApp>
            <IonPage >
              {/* <IonReactRouter> */}
                <IonSplitPane contentId="main">
                  <Menu appPages={appPages} />
                  <IonRouterOutlet id="main">
                    <Route path="/home" component={Home} exact={true} />
                    <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
                    <Route path="/list" component={List} />
                    <Route path="/login" component={AppLoginFormContainer} />
                    <Route path="/view/:id" component={ViewEmployee} />
                    <Route path="/edit/:id" component={EditEmployeeContainer} />
                  </IonRouterOutlet>
                </IonSplitPane>
              {/* </IonReactRouter> */}
            </IonPage>
          </IonApp>
        </div>
      </Router>
    )
  }
}
// const App: React.FC = () => (
  
// );

export default App;

// https://alligator.io/ionic/ionic-4-react-navigation/
