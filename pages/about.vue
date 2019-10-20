<template>
  <div class="about-c">
    <div class="left-c">
      <img width="100%" height="100%" src="~/static/imgs/about.jpg" alt="about.jpg"/>
    </div>
    <div class="right-c">
      <div class="p-c">
        <h1 class="about-title">About BTZhai</h1>
        <p>BTZhai I did about two things: one, using Bthub as a source, duplicated more than 30 million seed data; the other, using Elastic Search as a full-text index instead of Sphinx.</p>
      </div>
      <div class="p-c">
        <h2 class="about-title">Stack</h2>
        <p>ElasticSearch NuxtJS SpringBoot</p>
      </div>
      <div class="p-c">
        <h2 class="about-title">Reminder</h2>
        <p>If there is any infringement, please contact the administrator for deletion</p>
        <p>Please comply with the relevant laws of your country and do not download illegal documents</p>
      </div>
      <div class="p-c">
        <h2 class="about-title">Contact</h2>
        <p>Email: zhaoritian07@hotmail.com</p>
        <p>skype: nuttertools07 (WithCancer)</p>
      </div>
      <button @click="$router.push('/')" class="button-red-small"><nuxt-link to="/">Home</nuxt-link></button>
    </div>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'About BTZhai'
    }
  }
}
</script>

<style lang="scss" scoped>
.about-c {
  display: flex;
  justify-content: center;
  padding: 5vh 1vw;
  .right-c {
    margin-top: 5vh;
    .p-c {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
      .about-title {
        font-weight: 800;
        margin-bottom: 1rem;
        font-size: 2rem;
        color: #f32779;
      }
    }
  }
}
</style>
