import React from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Меню" />

    <BlockTitle>Комнаты</BlockTitle>
    <List>
      <ListItem link="/com/" title="Список команд" view="#main-view" panelClose></ListItem>
      <ListItem link="/home" title="Результаты голосования" view="#main-view" panelClose></ListItem>
    </List>
    <BlockTitle>Шаблоны</BlockTitle>
    <List>
      <ListItem link="/com/" title="Шаблоны оценок" view="#main-view" panelClose></ListItem>
    </List>
 {/* {   <BlockTitle>Load page in main view</BlockTitle>
    <List>
      <ListItem link="/about/" title="About" view="#main-view" panelClose></ListItem>
      <ListItem link="/form/" title="Form" view="#main-view" panelClose></ListItem>
    </List>} */}
  </Page>
);
