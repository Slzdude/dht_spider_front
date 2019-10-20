<template>
  <section class="result-c">
    <div class="left-c">
      <div @click="$router.push('/')" class="site-logo-c"><img class="site-logo" src="~/static/imgs/logo.jpg" alt="logo.jpg"/></div>
    </div>
    <div class="right-c">
      <div class="search-c">
        <input @keyup.enter="search" class="search-input" placeholder="Input Some Keywords That You Like~" v-model="keyword"/>
        <button @click="search" class="button-red-small"><font-awesome-icon :icon="icon.search"/></button>
      </div>
      <h4 v-if="pager.total" class="search-stat">A Total Of <strong>{{ pager.total }}</strong> Results Were Searched, Takes <strong>{{ took / 1000 }}s </strong>,<span v-if="pager.total > pager.overTotal">The Top 1000 Results Are Displayed.</span></h4>
      <div v-if="pager.total" class="sort-c">
        <div :class="`sort-item ${scoreSortDirection.enabled?'active':''}`" @click="onChangeSort(1)">
          <span class="sort-item-label">Correlation:</span><font-awesome-icon class="icon-arrow" :icon="scoreSortDirection.value == 'DESC' ? icon.arrowDown : icon.arrowUp"/>
        </div>
        <div :class="`sort-item ${lengthSortDirection.enabled?'active':''}`" @click="onChangeSort(2)">
          <span class="sort-item-label">Size:</span><font-awesome-icon class="icon-arrow" :icon="lengthSortDirection.value == 'DESC' ? icon.arrowDown : icon.arrowUp"/>
        </div>
        <div :class="`sort-item ${createTimeSortDirection.enabled?'active':''}`" @click="onChangeSort(3)">
          <span class="sort-item-label">CreateTime:</span><font-awesome-icon class="icon-arrow" :icon="createTimeSortDirection.value == 'DESC' ? icon.arrowDown : icon.arrowUp"/>
        </div>
        <div :class="`sort-item ${popularitySortDirection.enabled?'active':''}`" @click="onChangeSort(4)">
          <span class="sort-item-label">Popularity:</span><font-awesome-icon class="icon-arrow" :icon="popularitySortDirection.value == 'DESC' ? icon.arrowDown : icon.arrowUp"/>
        </div>
      </div>
      <div v-if="pager.total" v-for="item in data" shadow="hover" :key="item.id" class="box-card">
        <div class="card-title">
          <a @click="onClickName(item.id)" v-html="item.nameHighLight"></a>
        </div>
        <div v-for="(file, index) in item.pathHighlight" :key="index" class="card-item">
          <span v-html="file.path"></span>
          <span class="tag">{{ file.length | byteToCommon }}</span>
        </div>
        <div class="card-footer">
          <div class="card-footer-item">
            <span>CreateTime:</span><span class="tag-value">{{ item.create_time | dateFormat }}</span>
          </div>
          <div class="card-footer-item">
            <span>Popularity:</span><span class="tag-value">{{ item.popularity }}</span>
          </div>
          <div class="card-footer-item">
            <span>Size:</span><span class="tag-value">{{ item.length | byteToCommon }}</span>
          </div>
          <div class="card-footer-item">
            <span>FilesCount:</span><span class="tag-value">{{ item.files.length }}</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-footer-item">
            <button @click="doCopy(item.id)" class="button-white-mini">Copy Magnet Link</button>
          </div>
          <div class="card-footer-item">
            <button @click="onClickName(item.id)" class="button-white-mini">View Detail</button>
          </div>
        </div>
      </div>
      <div v-if="pager.total" class="footer-c">
        <no-ssr>
          <pagination
            :total="pager.total > pager.overTotal ? pager.overTotal / 10: (pager.total / 10) + 1"
            :current="pager.current"
            :count="3"
            @jump="onCurrentChange($event)"></pagination>
        </no-ssr>
      </div>
      <div v-if="pager.total == 0">
        <div class="nr-c">
          <img class="nr-img" src="/imgs/NR-EN.jpg" alt="NR-EN.jpg"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueNotifications from 'vue-notifications'
