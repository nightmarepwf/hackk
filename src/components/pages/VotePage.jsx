import React, { Component } from 'react';
import AppHeader from './app-header';
import TodoList from './todo-list2';
import SearchPanel from './search-panel';
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
	ListInput,
	List,
	ListItem,
	Row,
	Col,
	Button
} from 'framework7-react';
const URL = 'ws://192.168.43.182:3030'
const URL2 = 'ws://192.168.43.182:3033'
export default class VotePage extends Component {
	state = {
		name: "",
		text: "",
		items: [

		],
		filter: 'all',
		search: ''
	}


	ws = new WebSocket(URL)
	ws2 = new WebSocket(URL2)
	onToggleDone = (id) => {
		//this.ws.close();

		//this.$f7router.navigate(`/vote?id=${id}&user_id=${this.$f7route.query['id']}`);
		// this.setState((state) => {

		//   const items = this.toggleProperty(state.items, id, 'done');
		//   return { items };
		// });
	};

	onToggleImportant = (id) => {
		//this.setState((state) => {
		// const items = this.toggleProperty(state.items, id, 'important');
		//return { items };
		//});
	};
	onItemAdded = (label, id) => {
		this.setState((state) => {
			const item = this.createItem(label, id);
			return { items: [...state.items, item] };
		})
	};
	componentDidMount() {
		this.ws.onopen = () => {
			this.ws.send(JSON.stringify({ 'type_of': 'get_buy_id', 'data': { 'id': this.$f7route.query['id'] } }))
		}
		this.ws2.onopen = () => {
			this.ws2.send(JSON.stringify({ 'type_of': 'connect_m', 'data': { 'id': this.$f7route.query['id'], "user_id": this.$f7route.query['user_id'] } }))
		}
		this.ws2.onmessage = evt => {
			console.log(evt.data)
			const message = JSON.parse(evt.data)
			//if(message['newdata']!=undefined){
			//this.onItemAdded(message['newdata'])
			//}
			if (message["type_of"] == "users_list") {
				for (var item in message["data"]) {
					console.log(message["data"][item])
					this.onItemAdded(message["data"][item]["username"], message["data"][item]["id"])
				}
			}
		}
		this.ws.onmessage = evt => {
			console.log(evt.data)
			const message = JSON.parse(evt.data)
			if (message['type_of'] == 'data_post_id') {
				if (message['data'].length == 1) {
					this.setState(state => ({
						name: message['data'][0]['name'],
						text: message['data'][0]['full_text']
					}));
				}
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
	onToggleImportant = (id) => {
		this.setState((state) => {
			const items = this.toggleProperty(state.items, id, 'important');
			return { items };
		});
	};

	onDelete = (id) => {
		this.setState((state) => {
			const idx = state.items.findIndex((item) => item.id === id);
			const items = [
				...state.items.slice(0, idx),
				...state.items.slice(idx + 1)
			];
			return { items };
		});
	};

	onFilterChange = (filter) => {
		this.setState({ filter });
	};

	onSearchChange = (search) => {
		this.setState({ search });
	};

	createItem(label, id) {
		return {
			id: id,
			label,
			important: false,
			done: false
		};
	}

	filterItems(items, filter) {
		if (filter === 'all') {
			return items;
		} else if (filter === 'active') {
			return items.filter((item) => (!item.done));
		} else if (filter === 'done') {
			return items.filter((item) => item.done);
		}
	}

	searchItems(items, search) {
		if (search.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});
	}
	render() {
		const { items, filter, search } = this.state;
		const doneCount = items.filter((item) => item.done).length;
		const toDoCount = items.length - doneCount;
		const visibleItems = this.searchItems(this.filterItems(items, filter), search);

		return (
			<Page>
				<Navbar backLink="Back">
					<NavLeft>
						<Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
					</NavLeft>
					<NavTitle>SCRUM-покер</NavTitle>
					<NavRight>
						<img src="https://cepia.ru/images/u/pages/photo-golubya-cover-1453.jpg" style={{ width: "40px", height: "40px", borderRadius: "30px", marginRight: "10px", marginTop: "3px", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}></img><p style={{ marginBottom: "20px", marginRight: "10px" }}>{this.$f7route.query['name']}</p>
						<a href="#"><img src="https://c7.uihere.com/icons/200/847/605/xitong-01-cb4f52c348fdf555bb7559e240910a12.png" style={{ width: "40px", height: "40px", marginRight: "20px" }}></img></a>
					</NavRight>

				</Navbar>
				<div className="block-title block-title-large">{this.state.name}</div>
				<div className="block-title block-title-medium">Задача</div>
				<div className="block block-strong medium-inset">
					<p>{this.state.text}</p>
				</div>
				<div className="block-title block-title-medium">Статус: ожидание участников
				<span className="progressbar-infinite"></span></div>
				{/* <div className="block-title block-title-medium">Статус: результаты голосование
		<div class="progressbar color-green" data-progress="100"></div></div> 
		<span class="progressbar-infinite color-multi"></span> Статус: голосование */}
				<div className="block-title block-title-medium">Состав команды ({toDoCount})</div>
				<div className="search-panel d-flex">
					<SearchPanel
						onSearchChange={this.onSearchChange} />


				</div>
				<div className="list">


					<TodoList
						items={visibleItems}
						onToggleImportant={this.onToggleImportant}
						onToggleDone={this.onToggleDone}
						onDelete={this.onDelete} />
				</div>


				{/* { <ItemAddForm
            onItemAdded={this.onItemAdded}
            ws={this.ws} />} */}

				<Toolbar bottom>
				<List form style={{width:"40%" }}>
					<ListInput
						label="Оценка"
						type="select"
						defaultValue="0"
						
					>
						<option>0</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>5</option>
						<option>8</option>
						<option>13</option>
						<option>21</option>
						<option>34</option>
						<option>55</option>
						<option>89</option>
				
					</ListInput>
					
				</List>
				<Button  style={{width:"60%" }} >Создать комнату</Button>
        		</Toolbar>

			</Page>
		);
	}
}

