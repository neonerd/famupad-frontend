<template lang="pug">
  .modal(:class="{'is-active': isActive}")
    .modal-background(@click="close")
    .modal-content
      slot
    button.modal-close(@click="close")
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>