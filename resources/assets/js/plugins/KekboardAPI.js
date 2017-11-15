window.$ = require('jquery')

export default {
  install (Vue) {
    Vue.requestCurrentUser = () => Vue.http.get('/user')

    Vue.requestUser = userId => Vue.http.get('/user/' + userId)

    Vue.requestPost = postId =>  Vue.http.get('/post/' + postId)

    Vue.requestSections = () => Vue.http.get('/sections')

    Vue.requestThreads = sectionId => Vue.http.get('/section/' + sectionId + '/threads')

    Vue.requestCreateNewThread = (sectionId, name, firstPostBody) => Vue.http.post('/section/' + sectionId + '/threads/create', {
      name,
      first_post_body: firstPostBody
    }, {
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })

    Vue.requestPosts = threadId => {
      return new Promise((resolve, reject) => {
        Vue.http.get('/thread/' + threadId + '/posts').then(response => {
          let posts = response.body

          for (let i = 0; i < posts.length; i++) {
            posts[i].answers_to_post = {}
            if (posts[i].answers_to_post_id != 0) {
              Vue.requestPost(posts[i].answers_to_post_id).then(response => {
                posts[i].answers_to_post = response.body
              })
            }

            posts[i].show_answer_form = false

            posts[i].isMain = (() => this.answers_to_post === {}).bind(posts[i])
          }

          return resolve(posts)
        }).catch(response => {
          reject(response.statusText)
        })
      })
    }

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
