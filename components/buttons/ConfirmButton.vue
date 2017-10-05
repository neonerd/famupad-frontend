<template lang="pug">
  .confirm-button
    .modal(:class="{'is-active': isModalOpened}")
      .modal-background
      .modal-content
        .box
          slot
          .buttons
            button.button.is-secondary(@click.prevent="isModalOpened=false") Zpět
            button.button.is-primary(@click.prevent="proceed") Potvrdit
      .modal-close(@click.prevent="isModalOpened=false")
    button(@click.prevent="isModalOpened=true").button {{ buttonText }}
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    proceedMethod: {
      type: Function,
      required: true
    },
    proceedParameter: {
      required: true
    }
  },
  methods: {
    proceed () {
      this.proceedMethod(this.proceedParameter)
      this.isModalOpened = false
    }
  },
  data () {
    return {
      isModalOpened: false
    }
  }
}
</script>

<style scoped lang="scss">
.confirm-button {
  display: inline-block;
}
.box {
  text-align: center;
}
.buttons {
  padding-top: 20px;
  text-align: right;
}
</style>