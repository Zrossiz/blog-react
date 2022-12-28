import React from 'react'
import axios from 'axios'

import './BlogContent.css'

import { BlogCard } from './components/BlogCard'
import { AddPostForm } from './components/AddPostForm'

export class BlogContent extends React.Component {

  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false
  };

  likePost = index => {
    const temp = this.state.blogArr;
    temp[index].liked = !temp[index].liked

    this.setState({
      blogArr: temp
    })

    localStorage.setItem('blogPosts', JSON.stringify(temp))
  }

  fetchPosts = () => {
    this.setState({
      isPending: true
    })
    axios.get('https://63ab4257fdc006ba605a82a8.mockapi.io/posts')
      .then((res) => {
        this.setState({
          blogArr: res.data,
          isPending: false
        })
      })
      .catch((err) => {
        console.log(err)
    })
  }

  deletePost = blogPost => {
    if (window.confirm(`Хотите ${blogPost.title} удалить?`)) {

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
    const temp = [...this.state.blogArr];
    temp.push(blogPost)

    this.setState({
      blogArr: temp
    })

    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost)
      localStorage.setItem('blogPosts', JSON.stringify(posts))

      return {
        blogArr: temp
      }
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
          likePost={() => this.likePost(index)}
          deletePost={() => this.deletePost(item)}
          />
      );
    });

    if (this.state.blogArr.length === 0) {
      return <h1>Загружаю данные...</h1>
    }

    return (
      <div className='blogPage'>
        {this.state.showAddForm ? <AddPostForm  
          blogArr={this.state.blogArr}
          addNewBlogPost={this.addNewBlogPost}
          handleAddFormHide={this.handleAddFormHide}
        /> : null}
        
          <>
            <h1>Blog page</h1>
            <div className="posts">
              {blogPosts}
            </div>
            <div className="addPostBlock">
              <button 
              className='blackBtn' 
              onClick={this.handleShowAddForm}>
              Добавить пост
              </button>
            </div>
            {
              this.state.isPending && <h2>Подождите</h2>
            }
          </>
          
        </div>
    )
  }
}
