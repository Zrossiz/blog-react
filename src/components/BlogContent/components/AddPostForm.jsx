import React from 'react'

import './AddPostForm.css'

import CloseIcon from '@mui/icons-material/Close';

export function AddPostForm({ handleAddFormHide }) {
  return (

    <>
      <form className="addPostForm" action="">
        <button onClick={handleAddFormHide}>
          <CloseIcon className='hideBtn'/>
        </button>
        
        <h2>Создание поста</h2>
        <div>
          <input type="text" className='addFormInput' name="postTitle" placeholder='Заголовок поста'/>
        </div>
        <div>
          <textarea name="postDescription" className='addFormInput'   placeholder='Описание поста'/>
        </div>
        <div>
          <button onClick={handleAddFormHide} className="blackBtn">
            Добавить пост
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleAddFormHide}>
        
      </div>
    </>
  )
}
