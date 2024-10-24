import { boot } from 'quasar/wrappers'
import { createPinia, setActivePinia } from 'pinia'

export default boot(({ app }) => {
    const pinia = createPinia()
    setActivePinia(pinia)

    app.use(pinia).mount('q-app')
})
