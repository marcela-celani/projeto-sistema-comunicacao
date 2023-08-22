import React from 'react'

const CreateGroup = () => {

    const handleForm = () => {

    }
    
  return (
    <div>
      <form onSubmit={handleForm}>
        <label htmlFor="name">Nome do Grupo</label>
        <input type="text" id='name'/>
      </form>
    </div>
  )
}

export default CreateGroup
