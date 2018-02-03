import Vue from 'vue'
import VueSelect from 'vue-select'

import projectStateOptions from '@/assets/data/projectStateOptions'

Vue.component('vue-select', VueSelect)

Vue.filter('positionToAcronym', (val) => {
  if (val === 'Režisér') return 'rež.'
  if (val === 'Scenárista') return 'sce.'
  return ''
})

Vue.filter('booleanToString', val => val ? 'Ano' : 'Ne')

Vue.filter('projectStateToString', val => projectStateOptions.filter(ps => ps.value === val)[0].label)
