import React from 'react'
import { Component } from 'react';

import './AddPostForm.css'

import CloseIcon from '@mui/icons-material/Close';

export class AddPostForm extends Component {

  state = {
    postTitle : '',
    postDescription: ''
  }

  handlePostTitleChange = e => {
    this.setState({
      postTitle: e.target.value
    })
  }

  handlePostDescChange = e => {
    this.setState({
      postDescription: e.target.value
    })
  }

  createPost = (e) => {
    e.preventDefault()
    const post = {
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false
    }
    this.props.addNewBlogPost(post)
    this.props.handleAddFormHide()
  }

  render() {
    const handleAddFormHide = this.props.handleAddFormHide
    return (

      <>
        <form className="addPostForm" onSubmit={this.createPost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea 
              name="postDescription" 
              className='addFormInput' 
              placeholder='Описание поста' 
              value={this.state.postDescription}
              onChange={this.handlePostDescChange}
              required
            />
          </div>
          <div>
            <button 
              type="submit"
              className="blackBtn"
              onClick={this.state.createPost}
            >Добавить пост</button>
          </div>
        </form>
        <div className="overlay" onClick={handleAddFormHide}>
          
        </div>
      </>
    )
  }
}
  
