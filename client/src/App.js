import React from 'react';
import './App.css';
import Message from './components/Message/Message'
import SendNewMessage from './components/SendMwssage/SendMessage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [],
    myName: null,
    _id: null,
    chatingWith: 'Yosi',
    conectionModalClass: 'conectionModal',
    chatClass: 'close',
    endChatModalClass: 'close'
    }
      
    this.handleInputName = (e) => {
      this.setState({
        myName: e.target.value
    }) 

    }
    this.conectHandler = () => {
      if(this.state.myName === null) alert('please insert your name an click on the conect button')
      else{
        this.setState({
          conectionModalClass: 'close',
          chatClass:'chatWidget'
        }) 
      }
    }

    this.updateMyId = (id) => {
      this.setState({
        _id: id
      }) 

    } 

    this.endChatHandler = () =>{
      this.setState({
        chatClass: 'close',
        endChatModalClass:'endChat'
      })     
    }
  }

 
  render (){
    return (
      <React.Fragment>
        <div className={this.state.endChatModalClass}>Thank you for using our service chat have a nice day</div>
        <div className={this.state.conectionModalClass}>please enter your name and click on the conect button<input onChange={this.handleInputName}></input><button className='conectBtn' onClick={this.conectHandler}>conect</button></div>
        <div className={this.state.chatClass}>
          <div className="chatHeader">chat with {this.state.chatingWith}<button className='endChatBtn' onClick={this.endChatHandler}>end conversation</button></div>
          <div className="messagesContainer">
              {this.state.messages.map((message) =>
                <Message author={message.author} content ={message.content} date={message.date} myMessageClass={message.author === this.state.myName}></Message>
              )}
          </div>
          <SendNewMessage></SendNewMessage>
        </div>
      </React.Fragment>
    )
    }
}

export default App;