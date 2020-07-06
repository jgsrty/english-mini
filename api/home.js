import service from '../utils/request'

module.exports = {
  getHomeInfos(params) {
    return service.get('/repos/jgsrty/jgsrty.github.docs/contents/docs/english/2020', params)
  },
  getHomeList(params) {
    return service.get('/repos/jgsrty/jgsrty.github.docs/contents/docs/english/2020/June/The%20next%20outbreak%20we%20are%20not%20ready.md', params)
  }
}