<template>
  <div v-html="apply">
    {{ apply }}
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      apply: "",
    };
  },
  activated() {
    let from = this.$route.query.html;
    this.apply = from;
    this.$nextTick(() => {
      document.forms[0].submit();
    });
  },
};
</script>

<style scoped>
</style>