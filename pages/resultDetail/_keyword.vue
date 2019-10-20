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
      <div class="detail-c">
        <h1 class="torrent-name">{{ data.name }}</h1>
        <div class="introduction module">
          <h2 class="subtitle"><font-awesome-icon class="icon-left" :icon="icon.list"/>Introduction Of Seed</h2>
          <div class="introduction-item">
            <span class="label">CreateTime: </span><span>{{ data.create_time | dateFormat }}</span>
          </div>
          <div class="introduction-item">
            <span class="label">Popularity: </span><span>{{ data.popularity }}</span>
          </div>
          <div class="introduction-item">
            <span class="label">Files Count: </span><span>{{ data.files.length }}</span>
          </div>
          <div class="introduction-item">
            <span class="label">Size: </span><span>{{ data.length | byteToCommon }}</span>
          </div>
        </div>
        <div class="magnet-link-c module">
          <h2 class="subtitle"><font-awesome-icon class="icon-left" :icon="icon.magnet"/>MagnetLink</h2>
          <a class="magnet-link" :href="`magnet:?xt=urn:btih:${data.id}`">{{ `magnet:?xt=urn:btih:${data.id}` }}</a>
        </div>
        <div class="files-list module">
          <h2 class="subtitle"><font-awesome-icon class="icon-left" :icon="icon.files"/>Included Files</h2>
          <div class="file-item-c">
            <div v-for="(file,index) in data.files" :key="index" class="file-item">
              <span>{{ file.path }}</span>
              <span class="tag">{{ file.length | byteToCommon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faMagnet,
  faFileArchive,
  faListUl
} from '@fortawesome/free-solid-svg-icons'
export default {
  layout: 'main',
  async asyncData ({ params, store }) {
    return {
      keyword: params.keyword,
      data: store.state.data
    }
  },
  data () {
    return {
      keyword: '',
      data: {},
      icon: {
        search: faSearch,
        magnet: faMagnet,
        list: faListUl,
        files: faFileArchive
      }
    }
  },
  methods: {
    search () {
      if (this.keyword) {
        this.$router.push(`/resultList/${this.keyword}`)
      }
    }
  },
  components: {
    FontAwesomeIcon
  },
  head () {
    return {
      title: this.data.name
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
  .search-c {
    display: flex;
    .search-input {
      width: 90%;
      border: 1.8px solid;
      padding: 0 0.5rem;
      color: #999999;
      border-image: linear-gradient(to right, #720ee3, #f32779) 1.8 1.8;
    }
  }
  .detail-c {
    margin-top: 3rem;
    h1.torrent-name {
      font-weight: 600;
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    .module {
      margin-bottom: 2rem;
      h2.subtitle {
        margin-bottom: 1rem;
        color: #f32779;
        font-weight: 600;
        font-size: 1.2rem;
      }
    }
    .magnet-link-c {
      .magnet-link {
        font-weight: 500;
        color: #663399;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .introduction {
      .introduction-item {
        margin-bottom: 0.5rem;
        .label {
          font-weight: 600;
        }
      }
    }
    .files-list {
      .file-item-c {
        height: 25rem;
        overflow-y: auto;
        .file-item {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
