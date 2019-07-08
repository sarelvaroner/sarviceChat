import React, { Component } from 'react';
import './SendMessage.css';
import sendMessageMutation from '../../Apollo/mutations/sendMessageMutation';


class SendNewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentMessage: ''
    };


    this.handleChangeInput = (e) =>{
        this.setState({
            currentMessage: e.target.value
        })      
    }


    this.handleSendNewMessage = () => {
        if(this.state.currentMessage === '') return
         const {conversationId,  userId ,service} = this.props
        sendMessageMutation(conversationId, this.state.currentMessage, userId ,service)
        
        alert(this.state.currentMessage)
        // alert(window.location.href)

    }
    
  }
  render (){
    return (
        <div className="inputContainer  ">
            <textarea onChange={this.handleChangeInput} className="inputField chat" placeholder={'please type here'}></textarea>
            <button onClick={this.handleSendNewMessage} className="sendNewMessageBtn">SEND</button>
        </div> 
        )
    }
}

export default SendNewMessage;