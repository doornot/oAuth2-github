import React, { Component } from 'react'
import axios from './utils/axios'

const { client_id, oAuthUri } = require('./utils/config')
const { decodeQuery } = require('./utils')

class App extends Component {
  state = { userInfo: null }

  handleAuth = () => {
    // localStorage.setItem('prevHref', window.location.href) // 预存上次请求路径
    window.location.href = `${oAuthUri}?client_id=${client_id}` // 第一步跳转路径
  }

  componentDidMount() {
    const { code } = decodeQuery(window.location.href)
    if (code) {
      axios.post('/auth', { code }).then(userInfo => {
        this.setState({ userInfo })
      })
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleAuth}>github login</button>
        <hr />
        {JSON.stringify(this.state.userInfo)}
      </div>
    )
  }
}

export default App
