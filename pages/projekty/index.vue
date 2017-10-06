<template lang="pug">
  .section
    .container

      h1.title Projekty

      .content-top-buttons.no-padding
          nuxt-link(to="/vytvorit/projekt").button.is-primary Vytvořit nový projekt

      .tabs
        ul
          li(v-for="projectType in mainFilters", :class="{'is-active': projectType.id == selectedMainFilter}")
            a(href="", @click.prevent="selectMainFilter(projectType.id)") {{ projectType.name }}

      template(v-if="viewType == 'tiles'")
        .columns
          .column.is-one-quarter(v-for="project in projects")
            .card.is-clickable(@click="goToProject(project.slug)")
              .card-image
                figure.image.is-16by9(style="background-image: url('\/\/img\.csfd\.cz\/files\/images\/film\/photos\/161\/466\/161466474_bfc141\.jpg\?w700')")
              .card-content
                .media
                  .media-content
                    p.title {{ project.name }}
                .content
                  p {{ project.synopsis }}


</template>

<script>
import {getEntities} from '@/api'

export default {
  components: {
  },
  mounted () {
    this.loadProjects()
  },
  computed: {
    mainFilters () {
      return [{id: 0, name: 'Všechno'}].concat(this.projectTypes)
    },
    selectedMainFilter () {
      if (this.$store.state.viewSettings.settings['projects.selectedMainFilter']) {
        return this.$store.state.viewSettings.settings['projects.selectedMainFilter']
      } else {
        return 0
      }
    }
  },
  methods: {
    loadProjects () {
      const parameters = {}
      if (this.$store.state.viewSettings.settings['projects.selectedMainFilter'] !== 0) {
        parameters.projectTypeId = this.$store.state.viewSettings.settings['projects.selectedMainFilter']
      }
      getEntities('projects', parameters).then(projects => {
        this.projects = projects
      })
    },
    goToProject (slug) {
      this.$router.push('/projekty/' + slug)
    },
    selectMainFilter (id) {
      this.$store.commit('viewSettings/set', {value: id, name: 'projects.selectedMainFilter'})
      this.loadProjects()
    }
  },
  async asyncData () {
    const projectTypes = await getEntities('projectTypes')

    return {
      projectTypes,
      viewType: 'tiles',
      projects: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
