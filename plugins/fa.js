import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub, faLinkedin, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {
    faArrowLeft,
    faArrowRight,
    faQuestion,
    faList,
    faSearch,
    faUserPlus,
    faBriefcase,
    faPaperPlane,
    faClock,
    faTimes,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faTwitter,
    faGithub,
    faLinkedin,
    faYoutube,
    faArrowLeft,
    faArrowRight,
    faQuestion,
    faList,
    faSearch,
    faDiscord,
    faUserPlus,
    faBriefcase,
    faPaperPlane,
    faClock,
    faTimes,
    faTimesCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)