import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BackgroundGlow from './components/BackgroundGlow.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import ProofStrip from './components/ProofStrip.vue'
import SpecterCaps from './components/SpecterCaps.vue'
import SiteFooter from './components/SiteFooter.vue'
import HairlineTurntable from './components/HairlineTurntable.vue'
import HairlineElevator from './components/HairlineElevator.vue'
import HairlineFigure from './components/HairlineFigure.vue'
import FigureCatalogue from './components/FigureCatalogue.vue'
import FileTree from './components/FileTree.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(BackgroundGlow),
      'home-hero-image': () => h(HairlineElevator),
      'layout-bottom': () => h(SiteFooter),
    })
  },
  enhanceApp({ app }: { app: any }) {
    app.component('HeroShowcase', HeroShowcase)
    app.component('ProofStrip', ProofStrip)
    app.component('SpecterCaps', SpecterCaps)
    app.component('BackgroundGlow', BackgroundGlow)
    app.component('SiteFooter', SiteFooter)
    app.component('HairlineElevator', HairlineElevator)
    app.component('HairlineTurntable', HairlineTurntable)
    app.component('HairlineFigure', HairlineFigure)
    app.component('FigureCatalogue', FigureCatalogue)
    app.component('FileTree', FileTree)
  },
}