import {
  faSearch,
  faArrowCircleDown,
  faArrowCircleUp,
  faArrowLeft,
  faArrowRight,
  faComment
} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'main',
  components: {
    FontAwesomeIcon
  },
  async asyncData ({ app, params }) {
    const requestParams = {
      keyword: params.keyword,
      pageNum: 0,
      pageSize: 10,
      scoreSortDirection: { enabled: true, value: 'DESC' },
      lengthSortDirection: { enabled: false, value: 'DESC' },
      popularitySortDirection: { enabled: false, value: 'DESC' },
      createTimeSortDirection: { enabled: false, value: 'DESC' }
    }
    return app.$axios
      .$post(`${process.env.baseUrl}/search`, requestParams)
      .then(res => {
        const { data, code, total, took, msg } = res
        if (code != 200) {
          error({ statusCode: code, message: msg })
        } else {
          return {
            data: data,
            keyword: params.keyword,
            pager: {
              current: 1,
              size: 10,
              total: total,
              overTotal: 1000
            },
            took: took
          }
        }
      })
      .catch(e => {
        error({ statusCode: e.statusCode, message: e.message })
      })
  },
  data () {
    return {
      keyword: '',
      data: [],
      pager: {
        current: 1,
        total: 0
      },
      scoreSortDirection: { enabled: true, value: 'DESC' },
      lengthSortDirection: { enabled: false, value: 'DESC' },
      popularitySortDirection: { enabled: false, value: 'DESC' },
      createTimeSortDirection: { enabled: false, value: 'DESC' },
      took: 0,
      enabledSort: 'score',
      icon: {
        search: faSearch,
        arrowDown: faArrowCircleDown,
        arrowUp: faArrowCircleUp,
        arrowLeft: faArrowLeft,
        arrowRight: faArrowRight
      }
    }
  },
  methods: {
    async search () {
      if (this.keyword) {
        const params = {
          keyword: this.keyword,
          pageNum: this.pager.current - 1,
          pageSize: 10,
          scoreSortDirection: this.scoreSortDirection,
          lengthSortDirection: this.lengthSortDirection,
          popularitySortDirection: this.popularitySortDirection,
          createTimeSortDirection: this.createTimeSortDirection
        }
        const { data } = await this.$axios.post(
          `${process.env.baseUrl}/search`,
          params
        )
        this.data = data.data
        this.pager.total = data.total
        this.took = data.took
      }
    },
    onClickName (id) {
      const torrent = this.data.find(item => item.id == id)
      this.$store.commit('set', torrent)
      this.$router.push(`/resultDetail/${this.keyword}`)
    },
    onCurrentChange (current) {
      this.pager.current = current
      this.search()
    },
    onChangeSort (index) {
      switch (index) {
        case 1:
          if (this.scoreSortDirection.enabled) {
            // 调整
            this.scoreSortDirection.value =
              this.scoreSortDirection.value == 'DESC' ? 'ASC' : 'DESC'
          } else {
            this.scoreSortDirection.enabled = true
            this.lengthSortDirection.enabled = false
            this.createTimeSortDirection.enabled = false
            this.popularitySortDirection.enabled = false
          }
          break
        case 2:
          if (this.lengthSortDirection.enabled) {
            // 调整
            this.lengthSortDirection.value =
              this.lengthSortDirection.value == 'DESC' ? 'ASC' : 'DESC'
          } else {
            this.scoreSortDirection.enabled = false
            this.lengthSortDirection.enabled = true
            this.createTimeSortDirection.enabled = false
            this.popularitySortDirection.enabled = false
          }
          break
        case 3:
          if (this.createTimeSortDirection.enabled) {
            // 调整
            this.createTimeSortDirection.value =
              this.createTimeSortDirection.value == 'DESC' ? 'ASC' : 'DESC'
          } else {
            this.scoreSortDirection.enabled = false
            this.lengthSortDirection.enabled = false
            this.createTimeSortDirection.enabled = true
            this.popularitySortDirection.enabled = false
          }
          break
        case 4:
          if (this.popularitySortDirection.enabled) {
            // 调整
            this.popularitySortDirection.value =
              this.popularitySortDirection.value == 'DESC' ? 'ASC' : 'DESC'
          } else {
            this.scoreSortDirection.enabled = false
            this.lengthSortDirection.enabled = false
            this.createTimeSortDirection.enabled = false
            this.popularitySortDirection.enabled = true
          }
          break
      }
      this.search()
    },
    doCopy (id) {
      this.$copyText(`magnet:?xt=urn:btih:${id}`).then(
        e => {
          this.showSuccessMsg()
        },
        e => {
          this.showErrorMsg()
        }
      )
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Success',
      message: 'Copy Magnet Link Success!'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Copy Magnet Link Failed!'
    }
  },
  head () {
    return {
      title: this.keyword
    }
  }
}
</script>

<style lang="scss" scoped>
.left-c {
  .site-logo-c {
    cursor: pointer;
    margin-bottom: 1rem;
  }
}
.right-c {
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  .search-c {
    display: flex;
    .search-input {
      width: 85%;
      border: 1.8px solid;
      padding: 0 0.5rem;
      color: #999999;
      border-image: linear-gradient(to right, #720ee3, #f32779) 1.8 1.8;
    }
  }
  .search-stat {
    padding-top: 1rem;
    color: #999999;
  }
  .sort-c {
    padding-top: 2rem;
    padding-bottom: 2rem;
    color: #f32779;
    .sort-item {
      padding: 0.5rem 0.2rem;
      margin-right: 1rem;
      cursor: pointer;
      display: inline-block;
      .sort-item-label {
        font-size: 1.2rem;
        font-weight: 600;
      }
      .icon-arrow {
        font-size: 1.2rem;
        margin-left: 0.3rem;
      }
    }
    .active {
      border-bottom: 1.5px solid #f32779;
    }
  }
  .box-card {
    margin-bottom: 3rem;
    .card-title {
      display: inline-block;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #663399;
      cursor: pointer;
      &:hover {
        border-bottom: 2px solid #663399;
      }
    }
    .card-item {
      margin-bottom: 0.5rem;
      .file-length {
        margin-left: 0.5rem;
      }
    }
    .card-footer {
      margin-top: 1rem;
      color: #999999;
      display: flex;
      .card-footer-item {
        margin-right: 0.7rem;
        .tag-value {
          color: #663399;
        }
      }
    }
    .card-footer + .card-footer {
      margin-top: 0.5rem;
    }
  }
}
</style>
