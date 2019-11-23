import React, { Component } from 'react';
import AppHeader from './app-header';
import TodoList from './todo-list';
import SearchPanel from './search-panel';
import ItemStatusFilter from './item-status-filter';
import ItemAddForm from './item-add-form';
import {
  View,
  Popup,
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
import CreateTeam from './CreateTeam';

import './app.css';
const URL = 'ws://192.168.43.182:3030'

export default class ComandPage extends Component {
  maxId = 100;
  ws = new WebSocket(URL)
  
  state = {
    ids:this.$f7route.params['id'],
    naaaame:this.$f7route.params["name"],
    items: [
     
    ],
    filter: 'all',
    search: ''
  };
  onItemAdded = (label,id) => {
    this.setState((state) => {
      const item = this.createItem(label,id);
      return { items: [...state.items, item] };
    })
  };
  componentDidMount() {
    this.ws.onopen = () => {
       //
    }

    this.ws.onmessage = evt => {
      console.log(evt.data)
      const message = JSON.parse(evt.data)
      //if(message['newdata']!=undefined){
        //this.onItemAdded(message['newdata'])
      //}
      if(message["type_of"]=="data_get"){
        for (var item in message["data"] ){
          console.log(message["data"][item])
          this.onItemAdded(message["data"][item]["name"],message["data"][item]["id"])
        }
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    //this.ws.close();

    this.$f7router.navigate(`/vote?id=${id}&user_id=${this.$f7route.query['id']}`);
    // this.setState((state) => {
    
    //   const items = this.toggleProperty(state.items, id, 'done');
    //   return { items };
    // });
  };

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

  createItem(label,id) {
    return {
      id:id,
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
	            <img src="https://cepia.ru/images/u/pages/photo-golubya-cover-1453.jpg" style={{width:"40px",height:"40px",borderRadius: "30px",marginRight:"10px",marginTop:"3px",boxShadow:"0 0 10px rgba(0,0,0,0.5)"}}></img><p style={{marginBottom:"20px",marginRight:"10px"}}></p>
              <div><img src="https://c7.uihere.com/icons/200/847/605/xitong-01-cb4f52c348fdf555bb7559e240910a12.png" style={{width:"40px",height:"40px",marginRight:"20px"}}></img></div>
          </NavRight>

        </Navbar>

        <div className="todo-app">
          <AppHeader toDo={toDoCount} done={doneCount} />

          <div className="search-panel d-flex">
            <SearchPanel
              onSearchChange={this.onSearchChange} />

           
          </div>

          <TodoList
            items={visibleItems}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
            onDelete={this.onDelete} />

         {/* { <ItemAddForm
            onItemAdded={this.onItemAdded}
            ws={this.ws} />} */}
        </div>
        <Popup id="popup">
          <View>
            <Page>
              <Navbar title="Создание команды">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <CreateTeam 
              ws={this.ws}
              onItemAdded={this.onItemAdded}
              />
            </Page>
          </View>
        </Popup>
        <Toolbar bottom>
        <Button raised style={{width:"100%" }} popupOpen="#popup">Создать комнату</Button>
        </Toolbar>
        
      </Page>
    );
  };
};
// constructor(props) {
//   super(props);
//   this.state = {
//     sorting: false,
//     items: [1, 2, 3, 4, 5]
//   };
// }
// onOpen() {
//   this.setState({
//     sorting: !this.state.sorting,
//     ...this.state
//   });
// }

// onClose() {
//   this.setState({
//     sorting: !this.state.sorting,
//     ...this.state
//   });
// }

// onSort(event, indexes) {
//   console.log('sort', indexes);
// }
// render() {
//   return (
//     <Page>


//       <Block strong>
//         <p align="center">Список команд:</p>
//       </Block>



//       <Block>
//         <List
//           id="sortable"
//           sortable
//           onSortableSort={this.onSort}
//           onSortableOpen={this.onOpen}
//           onSortableClose={this.onClose}
//         >
//           {this.state.items.map((item) => (
//             <ListItem title={'Item ' + item}></ListItem>
//           ))}
//         </List>
//       </Block>

//     </Page >
//   )
// }