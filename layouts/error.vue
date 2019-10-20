<template>
  <section class="error-c">
    <div class="error-img-c">
      <img class="error-img" src="~/static/imgs/404.gif" alt="404.gif"/>
    </div>
    <div>
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <p class="error-msg">{{ error.message }}</p>
      <button class="button-red-small" @click="$router.push('/')">Home</button>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: 'Error!'
    }
  }
}
</script>

<style lang="scss" scoped>
.error-c {
  text-align: center;
  margin-top: 10vh;
  .error-img-c {
    margin-bottom: 2rem;
    .error-img {
      border-radius: 3rem;
      box-shadow: 1px 1px 10px #888888;
    }
  }
  .error-code {
    font-size: 3rem;
    color: #f32779;
    margin-bottom: 1rem;
  }
  .error-msg {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
}
</style>
