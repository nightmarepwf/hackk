import React from 'react';
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

export default () => (
          
          <Page loginScreen>
            <Navbar  backLink="Back"></Navbar>   
            <LoginScreenTitle>Регистрация</LoginScreenTitle>
            <List form>
              <ListInput
                label="Фамилия"
                name="username"
                placeholder=""
                type="text"
              />
              <ListInput
                label="Имя"
                name="password"
                placeholder=""
                type="text"
              />
              <ListInput
                label="Отчество"
                name="password"
                placeholder=""
                type="text"
              />
              <ListInput
                label="Почта"
                name="password"
                placeholder=""
                type="text"
              />
               <ListInput
                label="Логин"
                name="password"
                placeholder=""
                type="text"
              />
              <ListInput
                label="Пароль"
                type="password"
                placeholder=""
                />
            </List>
            <List>
              <ListButton title="Регистрация" link="/home"></ListButton>
              <BlockFooter>
              
              </BlockFooter>
            </List>
          </Page>
    
);
