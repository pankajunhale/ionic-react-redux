import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import history from '../history';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}
const isUserLoggedIn = ():boolean =>{
  return (localStorage.getItem('login-info') !== null ? true : false);
}
const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => (
  
  <IonMenu contentId="main" type="overlay">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {appPages.map((appPage, index) => {
          if(appPage.title === 'Logout' && isUserLoggedIn()){
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem onClick={(e)=>history.push(appPage.url)} >
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          }
          if(appPage.title !== 'Logout'){
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem onClick={(e)=>history.push(appPage.url)} >
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          }
          
        })}
      </IonList>
    </IonContent>
  </IonMenu>
);


export default withRouter(Menu);
