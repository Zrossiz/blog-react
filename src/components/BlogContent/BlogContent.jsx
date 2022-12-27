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
      <React.Fragment>
        {
          this.state.showAddForm ? <AddPostForm  handleAddFormHide={this.handleAddFormHide}/> : null
        }
        

          <>
            <h1>Simple Blog</h1>
            <button className='blackBtn' onClick={this.handleShowAddForm}>Добавить пост</button>
            <div className="posts">
              {blogPosts}
            </div>
          </>
          
        </React.Fragment>
    )
  }
}
