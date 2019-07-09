const storeName  = 'dsdfsmouihmko,ugmoiyul,iuhjmoygkho'
const defaultValues = () => {
  return { userId : undefined, userName: null, service: null, conversationId: null, isOpenConversation: null, servicePersonId: null }
}

const storeItems = (userId, userName, service, conversationId, isOpenConversation, servicePersonId ) => {
    const result = JSON.stringify( { userId, userName, service, conversationId, isOpenConversation, servicePersonId})
    localStorage.setItem(storeName, result)
}


const getItems =() =>{
  const result = JSON.parse(localStorage.getItem(storeName))
  return result ? result : defaultValues()
}     


const removeItemsFromStore =() =>{
  localStorage.removeItem(storeName)
}



export  { storeItems, getItems, removeItemsFromStore, defaultValues }