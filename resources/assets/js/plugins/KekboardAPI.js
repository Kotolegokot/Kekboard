window.$ = require('jquery')

export default {
  install (Vue) {
    Vue.requestCurrentUser = () => new Promise((resolve, reject) => {
      Vue.http.get('/user').then(response => {
        let user = response.body
        resolve(user)
      }).catch(response => { reject(response) })
    })

    Vue.requestUser = userId => new Promise((resolve, reject) => {
      Vue.http.get('/user/' + userId).then(response => {
        let user = response.body
        resolve(user)
      }).catch(response => { reject(response) })
    })

    Vue.requestPost = postId => new Promise((resolve, reject) => {
      Vue.http.get('/post/' + postId).then(response => {
        let post = response.body
        resolve(post)
      }).catch(response => { reject(response) })
    })

    Vue.requestSections = () => new Promise((resolve, reject) => {
      Vue.http.get('/sections').then(response => {
        let sections = response.body
        resolve(sections)
      }).catch(response => { reject(response) })
    })

    Vue.requestThreads = sectionId => new Promise((resolve, reject) => {
      Vue.http.get('/section/' + sectionId + '/threads').then(response => {
        let threads = response.body
        threads.map(thread => {
          Vue.requestUser(thread.author_id).then(user => { Vue.set(thread, 'author', user) })
        })

        resolve(threads)
      }).catch(response => { reject(response) })
    })

    Vue.requestCreateNewThread = (sectionId, name, firstPostBody) => new Promise((resolve, reject) => {
      Vue.http.post('/section/' + sectionId + '/threads/create', {
        name,
        first_post_body: firstPostBody
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      }).then(response => {
        resolve(response)
      }).catch(response => {
        reject(Object.values(response.body.errors).flatten())
      })
    })

    Vue.requestPosts = threadId => new Promise((resolve, reject) => {
      Vue.http.get('/thread/' + threadId + '/posts').then(response => {
        let posts = response.body
        posts.map(post => {
          Vue.set(post, 'answers_to_post', null)

          if (post.answers_to_post_id !== 0) {
            Vue.requestPost(post.answers_to_post_id).then(answers_to_post => {
              Vue.set(post, 'answers_to_post', answers_to_post)
            })
          }

          Vue.set(post, 'isMain', (() => this.answers_to_post === 0).bind(post))
        })

        resolve(posts)
      }).catch(response => { reject(response) })
    })

    Vue.requestCreateNewPost = (threadId, body, answersToPostId) => new Promise((resolve, reject) => {
      Vue.http.post('/thread/' + threadId + '/posts/create', {
        body,
        answers_to_post: answersToPostId
      }, {
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      }).then(response => {
        resolve(response)
      }).catch(response => {
        reject(Object.values(response.body.errors).flatten())
      })
    })
  }
}
