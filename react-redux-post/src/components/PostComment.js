import React, { Component } from "react"
import Axios from "axios"
import store from "../store"
class PostComment extends Component {
  state = {
    val: ""
  }
  addComment = () => {
    // 1. 发送请求添加远端的评论
    // 2. 将网上更新好的在本地展示
    const { val } = this.state
    if (val.trim()) {
      Axios.post("http://localhost:3008/comments", {
        text: val,
        postId: this.props.postId
      }).then(res => {
        store.dispatch({ type: "ADDCOMMENT", newComment: res.data })
        this.setState({
          val: ""
        })
      })
    }
  }
  render() {
    const { comments } = this.props
    const commentList = comments.length ? (
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    ) : (
      "请稍等。。。"
    )
    return (
      <div>
        <h4>评论</h4>
        {commentList}
        <textarea
          value={this.state.val}
          onChange={event =>
            this.setState({
              val: event.target.value
            })
          }
        />
        <button onClick={this.addComment}>添加评论</button>
      </div>
    )
  }
}
export default PostComment