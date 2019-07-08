import React, { Component, Fragment }  from 'react';
import './Chat.css';
import Dashboard from '../Dashboard/Dashboard'
import DisplayMessages from '../DisplayMessages/DisplayMessages'
import SendNewMessage from '../SendMwssage/SendMessage'

import findConversation from '../../Apollo/Querys/findConversation';
import addCustumerToQueue from '../../Apollo/mutations/addCustumerQueue';
import findAvailableServicePerson from '../../Apollo/Querys/findAvailableServicePerson';
import ServicePersonMakeBuisy from '../../Apollo/mutations/ServicePersonMakeBuisy';
import ServicePersonMakeAvailable from '../../Apollo/mutations/ServicePersonMakeAvailable';

import addNewConversation from '../../Apollo/mutations/addNewConversation';
import archiveConversation from '../../Apollo/mutations/archiveConversation';
import removeCustomerFromQueue from '../../Apollo/mutations/removeCustomerFromQueue';


const SERVICE_KEY = 'service'
const USER_NAME_KEY ='userName' 
const USER_ID_KEY   = 'userID'
const CONVERSATION_ID_KEY   = 'conversation' 


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null,
      service:null,
      conversationId: null,     
      isOpenConversation: false, 
      endChatModalClass: 'close',
      servicePersonId: null
    }     
  }


  componentDidMount(){
    try{
      this.setState({
        userId: localStorage.getItem(USER_ID_KEY)     ? localStorage.getItem(USER_ID_KEY)   : null,
        userName: localStorage.getItem(USER_NAME_KEY) ? localStorage.getItem(USER_NAME_KEY) : null,
        service: localStorage.getItem(SERVICE_KEY)    ? localStorage.getItem(SERVICE_KEY)   : false,
        conversationId: localStorage.getItem(CONVERSATION_ID_KEY)    ? localStorage.getItem(CONVERSATION_ID_KEY)   : null,
        isOpenConversation: this.state.conversationId ? true : false
      })
    }
    catch{
      this.setState({
        service: false,
      })
    }
  }

  


  openChatHandler = async (name, userId , service) => {
    
    if( !name   &&  !userId ) return alert('please insert name userId and click open')
    if( service &&  !userId ) return alert('please insert user Id and click open')    
        
    if (userId){
      const conversationId = await findConversation(userId, service)
      if(conversationId) this.setState({ isOpenConversation: !this.state.isOpenConversation, conversationId })
    } 

    if (!this.state.userId ){
      const userId = await addCustumerToQueue(name)
      this.setState({ userId, name, service })
      
      const newServicePersonId = await findAvailableServicePerson()

     
      if(newServicePersonId) {
        this.setState({ servicePersonId:newServicePersonId })
        await ServicePersonMakeBuisy(newServicePersonId)
        await addNewConversation(userId, newServicePersonId)
        this.setState({ isOpenConversation: true })       
      }
      removeCustomerFromQueue(this.state.userId)
       
    }    
  }

  endChatHandler = ( ) =>{
    ServicePersonMakeAvailable(this.state.servicePersonId)
    archiveConversation(this.state.conversationId)
    this.setState({
      userId: null,
      userName: null,
      service: null,
      conversationId: null,     
      isOpenConversation: false, 
      endChatModalClass: 'close',
      servicePersonId: null
    })
    localStorage.removeItem(USER_ID_KEY) 
    localStorage.removeItem(USER_NAME_KEY) 
    localStorage.removeItem(SERVICE_KEY)    
    localStorage.removeItem(CONVERSATION_ID_KEY)
  }





  
  


  render (){
    const { userId, isOpenConversation, conversationId } = this.state
    return (
      <Fragment> 
        <Dashboard openChatClicked={this.openChatHandler.bind(this)} endChatclicked={this.endChatHandler.bind(this)}></Dashboard>
        {
          isOpenConversation ? 
              <div className={`chatWidget `}>
                <div className="chatHeader">chat with {this.state.userName}</div>
                <div className='messagesContainer'>
                  { userId ? <DisplayMessages userId={userId} conversationId={conversationId}></DisplayMessages> : null }
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

