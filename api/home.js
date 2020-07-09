import gitee from '../utils/gitee'

module.exports = {
  // 获取项目目标路径
  getDocsPath(url = '', params) {
    return gitee.get('api/v5/repos/RtyXmd/jgsrty.github.docs/contents/docs/english/' + url, params)
  },
  // 获取文件流
  getDocsRaw(url){
    return gitee.get(url)
  },
  getHomeList(params) {
    // return gitee.get('/repos/jgsrty/jgsrty.github.docs/contents/docs/english/2020/June/The%20next%20outbreak%20we%20are%20not%20ready.md', params)
  }
}