<template>
  <footer class="footer-c">
    <nuxt-link class="link" to="/about"><font-awesome-icon class="icon-left" :icon="icon.about"/>About BTZhai</nuxt-link>
  </footer>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
export default {
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      icon: {
        about: faAt
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-c {
  height: 3rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #6d6d6d;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  .link {
    display: inline;
    position: relative;
    padding: 0.5rem;
    transition: color 0.2s ease-in-out;
    &:before {
      left: 0;
      content: "";
      position: absolute;
      bottom: 0;
      width: 0;
      border-bottom: solid 2px;
      transition: width 0.2s ease-in-out;
    }
    &:hover {
      color: white;
      &::before {
        width: 100%;
      }
    }
  }
}
</style>
