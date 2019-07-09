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
import { storeItems, getItems, removeItemsFromStore, defaultValues } from '../../utils/storeItems'


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
    console.log(name,'name',  userId, 'userId' , service , 'service')    
    if (userId){
      debugger
      console.log( userId, 'userId' )    

      const conversationId = await findConversation(userId, service)
      if(conversationId) this.setState({ isOpenConversation: !this.state.isOpenConversation, conversationId })
      console.log( conversationId, 'conversationId' )    

    } 

    if (!this.state.userId ){
      console.log( this.state.userId , 'this.state.userId ' )    

      const userId = await addCustumerToQueue(name)
      console.log( userId , 'userId' )    

      this.setState({ userId, name, service })
      
      const newServicePersonId = await findAvailableServicePerson()
      console.log( newServicePersonId , 'newServicePersonId' )    


      debugger

      if(newServicePersonId) {
        console.log( newServicePersonId , 'newServicePersonId' )    
        this.setState({ servicePersonId: newServicePersonId })
        await ServicePersonMakeBuisy(newServicePersonId)
       const conversationId= await addNewConversation(userId, newServicePersonId)
        debugger
        this.setState({ isOpenConversation: true, conversationId })       
      }
      await removeCustomerFromQueue(this.state.userId) // check if need to put it in the if 

    }    
  }



  endChatHandler = ( ) =>{
    const {  conversationId, servicePersonId } = this.state

    ServicePersonMakeAvailable(servicePersonId)
    archiveConversation(conversationId)
    this.setState(defaultValues())
    removeItemsFromStore()
    this.setState({endChatModalClass: 'close'})
  }
   

  render (){
    const { userId, isOpenConversation, conversationId } = this.state
    return (
      <Fragment>
        {
          !isOpenConversation ?
           <Dashboard 
            openChatClicked={this.openChatHandler.bind(this)}
            endChatclicked={this.endChatHandler.bind(this)}>
          </Dashboard>
          : null
        } 
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

