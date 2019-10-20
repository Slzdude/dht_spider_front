const axios = require('axios')
module.exports = {
  build: {
    extractCSS: {
      allChunks: true
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'http://127.0.0.1:3000/',
    // hostname: 'https://www.btzhai.top/',
    generate: true,
    routes (callback) {
      axios.get('http://localhost:8080/seo').then(res => {
        const reg = new RegExp(' ', 'g')
        const routes = res.data.data.map(data => '/resultList/' + data.word.replace(reg, '%20'))
        callback(null, routes)
      }).catch(callback)
    }
  },
  head: {
    title: 'Loading...',
    titleTemplate: '%s - BTZhai',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge,chrome=1'
      },
      {
        name: 'HandheldFriendly',
        content: 'true'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'author',
        content: 'zhaoritian07@hotmail.com'
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        'http-equiv': 'Cache-Control',
        content: 'no-siteapp'
      },
      {
        name: 'keywords',
        content: 'BT Zhai,torrent,download,elasticsearch,magnet,bittorrent,bt search,p2p search engine,dht network,free torrent,free video,free porn,latest movie,latest download,free download,infohash'
      },
      {
        name: 'description',
        content: 'Fast torrent search engine, build with ElasticSearch and NuxtJS, searches and downloads the latest and hottest movies, music, books, software, animation, games and other resources around the world'
      }
    ]
  },

  modules: [
    '@nuxtjs/sitemap',
    ['@nuxtjs/axios', {
      credentials: false,
      proxyHeaders: false // CF打开首页时提示403
    }]
  ],
  css: [
    '~/assets/css/reset.scss',
    '~/assets/css/override-nuxt.scss',
    '~/assets/css/main.scss',
    '~/assets/css/button.scss',
    '~/assets/css/page.scss',
    '~/assets/css/icon.scss'
  ],
  plugins: [
    {
      src: '~/plugins/page',
      ssr: false
    },
    {
      src: '~/plugins/clipboard',
      ssr: false
    },
    {
      src: '~/plugins/notify',
      ssr: false
    },
    '~/plugins/filter'
  ],
  env: {
    baseUrl: 'http://127.0.0.1:8080/'
  },
  loading: {
    color: '#f32779'
  }
}
