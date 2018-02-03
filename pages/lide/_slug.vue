<template lang="pug">
  .section
    .container(v-if="person").famupad-project

      nuxt-link(:to="`/upravit/osoba/${person.id}`").is-pulled-right
        button.button.is-primary(v-show="isAdmin") Upravit osobu
      h1.title {{ person.firstName }} {{ person.lastName }}

      .columns
        // Person Info
        .column
          h2 Informace
          table.table
            tr
              td Rok nástupu
              td {{ person.enrolledAt }}
            tr
              td Studuje?
              td {{ person.isActiveStudent | booleanToString }}
            tr
              td Telefon
              td {{ person.phone }}
            tr
              td Email
              td {{ person.email }}
            tr
              td Web
              td
                a(:href="person.urlWeb", v-if="person.urlWeb", target="_blank") {{ person.urlWeb }}
                span(v-else) Není
            tr
              td Facebook
              td
                a(:href="person.urlFacebook", v-if="person.urlFacebook", target="_blank") {{ person.urlFacebook }}
                span(v-else) Není
        .column
          h2 O mně
          p {{ person.description }}

      .columns
        // People
        .column
          .level
            .level-left
              .level-item
                h2 Projekty
          table.table
            thead
              tr
                th Název projektu
                th Rok vzniku
                th Typ / Cvičení
                th Stav
            tbody
              tr(v-for="project in person.projects", @click="goToProject(project.slug)").is-clickable
                td {{ project.name }}
                td {{ project.year }}
                td {{ project.projectTypeName }} - {{ project.projectExcerciseName }}
                td {{ project.state | projectStateToString }}

</template>

<script>
import {fetchEntity} from '@/api'

export default {

  created () {
  },

  mounted () {
    fetchEntity('people', this.slug)
      .then(person => {
        this.person = person
      })
  },

  computed: {
    isAdmin () {
      return this.$store.getters['auth/isAdmin']
    }
  },

  methods: {
    goToProject (slug) {
      this.$router.push('/projekty/' + slug)
    }
  },

  async asyncData ({params}) {
    return {
      slug: params.slug,
      person: null
    }
  }

}
</script>