import React ,{Component} from 'react';
import {
  Block,
  List,
  Button,
  ListInput
} from 'framework7-react';

export default class CreateTeam extends Component {
  state = {
    label: '',
    textf:'',
    marks:'1'
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };
  onTextChange = (e) => {
    this.setState({
      textf: e.target.value
    })
  };
  onButtonClick=()=>{
    this.props.ws.send(JSON.stringify({"type_of":"create_comand","data":{'name': this.state.label,"text":this.state.textf,"marks":this.state.marks}}))
    
  }
  render() {
    return (
    <Block>
      <List form>
        <ListInput
          label="Название команды"
          type="text"
          placeholder="Название команды"
          onChange={this.onLabelChange}
        />
        <ListInput
          label="Описание задачи"
          type="text"
          placeholder="Описание задачи"
          onChange={this.onTextChange}
        />
        <ListInput
          label="Шаблон оценки"
          type="select"
          defaultValue="Числа фибоначчи"
        >
          <option>Числа фибоначчи</option>
        </ListInput>
      </List>
      <Button raised
      onClick={this.onButtonClick}
      >Создать</Button>
    </Block>)
  }
} ;
