import { router } from './router.js'

// პირველ ჩატვირთვაზე
router()

// Back / Forward მუშაობა
window.addEventListener('popstate', router)
