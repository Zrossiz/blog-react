import React from 'react'
import { useState, useEffect } from 'react'

import './AddPostForm.css'

import CloseIcon from '@mui/icons-material/Close'

export function AddPostForm (props) {
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')

  const handlePostTitleChange = e => {
    setPostTitle(e.target.value)
  }

  const handlePostDescChange = e => {
    setPostDescription(e.target.value)
  }

  const createPost = (e) => {
    e.preventDefault()
    const post = {
      title: postTitle,
      description: postDescription,
      liked: false
    }
    props.addNewBlogPost(post)
    props.handleAddFormHide()
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        props.handleAddFormHide()  
      }
    }
    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [props])
  

  const handleAddFormHide = props.handleAddFormHide
  return (
    <>  
      <form className="addPostForm" onSubmit={createPost}>
        <button onClick={handleAddFormHide}>
          <CloseIcon className='hideBtn'/>
        </button>
        
        <h2>Создание поста</h2>
        <div>
          <input 
            type="text" 
            className='addFormInput' 
            name="postTitle" 
            placeholder='Заголовок поста' 
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea 
            name="postDescription" 
            className='addFormInput' 
            placeholder='Описание поста' 
            value={postDescription}
            onChange={handlePostDescChange}
            required
            rows={4}
          />
        </div>
        <div>
          <button 
            type="submit"
            className="blackBtn"
          >Добавить пост</button>
        </div>
      </form>
      <div className="overlay" onClick={handleAddFormHide}></div>
    </>
  )
}
  
