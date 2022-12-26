import React from 'react'
import './BlogContent.css'

import { BlogCard } from './components/BlogCard'

import { posts } from '../../shared/projectData'

export class BlogContent extends React.Component {

  state = {
    showBlog: true,
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

  toggleBlog = () => {
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog
      };
    });
  };

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
        <button onClick={this.toggleBlog}>
          {
            this.state.showBlog ? 'Скрыть блог' : 'Показать блог'
          }
        </button>
        
        {
          this.state.showBlog ? 
          <>
            <h1>Simple Blog</h1>
            <div className="posts">
              {blogPosts}
            </div>
          </>
          : null
        }
          
        </React.Fragment>
    )
  }
}
