<template lang="pug">
  .section
    .container

      h1.title Lidé

      .content-top-buttons.no-padding
          nuxt-link(to="/vytvorit/osoba").button.is-primary Vytvořit novou osobu
      .tabs
        ul
          li(v-for="department in mainFilters", :class="{'is-active': department.id == selectedMainFilter}")
            a(href="", @click.prevent="selectMainFilter(department.id)") {{ department.acronym }}

      .content
        table.table.with-clickable-rows
          thead
            tr
              th Příjmení a jméno
              th Katedra
              th Rok nástupu
              th Počet projektu
          tbody
            tr(v-for="person in people", @click="goToPerson(person.slug)")
              td {{ person.lastName }}, {{ person.firstName }}
              td {{ person.departmentAcronym }}
              td {{ person.enrolledAt }}
              td 0 / 0 / 0

</template>

<script>
import {getEntities} from '@/api'

export default {
  components: {
  },
  computed: {
    mainFilters () {
      return [{id: 0, acronym: 'Všichni'}].concat(this.departments)
    },
    selectedMainFilter () {
      if (this.$store.state.viewSettings.settings['people.selectedMainFilter']) {
        return this.$store.state.viewSettings.settings['people.selectedMainFilter']
      } else {
        return 0
      }
    }
  },
  methods: {
    reloadPeople () {
      const parameters = {}
      if (this.$store.state.viewSettings.settings['people.selectedMainFilter'] !== 0) {
        parameters.departmentId = this.$store.state.viewSettings.settings['people.selectedMainFilter']
      }
      getEntities('people', parameters).then(people => {
        this.people = people
      })
    },
    goToPerson (slug) {
      this.$router.push(`/lide/${slug}`)
    },
    selectMainFilter (id) {
      this.$store.commit('viewSettings/set', {value: id, name: 'people.selectedMainFilter'})
      this.reloadPeople()
    }
  },
  async asyncData () {
    const departments = await getEntities('departments')
    const people = await getEntities('people')
    return {
      people,
      departments
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
