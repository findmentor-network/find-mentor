import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faArrowRight,
  faQuestion,
  faList,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faTwitter,
  faGithub,
  faLinkedin,
  faArrowLeft,
  faArrowRight,
  faQuestion,
  faList
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
