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
import { storeItems, getItems, removeItemsFromStore } from '../../../utils/storeItems'


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null,
      service:null,
      conversationId: null,     
      isOpenConversation: null, 
      servicePersonId: null,
      endChatModalClass: 'close'
    }     
  }


  componentDidMount(){
    this.setState(getItems()) 
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
    const {  conversationId, servicePersonId } = this.state

    ServicePersonMakeAvailable(servicePersonId)
    archiveConversation(conversationId)
    this.setState({
      userId: null,
      userName: null,
      service: null,
      conversationId: null,
      isOpenConversation: false,
      servicePersonId: null,
      endChatModalClass: 'close'
    })
    removeItemsFromStore()
  }
   

  render (){
    const { userId, isOpenConversation, conversationId } = this.state
    return (
      <Fragment> 
        <Dashboard 
          openChatClicked={this.openChatHandler.bind(this)}
          endChatclicked={this.endChatHandler.bind(this)}>

        </Dashboard>
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

