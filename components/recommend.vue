<template>
  <div class="mod-item-c">
    <h3><font-awesome-icon class="title-icon" :icon="isRandom? icon.random : icon.hot"/>{{ isRandom ? "I'm Feeling Lucky" : 'Recently Hot' }}</h3><font-awesome-icon v-if="isRandom" @click="onRefreshClick" :class="iconClass" :icon="iconSync"/>
    <div class="rec-c">
      <div v-for="(item,index) in data" :key="index" class="rec-item">
        <a class="rec-a" @click="onClickKeyword(item)">{{ isRandom ? item.name: item.value }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSync, faFire, faRandom } from '@fortawesome/free-solid-svg-icons'
export default {
  props: ['isRandom', 'data'],
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      iconSync: faSync,
      iconClass: {
        refresh: 'refresh'
      },
      icon: {
        hot: faFire,
        random: faRandom
      }
    }
  },
  methods: {
    onRefreshClick () {
      this.iconClass = `refresh anime`
      this.getRandomTorrent()
    },
    getRandomTorrent () {
      this.$axios
        .get(`${process.env.baseUrl}/random`)
        .then(res => {
          const { data } = res
          if (data.code != 200) {
            this.$nuxt.error({ statusCode: data.code, message: data.msg })
          } else {
            this.iconClass = `refresh`
            this.$emit('randomRefresh', data.data)
          }
        })
        .catch(e => {
          this.$nuxt.error({ statusCode: e.statusCode, message: e.message })
        })
    },
    onClickKeyword (item) {
      if (this.isRandom) {
        this.$store.commit('set', item)
        this.$router.push('resultDetail')
      } else {
        this.$router.push(`resultList/${item.value}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-item-c {
  text-align: left;
  margin-bottom: 1rem;
  .title-icon {
    margin-right: 0.5rem;
  }
  h3 {
    display: inline;
    font-size: 1.3rem;
    padding-left: 0.6rem;
    font-weight: 600;
    color: #f32779;
  }
  .refresh {
    color: #f32779;
    margin-left: 0.8rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.8, 1.8);
    }
  }
  .rec-c {
    padding: 1rem 0;
    .rec-item {
      border: 1px solid #d6608f;
      color: #d6608f;
      margin-bottom: 0.5rem;
      display: inline-block;
      border-radius: 0.8rem;
      margin-left: 0.8rem;
      &:hover {
        background-color: #d6608f;
        color: white;
      }
      &:active {
        background-color: darken(#d6608f, 10%);
        color: white;
      }
      a {
        padding: 0.5rem 0.8rem;
      }
    }
  }
  .anime {
    animation: spin 0.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
