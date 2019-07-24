module.exports = {
  /**
   *
   * 解码 get 请求
   * @param {String} url
   * @returns {Object}
   */
  decodeQuery(url) {
    let params = {}
    const paramsStr = url.replace(/(\S*)\?/, '') // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
      const d = v.split('=')
      if (d[1] && d[0]) params[d[0]] = d[1]
    })
    return params
  }
}
