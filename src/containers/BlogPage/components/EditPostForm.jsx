import React from 'react'
import { useState, useEffect } from 'react';

import './EditPostForm.css'

import CloseIcon from '@mui/icons-material/Close';

export const EditPostForm = (props) => {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDescription, setPostDescription] = useState(props.selectedPost.description);

  const handlePostTitleChange = e => {
    setPostTitle(e.target.value)
  }

  const handlePostDescChange = e => {
    setPostDescription(e.target.value)
  }

  const savePost = e => {
    e.preventDefault()
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescription,
      liked: props.selectedPost.liked
    }
    
    props.editBlogPost(post)
    props.handleEditFormHide()
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        props.handleEditFormHide()  
      }
    }
    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [props])

  const handleEditFormHide = props.handleEditFormHide
  return (
    <>
      <form className="editPostForm" onSubmit={savePost}>
        <button onClick={handleEditFormHide}>
          <CloseIcon className='hideBtn'/>
        </button>
        
        <h2>Создание поста</h2>
        <div>
          <input 
            type="text" 
            className='editFormInput' 
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
            className='editFormInput' 
            placeholder='Описание поста' 
            value={postDescription}
            onChange={handlePostDescChange}
            required
            rows={3}
          />
        </div>
        <div>
          <button 
            type="submit"
            className="blackBtn"
          >Изменить пост</button>
        </div>
      </form>
      <div className="overlay" onClick={handleEditFormHide}></div>
    </>
  )
}
  
