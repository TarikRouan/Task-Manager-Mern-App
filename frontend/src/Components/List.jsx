import React from 'react'


const List = (list) => {

  return (
    <div className='list'>
      <span>
        <h3>{list.list.title}</h3>
        <p>{new Date(list.list.createdAt).toLocaleString()}</p>
        </span>
    </div>
  )
}

export default List