const storeName  = 'dsdfsmouihmko,ugmoiyul,iuhjmoygkho'

const storeItems = (userId, userName, service, conversationId, isOpenConversation, servicePersonId ) => {
    const result = JSON.stringify( { userId, userName, service, conversationId, isOpenConversation, servicePersonId})
    localStorage.setItem(storeName, result)
}


const getItems =() =>{
    return JSON.parse(localStorage.getItem(storeName))
}     


const removeItemsFromStore =() =>{
  localStorage.removeItem(storeName)
}

export  { storeItems, getItems, removeItemsFromStore }