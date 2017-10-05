<template lang="pug">
  .section
    .container

      h1.title Nová katedra

      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Zkratka
                .control
                  input(type="text", placeholder="Zkratka katedry (napr.: KR, KSD)", required, v-model="department.acronym").input
              .field
                label.label Název
                .control
                  input(type="text", placeholder="Název katedry (napr.: Katedra režie)", required, v-model="department.name").input
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit katedru
</template>

<script>
import {createEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      createEntity('departments', this.department)
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  data () {
    return {
      department: {
        acronym: '',
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
