<template lang="pug">
.famupad-data
  .section
    .container

      h1.title Data

      // Tab menu
      .tabs
        ul
          li(:class="{'is-active': selectedSection==='departments'}")
            a(href="", @click.prevent="selectSection('departments')") Katedry
          li(:class="{'is-active': selectedSection==='projectTypes'}")
            a(href="", @click.prevent="selectSection('projectTypes')") Typy projektu
          li(:class="{'is-active': selectedSection==='excerciseTypes'}")
            a(href="", @click.prevent="selectSection('excerciseTypes')") Typy cvičení
          li(:class="{'is-active': selectedSection==='projectPositions'}")
            a(href="", @click.prevent="selectSection('projectPositions')") Pozice v projektech

      // Departments table
      .content(v-if="selectedSection === 'departments'")
        .content-top-buttons
          nuxt-link(to="/vytvorit/katedra").button.is-primary Vytvořit novou katedru
        table.table
          thead
            tr
              th Skratka
              th Název
              th Akce
          tbody
            tr(v-for="department in departments")
              td {{ department.acronym }}
              td {{ department.name }}
              td
                nuxt-link(:to="`/upravit/katedra/${department.id}`").button Upravit
                confirm-button(buttonText="Smazat", :proceedMethod="deleteDepartment", :proceedParameter="department.id") Určitě chcete úplně vymazat katedru? 

      // Project types
      .content(v-if="selectedSection === 'projectTypes'")
        .content-top-buttons
          nuxt-link(to="/vytvorit/typ-projektu").button.is-primary Vytvořit typ projektu
        table.table
          thead
            tr
              th Název
              th Akce
          tbody
            tr(v-for="projectType in projectTypes")
              td {{ projectType.name }}
              td
                nuxt-link(:to="`/upravit/typ-projektu/${projectType.id}`").button Upravit
                confirm-button(buttonText="Smazat", :proceedMethod="deleteProjectType", :proceedParameter="projectType.id") Určitě chcete úplně vymazat typ projektu? 

      // Excercise types
      .content(v-if="selectedSection === 'excerciseTypes'")
        .content-top-buttons
          nuxt-link(to="/vytvorit/typ-cviceni").button.is-primary Vytvořit typ cvičení
        table.table
          thead
            tr
              th Název
              th Akce
          tbody
            tr(v-for="projectExcercise in projectExcercises")
              td {{ projectExcercise.name }}
              td
                nuxt-link(:to="`/upravit/typ-cviceni/${projectExcercise.id}`").button Upravit
                confirm-button(buttonText="Smazat", :proceedMethod="deleteProjectExcercise", :proceedParameter="projectExcercise.id") Určitě chcete úplně vymazat typ cvičení? 

      // Project positions
      .content(v-if="selectedSection === 'projectPositions'")
        .content-top-buttons
          nuxt-link(to="/vytvorit/pozice-v-projektu").button.is-primary Vytvořit pozici v projektu
        table.table
          thead
            tr
              th Název
              th Akce
          tbody
            tr(v-for="projectPosition in projectPositions")
              td {{ projectPosition.name }}
              td
                nuxt-link(:to="`/upravit/pozice-v-projektu/${projectPosition.id}`").button Upravit
                confirm-button(buttonText="Smazat", :proceedMethod="deleteProjectPosition", :proceedParameter="projectPosition.id") Určitě chcete úplně vymazat pozici v projektu? 

</template>

<script>
import {getEntities, deleteEntities} from '@/api'

import ConfirmButton from '@/components/buttons/ConfirmButton'

export default {
  components: {
    ConfirmButton
  },
  methods: {
    selectSection (section) {
      this.$store.commit('viewSettings/set', {value: section, name: 'data.selectedSection'})
    },
    // Delete
    deleteDepartment (id) {
      deleteEntities('departments', [id])
        .then(r => {
          this.departments = this.departments.slice(0).filter(d => d.id !== id)
        })
    },
    deleteProjectType (id) {
      deleteEntities('projectTypes', [id])
        .then(r => {
          this.projectTypes = this.projectTypes.slice(0).filter(d => d.id !== id)
        })
    },
    deleteProjectExcercise (id) {
      deleteEntities('projectExcercises', [id])
        .then(r => {
          this.projectExcercises = this.projectExcercises.slice(0).filter(d => d.id !== id)
        })
    },
    deleteProjectPosition (id) {
      deleteEntities('projectPositions', [id])
        .then(r => {
          this.projectPositions = this.projectPositions.slice(0).filter(d => d.id !== id)
        })
    }
  },
  computed: {
    selectedSection () {
      if (this.$store.state.viewSettings.settings['data.selectedSection']) {
        return this.$store.state.viewSettings.settings['data.selectedSection']
      } else {
        return 'departments'
      }
    }
  },
  async asyncData () {
    const departments = await getEntities('departments')
    const projectPositions = await getEntities('projectPositions')
    const projectExcercises = await getEntities('projectExcercises')
    const projectTypes = await getEntities('projectTypes')

    return {
      departments,
      projectTypes,
      projectExcercises,
      projectPositions
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
