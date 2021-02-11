<style scoped>
.path {
  font-size: 15px;
  color: gray;
}
</style>

<template>
  <div class="my-3">
    <div v-for="(path, idx) in crumbs()" class="d-inline" v-bind:key="idx" v-on:click="list(idx)">
      <a class="path">{{path}}</a>
      <svg v-if="displayDivider(idx)" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="mx-1 bi bi-chevron-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  methods: {
    crumbs() {
      let path = this.$store.state.files.path.split('/');
      path = path.length > 1 ? ['Home', ...path.slice(0, path.length - 1)] : ['Home'];
      return path;
    },
    async list(idx) {
      const crumbs = this.crumbs();
      let path = '';
      if (idx > 0) path = crumbs.slice(1, idx + 1).join('/') + '/';
      await this.$store.dispatch('files/list', path);
    },
    displayDivider(idx) {
      const length = this.crumbs().length;
      return (idx !== 0 || length > 1) && (idx !== length - 1);
    },
  }
}
</script>
