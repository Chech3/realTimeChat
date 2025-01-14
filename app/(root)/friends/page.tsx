import React from 'react'
import ItemList from '../../../components/shared/item-list/ItemList';
import ConversationFallBack from '../../../components/shared/conversation/ConversationFallback';

// type Props = {}

const FriendsPage = () => {
  return (
    <>
      <ItemList title="Friend's Page">Friends Page</ItemList>
      
      <ConversationFallBack />
    </>
  )
}

export default FriendsPage