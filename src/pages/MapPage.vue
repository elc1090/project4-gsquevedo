<template>
  <nav-bar/>
  <div>
    <l-map/>
  </div>
  <footer-page/>
</template>

<script>
import LMap from '@/components/LMap.vue';
import NavBar from '@/components/NavBar.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  components: {
    LMap,
    NavBar,
    FooterPage
  }
}
</script>
