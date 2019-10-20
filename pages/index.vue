<template>
  <section class="index-c">
    <div class="site-logo-c"><img class="site-logo" src="~/static/imgs/logo.jpg" alt="logo.jpg"/></div>
    <h1 class="site-sub-title">Fast Search For The Torrent Resources Around The World</h1>
    <div class="search-c">
      <input @keyup.enter="search" class="search-input" :placeholder="`${totalCount} Magnetic Links Are Included In Total, Included Today Is ${todayCount}`" v-model="keyword"/>
      <button @click="search" class="button-red"><font-awesome-icon :icon="icon.search"/></button>
    </div>
    <div>
      <Recommend :data="popularKeyword"></Recommend>
      <Recommend :data="randomTorrent" :isRandom="true" @randomRefresh="onRandomRefreshed"></Recommend>
    </div>
  </section>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Recommend from '~/components/recommend.vue'
export default {
  layout: 'main',
  components: {
    Recommend,
    FontAwesomeIcon
  },
  data () {
    return {
      keyword: '',
      totalCount: 0,
      todayCount: 0,
      icon: {
        search: faSearch
      },
      randomTorrent: [],
      popularKeyword: []
    }
  },
  methods: {
    search () {
      if (this.keyword) {
        this.$router.push(`resultList/${this.keyword}`)
      }
    },
    onRandomRefreshed (data) {
      this.randomTorrent = data
    }
  },
  asyncData ({ app, error }) {
    return app.$axios
      .$get(`${process.env.baseUrl}/init`)
      .then(res => {
        const { data, code, msg } = res
        if (code != 200) {
          error({ statusCode: code, message: msg })
        } else {
          return {
            totalCount: data.count_total,
            todayCount: data.count_today,
            popularKeyword: data.popular_keyword,
            randomTorrent: data.random_torrent
          }
        }
      })
      .catch(e => {
        error({ statusCode: e.statusCode, message: e.message })
      })
  },
  head () {
    return {
      title: 'Search For The Latest And Hottest Internet Resources In The World'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-c {
  display: flex;
  margin-bottom: 2rem;
  .search-input {
    border: 0.1rem solid;
    padding: 0 1rem;
    color: #999999;
    border-image: linear-gradient(to right, #720ee3, #f32779) 1.8 1.8;
  }
}

.site-logo-c {
  margin-bottom: 1rem;
}

h1.site-sub-title {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #6d6d6d;
}
</style>
