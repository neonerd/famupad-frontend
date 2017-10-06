<template lang="pug">
  .section
    .container(v-if="person")
      h1.title {{ person.firstName }} {{ person.lastName }}

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

  methods: {
  },

  async asyncData ({params}) {
    return {
      slug: params.slug,
      person: null
    }
  }

}
</script>