<template lang="pug">
  .section
    .container
      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Název
                .control
                  input(type="text", placeholder="Název pozice (napr.: Režisér)", required, v-model="projectPosition.name").input
              .field
                label.label Priorita
                .control
                  input(type="number", placeholder="Priorita pozice v řazení (vzestupně)", required, v-model="projectPosition.priority").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit pozici v projektu
</template>

<script>
import {createEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      createEntity('projectPositions', this.projectPosition)
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  data () {
    return {
      projectPosition: {
        name: '',
        priority: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
