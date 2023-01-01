import React from 'react'
import { Component } from 'react';

import './EditPostForm.css'

import CloseIcon from '@mui/icons-material/Close';

export class EditPostForm extends Component {

  state = {
    postTitle : this.props.selectedPost.title,
    postDescription: this.props.selectedPost.description
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

  savePost = (e) => {
    e.preventDefault()
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: this.props.selectedPost.liked
    }
    
    this.props.editBlogPost(post)
    this.props.handleEditFormHide()
  }

  handleEscape = (e) => {
    if (e.key === 'Escape') {
      this.props.handleEditFormHide()  
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape)
  }

  render() {
    const handleEditFormHide = this.props.handleEditFormHide
    return (

      <>
        <form className="editPostForm" onSubmit={this.savePost}>
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
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea 
              name="postDescription" 
              className='editFormInput' 
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
            >Изменить пост</button>
          </div>
        </form>
        <div className="overlay" onClick={handleEditFormHide}>
          
        </div>
      </>
    )
  }
}
  
