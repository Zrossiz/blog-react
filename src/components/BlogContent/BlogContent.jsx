import React from 'react'
import axios from 'axios'

import './BlogContent.css'

import { BlogCard } from './components/BlogCard'
import { AddPostForm } from './components/AddPostForm'

import CircularProgress from '@mui/material/CircularProgress';


export class BlogContent extends React.Component {

  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false
  };

  likePost = blogPost => {

    const temp = {...blogPost};
    temp.liked = !temp.liked

    axios.put(`https://63ab4257fdc006ba605a82a8.mockapi.io/posts/${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменён =>', response.data)
        this.fetchPosts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  fetchPosts = () => { 
    axios.get('https://63ab4257fdc006ba605a82a8.mockapi.io/posts')
      .then((res) => {
        this.setState({
          blogArr: res.data,
          isPending: false
        })
        this.handleAddFormHide()
      })
      .catch((err) => {
        console.log(err)
    })
  }

  deletePost = blogPost => {
    if (window.confirm(`Хотите ${blogPost.title} удалить?`)) {
      this.setState({
        isPending: true
      })

      axios.delete(`https://63ab4257fdc006ba605a82a8.mockapi.io/posts/${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data)
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  handleShowAddForm = () => {
    this.setState({
      showAddForm: true
    })
  }

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false
    })
  }

  handleEscape = (e) => {
    if (e.key === 'Escape' && this.state.showAddForm) {
      this.handleAddFormHide()
    }
  }

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true
    })
    axios.post('https://63ab4257fdc006ba605a82a8.mockapi.io/posts/', blogPost)
      .then((response) => {
        console.log('Пост создан =>', response.data)
        this.fetchPosts()
      })
      .cath((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchPosts()
    window.addEventListener('keyup', this.handleEscape)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape)
  }
  
  render() {
    const blogPosts = this.state.blogArr.map((item, index) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          likeCount={item.likeCount}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          />
      );
    });

    if (this.state.blogArr.length === 0) {
      return <h1>Загружаю данные...</h1>
    }

    const postsOpacity = this.state.isPending ? 0.5 : 1

    return (
      <div className='blogPage'>
        {this.state.showAddForm ? <AddPostForm  
          blogArr={this.state.blogArr}
          addNewBlogPost={this.addNewBlogPost}
          handleAddFormHide={this.handleAddFormHide}
        /> : null}
        
          <>
            <h1>Blog page</h1>
            {this.state.isPending && <CircularProgress className='preloader' color="secondary"/>}
            <div className="posts" style={{opacity: postsOpacity}}>
              {blogPosts}
            </div>
            <div className="addPostBlock">
              <button 
              className='blackBtn' 
              onClick={this.handleShowAddForm}>
              Добавить пост
              </button>
            </div>
          </>
          
        </div>
    )
  }
}
