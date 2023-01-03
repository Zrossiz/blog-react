import React from 'react'
import axios from 'axios'

import './BlogPage.css'

import { BlogCard } from './components/BlogCard'
import { AddPostForm } from './components/AddPostForm'
import { EditPostForm } from './components/EditPostForm'

import { postsUrl } from '../../shared/projectData'

import CircularProgress from '@mui/material/CircularProgress'

let source;

export class BlogPage extends React.Component {

  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
  };

  likePost = blogPost => {

    const temp = {...blogPost};
    temp.liked = !temp.liked

    axios.put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменён =>', response.data)
        this.fetchPosts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchPosts()
  } 

  componentWillUnmount() {
    if (source) {
      source.cancel('Axios get canceled')
    }
  }

  deletePost = blogPost => {
    if (window.confirm(`Хотите ${blogPost.title} удалить?`)) {
      this.setState({
        isPending: true
      })

      axios.delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          console.log('Пост удален => ', response.data)
          this.fetchPosts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  
  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true
    })
    axios.put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('Пост отредактирован => ', response.data)
        this.fetchPosts()
      })
      .catch((err) => {
        console.log(err)
      })
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

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true
    })
  }

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false
    })
  }

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true
    })
    axios.post(postsUrl, blogPost)
      .then((response) => {
        console.log('Пост создан =>', response.data)
        this.fetchPosts()
      })
      .cath((err) => {
        console.log(err)
      })
  }

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
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
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
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

        {
          this.state.showEditForm && (
          <EditPostForm onClick={this.handleEditFormShow}
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
          )
        }
        
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
