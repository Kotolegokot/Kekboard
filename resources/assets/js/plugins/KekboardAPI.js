window.$ = require('jquery')

export default {
  install (Vue) {
    Vue.requestCurrentUser = () => Vue.http.get('/user')

    Vue.requestUser = (userId) => Vue.http.get('/user/' + userId)

    Vue.requestPost = (postId) =>  Vue.http.get('/post/' + postId)

    Vue.requestSections = () => Vue.http.get('/sections')

    Vue.requestThreads = (sectionId) => Vue.http.get('/section/' + sectionId + '/threads')

    Vue.requestCreateNewThread = (sectionId, name, firstPostBody) => Vue.http.post('/section/' + sectionId + '/threads/create', {
      name,
      first_post_body: firstPostBody
    }, {
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })

    Vue.requestPosts = (threadId) => Vue.http.get('/thread/' + threadId + '/posts')

    Vue.requestCreateNewPost = (threadId, body, answersToPostId) => Vue.http.post('/thread/' + threadId + '/posts/create', {
      body,
      answers_to_post: answersToPostId
    }, {
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
  }
}
