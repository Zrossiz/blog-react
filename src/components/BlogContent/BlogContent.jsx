import React from 'react'
import './BlogContent.css'

import { BlogCard } from './components/BlogCard'
import { AddPostForm } from './components/AddPostForm'

import { posts } from '../../shared/projectData'

export class BlogContent extends React.Component {

  state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  };

  likePost = index => {
    const temp = this.state.blogArr;
    temp[index].liked = !temp[index].liked

    this.setState({
      blogArr: temp
    })

    localStorage.setItem('blogPosts', JSON.stringify(temp))
  }

  deletePost = index => {
    if (window.confirm(`Хотите ${this.state.blogArr[index].title} удалить?`)) {
      const temp = [...this.state.blogArr];
      temp.splice(index, 1)
      console.log('Эталонный массив =>', this.state.blogArr);
      console.log('Измененный массив', temp)

      this.setState({
        blogArr: temp
      })

      localStorage.setItem('blogPosts', JSON.stringify(temp))
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
          deletePost={() => this.deletePost(index)}
          />
      );
    });
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
            
          </>
          
        </div>
    )
  }
}
