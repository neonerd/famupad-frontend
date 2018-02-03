<template lang="pug">
  .section
    .container

      h1.title Nový projekt

      .content
        .columns.is-centered
          .column.is-half.is-narrow
            form(action="", method="post", @submit.prevent="submit")
              .field
                label.label Název
                .control
                  input(type="text", placeholder="Název projektu", required, v-model="project.name").input
              .field
                label.label Typ projektu
                .control
                  vue-select(:options="projectTypeOptions", v-model="project.project_type_id")
              .field
                label.label Typ cvičení
                .control
                  vue-select(:options="projectExcerciseOptions", v-model="project.project_excercise_id")
              .field
                label.label Stav
                .control
                  vue-select(:options="projectStateOptions", v-model="project.state")
              .field
                label.label Katedra vzniku
                .control
                  vue-select(:options="departmentOptions", v-model="project.department_id")
              .field
                label.label Rok vzniku
                .control
                  input(type="number", placeholder="Napr. 2016", required, v-model="project.year").input
              .field
                label.label Synopse
                .control
                  textarea(required, v-model="project.synopsis").textarea
              .field
                label.label Popis
                .control
                  textarea(required, v-model="project.description").textarea
              .field
                .control.has-text-centered
                  button(type="submit").button.is-primary Vytvořit projekt
</template>

<script>
import {createEntity, getEntities} from '@/api'
import {extractValuesFromOptions} from '@/lib/util'

import projectStateOptions from '@/assets/data/projectStateOptions'

export default {
  components: {
  },
  methods: {
    submit () {
      const payload = extractValuesFromOptions(['department_id', 'project_type_id', 'project_excercise_id', 'state'], this.project)

      createEntity('projects', payload)
        .then(result => {
          this.$router.push('/projekty')
        })
    }
  },
  computed: {
    departmentOptions () {
      return this.departments.map(d => ({label: `${d.acronym} - ${d.name}`, value: d.id}))
    },
    projectTypeOptions () {
      return this.projectTypes.map(d => ({label: `${d.name}`, value: d.id}))
    },
    projectExcerciseOptions () {
      return this.projectExcercises.map(d => ({label: `${d.name}`, value: d.id}))
    }
  },
  async asyncData () {
    const departments = await getEntities('departments')
    const projectTypes = await getEntities('projectTypes')
    const projectExcercises = await getEntities('projectExcercises')

    return {
      departments,
      projectStateOptions,
      projectTypes,
      projectExcercises,
      project: {
        name: '',
        department_id: null,
        project_type_id: null,
        project_excercise_id: null,
        state: projectStateOptions[0],
        year: '',
        synopsis: '',
        description: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
