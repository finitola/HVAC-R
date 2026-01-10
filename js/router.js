import { HomePage } from './pages/home.js'
import { SystemsPage } from './pages/systems.js'
import { ComponentsPage } from './pages/components.js'
import { RefrigerantsPage } from './pages/refrigerants.js'
import { ElectronicsPage } from './pages/electronics.js'
import { HVACRLicensePage } from './pages/hvacrlicense.js'
import { HVACRLicenseTestPage } from './pages/hvacrlicensetest.js'
import { HVACRLicenseInfo } from './pages/hvacrlicenseinfo.js'
import { HVACRCalculationPage } from './pages/hvacrcalculation.js'
import { HVACRService } from './pages/hvacrservice.js'

const routes = {
	home: HomePage,
	systems: SystemsPage,
	components: ComponentsPage,
	refrigerants: RefrigerantsPage,
	electronics: ElectronicsPage,
	hvacrlicense: HVACRLicensePage,
	hvacrlicensetest: HVACRLicenseTestPage,
	hvacrlicenseinfo: HVACRLicenseInfo,
	hvacrcalculation: HVACRCalculationPage,
	hvacrservice: HVACRService,
}

const pageTitles = {
	home: 'HVAC/R - ინჟინერია',
	systems: 'HVAC/R - სისტემები',
	components: 'HVAC/R - კომპონენტები',
	refrigerants: 'მაცივარაგენტები',
	electronics: 'ელექტროობა',
	hvacrlicense: 'HVAC/R - ტესტები (სასწავლო რეჟიმი)',
	hvacrlicensetest: 'HVAC/R - საგამოცდო ტესტი',
	hvacrlicenseinfo: 'HVAC/R - საგამოცდო ტესტების ძირითადი ინფორმაცია',
	hvacrcalculation: 'HVAC/R - კალკულაციები',
	hvacrservice: 'HVAC/R - სერვისი',
}

export function router() {
	const route = window.location.hash.slice(1) || 'home'

	document.title = pageTitles[route] || 'HVAC/R'

	const page = routes[route] || HomePage

	document.getElementById('app').innerHTML = page()

	window.scrollTo(0, 0)
}

window.addEventListener('hashchange', router)

window.addEventListener('load', router)
