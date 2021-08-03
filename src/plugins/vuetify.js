import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.cyan.darken1,
        secondary: colors.cyan.lighten3,
        accent: colors.cyan.accent3
      }
    }
  }
})
