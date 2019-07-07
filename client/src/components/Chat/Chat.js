import React, { Component, Fragment }  from 'react';
import './Chat.css';
import Dashboard from '../Dashboard/Dashboard'
import DisplayMessages from '../DisplayMessages/DisplayMessages'
import SendNewMessage from '../SendMwssage/SendMessage'
import sendMessage    from '../../Apollo/mutations/sendMessageMutation'
import sendMessageMutation from '../../Apollo/mutations/sendMessageMutation';
import archiveConversation from '../../Apollo/mutations/archiveConversation';
import removeCustomerFromQueue from '../../Apollo/mutations/removeCustomerFromQueue';


removeCustomerFromQueue("5d21cf119ae9366ab5ea905d")
                        




const SERVICE = false
const USER_NAME_KEY = SERVICE ? 'serviceChatAppCustomerName' : 'serviceChatAppServicePersonName'
const USER_ID_KEY   = SERVICE ? 'serviceChatAppCustomerID'   : 'serviceChatAppServicePersonID'




class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:   localStorage.getItem(USER_ID_KEY)   ? localStorage.getItem(USER_ID_KEY)   : 'a',
      userName: localStorage.getItem(USER_NAME_KEY) ? localStorage.getItem(USER_NAME_KEY) : '',
      service: SERVICE,     
      isOpenConversation: true, 
      endChatModalClass: 'close',
    }     
  }



  openChatHandler = (name, userId , service) => {

    if( !name   &&  !userId ) return alert('please insert name userId and click open')
    if( service &&  !userId ) return alert('please insert userId and click open')

    this.setState({ isOpenConversation: !this.state.isOpenConversation })

    const customerId      = service ? '' : userId
    const servicePersonId = service ? userId : ''
    const content    = 'new connection to chat'
    const authorId = 'system message'
    
    // alert(`openChatHandler  id: ${id} name:${name} service: ${service}  `   )
    
    
    if (userId){
      // alert('open current conversation')
      return

    } 
    
    if (!userId){
      alert('open new conversation')
    }    
  }

  render (){
    const { userId, isOpenConversation } = this.state
    return (
      <Fragment> 
        <Dashboard openChatClicked={this.openChatHandler.bind(this)}></Dashboard>
        {
          isOpenConversation ? 
              <div className={`chatWidget `}>
                <div className="chatHeader">chat with {this.state.userName}</div>
                <div className='messagesContainer'>
                { userId ? <DisplayMessages></DisplayMessages>: null }
                </div>
                <SendNewMessage></SendNewMessage>
              </div>
          : null
        }     
      </Fragment>
    )
  }
}

export default Chat;

