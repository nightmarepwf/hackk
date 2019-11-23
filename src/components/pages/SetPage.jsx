import React from 'react';
import "./Vote.css";
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
    Button
} from 'framework7-react';

export default () => (
  <Page>
    <Navbar>
      <NavLeft>
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
      </NavLeft>
      <NavTitle>Scrum-Poker</NavTitle>
    </Navbar>
	<div className="item-content">
		<div className="profile"><img src="https://cepia.ru/images/u/pages/photo-golubya-cover-1453.jpg" style={{width:"100%",height:"100%",borderRadius: "200px"}}></img></div>
		<div className="block">
			<p className="row">
				<button className="col button button-raised">Выбрать аватар</button></p></div>
		<div className="list">
			<ul>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">Фамилимя</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Ваша фамилия"/>
							</div>
						</div>
				</li>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">Имя</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Ваше Имя"/>
							</div>
						</div>
				</li>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">Отчество</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Ваше отчество"/>
							</div>
						</div>
				</li>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">@-mail</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Ваш @-mail"/>
							</div>
						</div>
				</li>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">Новый пароль</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Введите новый пароль"/>
							</div>
						</div>
				</li>
				<li className="item-content item-input">
					<div className="item-media">
						<i className="icon demo-list-icon"></i>
					</div>
					<div className="item-inner">
						<div className="item-title item-label">Повторите новый пароль</div>
						<div className="item-input-wrap">
							<input type="text" placeholder="Введите новый пароль ещё раз"/>
							</div>
						</div>
				</li>
			</ul>
		</div>
		<div className="block">
			<p className="row">
				<button className="col button button-raised">Сохранить изменения</button></p></div>
	</div>
	</Page>
	);