import React, { Component } from 'react';
import {
  App,
  Panel,
  View,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';
import routes from '../routes';
const URL = 'ws://192.168.43.182:3030'
const f7params = {
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes,
};
export default class ComandPage extends Component {
  ws = new WebSocket(URL)
  render(){
    return (
      <App params={f7params}>
        <Panel left cover themeDark>
          <View url="/panel-left/" />
        </Panel>
        <View id="main-view" 
              url="/login" main 
              className="safe-areas"
              />
      </App>
    );
  }

};
