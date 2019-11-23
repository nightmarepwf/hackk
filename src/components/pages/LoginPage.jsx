import React, { Component } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  LoginScreen,
  LoginScreenTitle,
  ListInput,
  ListButton,
  BlockFooter,
  View
} from 'framework7-react';
const URL = 'ws://192.168.43.182:3030'
const URL2 = 'ws://192.168.43.182:3033'


class LoginPage extends Component {
  ws = new WebSocket(URL)
  
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      email: '',
      password: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }
  componentDidMount() {
    this.ws.onopen = () => {
      //console.log('connected')
    }
    this.ws.onmessage = evt => {
      //console.log(evt.data)
      const message = JSON.parse(evt.data)
      if(message['login_ok']!=undefined){
        console.log(message['login_ok'])
        var name_s=message['login_ok']['name']
        var id_s=message['login_ok']['id']
        //this.ws.close();
        console.log(name_s,id_s)
        this.$f7router.navigate(`/com?name=${name_s}&id=${id_s}`)
      }
    }
    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      //this.setState({
       // ws: new WebSocket(URL),
      //})
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))
  submitMessage = messageString => {
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }


  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    this.ws.send(JSON.stringify({ 'login': { "email": this.state.email,"password":this.state.password } }))
  }
  render() {
   
    return (
      < Page loginScreen >
        <LoginScreenTitle>Вход</LoginScreenTitle>
        <List form>
          <ListInput
            label="Логин"
            name="username"
            placeholder="Username"
            type="text"
            onChange={this.handleEmailChange}
          />
          <ListInput
            label="Пароль"
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handlePasswordChange}
          />
        </List>
        <BlockFooter>
            <p>Для входа введите пароль и логин</p>
        </BlockFooter>
        <List>
          <ListButton title="Вход" onClick={this.handleClick}></ListButton>
          <ListButton title="Вход без пароля"
            link="/com">
          </ListButton>
          
        </List>
      </Page >
    )
  }
}

export default LoginPage