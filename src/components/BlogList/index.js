import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const statusCode = await response.statusCode
    console.log(statusCode)
    const data = await response.json()

    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    console.log(isLoading)

    return (
      <div className="blog-list-container" data-testid="loader">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <div data-testid="loader">
            <div className="cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
                className="image1"
                alt="profile"
              />
              <h1 className="heading">Wade Warren</h1>
              <p className="para">Software developer at UK</p>
            </div>
            {blogsData.map(item => (
              <BlogItem blogData={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default BlogList
