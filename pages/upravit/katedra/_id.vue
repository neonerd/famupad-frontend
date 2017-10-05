<template lang="pug">
  .section
    .container
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
                  button(type="submit").button.is-primary Upravit katedru
</template>

<script>
import {omit} from 'ramda'
import {updateEntity, fetchEntity} from '@/api'

export default {
  components: {
  },
  methods: {
    submit () {
      updateEntity('departments', this.department.id, omit(['id'], this.department))
        .then(result => {
          this.$router.push('/data')
        })
    }
  },
  async asyncData ({params}) {
    const department = await fetchEntity('departments', params.id)

    return {
      department
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
