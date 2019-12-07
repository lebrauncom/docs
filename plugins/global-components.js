import Vue from 'vue'
import BaleadaLogo from '~/components/global/BaleadaLogo.vue'
import CompositionArticle from '~/components/global/CompositionArticle.vue'
import IconArticle from '~/components/global/IconArticle.vue'
import LibraryArticle from '~/components/global/LibraryArticle.vue'
import SubclassArticle from '~/components/global/SubclassArticle.vue'

Vue.component('BaleadaLogo', (resolve, reject) => resolve(BaleadaLogo))
Vue.component('CompositionArticle', (resolve, reject) => resolve(CompositionArticle))
Vue.component('IconArticle', (resolve, reject) => resolve(IconArticle))
Vue.component('LibraryArticle', (resolve, reject) => resolve(LibraryArticle))
Vue.component('SubclassArticle', (resolve, reject) => resolve(SubclassArticle))
