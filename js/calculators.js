/* ===============================
   1. BTU CALCULATOR
================================ */
window.calculateBTU = function () {
	const area = parseFloat(document.getElementById('btu-area').value)
	const height = parseFloat(document.getElementById('btu-height').value)
	const factor = parseFloat(document.getElementById('btu-factor').value)

	const resultBox = document.getElementById('btu-result')
	const resultText = document.getElementById('btu-result-text')

	if (!area || !height) {
		alert('გთხოვთ შეავსოთ ფართობი და სიმაღლე!')
		return
	}

	const volume = area * height
	const watts = volume * factor
	const btu = watts * 3.412

	let recommendation = ''
	let alertColor = 'var(--color-text)'

	if (btu <= 9500) {
		recommendation = '9 000 BTU (20-25 მ²)'
	} else if (btu <= 14000) {
		recommendation = '12 000 BTU (30-35 მ²)'
	} else if (btu <= 20000) {
		recommendation = '18 000 BTU (45-55 მ²)'
	} else if (btu <= 26000) {
		recommendation = '24 000 BTU (60-70 მ²)'
	} else if (btu <= 32000) {
		recommendation = '30 000 BTU (75-85 მ²)'
	} else if (btu <= 40000) {
		recommendation = '36 000 BTU (90-110 მ² - კოლონიური/არხული)'
	} else if (btu <= 52000) {
		recommendation = '48 000 BTU (120-140 მ² - კოლონიური/არხული)'
	} else if (btu <= 65000) {
		recommendation = '60 000 BTU (150-170 მ² - კოლონიური/არხული)'
	} else {
		recommendation =
			'⚠️ სიმძლავრე ძალიან დიდია ერთი აგრეგატისთვის! საჭიროა რამდენიმე ბლოკი ან VRF სისტემა.'
		alertColor = 'var(--color-danger)'
	}

	resultText.innerHTML = `
        საჭირო სიმძლავრე: <br>
        <strong style="font-size: 1.4em; color: var(--color-primary)">${Math.round(
					btu,
				).toLocaleString()} BTU/h</strong>
        <br>
        <span style="font-size: 0.9em; color: var(--color-text-muted)">
            (~${(watts / 1000).toFixed(2)} kW)
        </span>
        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--color-border-accent);">
        <div style="color: ${alertColor}; font-size: 0.95rem;">
            რეკომენდაცია:<br>
            <strong>${recommendation}</strong>
        </div>
    `
	resultBox.classList.add('show')
}

/* ===============================
   2. P-T Calculator (Danfoss) — R410A / R32 / R22 ONLY
   Supports: BAR(g), PSI(g)
   R410A: dew/bubble selectable
================================ */
;(function () {
	const refIdMap = {
		R410A: 'r410a',
		R32: 'r32',
		R22: 'r22',
	}

	// მარტივი cache: key -> temp
	const ptCache = new Map()

	// debounce ტაიმერი
	let ptTimer = null

	function normalizeUnit(unit) {
		// HTML-ში BAR/PSI, ზოგჯერ Bar/PSI შეიძლება
		const u = String(unit || '').toUpperCase()
		return u === 'PSI' ? 'psi' : 'bar'
	}

	function getPhaseForUI(ref) {
		// R410A-ზე dew/bubble აქვს აზრი
		if (ref !== 'R410A') return 'dew'
		const phaseEl = document.getElementById('pt-phase')
		return phaseEl ? phaseEl.value : 'dew'
	}

	function togglePhaseUI(ref) {
		const wrap = document.getElementById('pt-phase-wrap')
		if (!wrap) return
		wrap.style.display = ref === 'R410A' ? 'block' : 'none'
	}

	async function fetchSaturationTempDanfoss({ ref, pressure, unit, phase }) {
		const refId = refIdMap[ref]
		if (!refId) return null

		const pressureUnit = normalizeUnit(unit)

		// cache key (დავრგვალოთ წნევა 2 ათწილადზე, რომ cache რეალისტური იყოს)
		const pKey = Math.round(pressure * 100) / 100
		const cacheKey = `${ref}|${pressureUnit}|${phase}|${pKey}`
		if (ptCache.has(cacheKey)) return ptCache.get(cacheKey)

		const body = {
			pressure: String(pKey),
			refId,
			temperatureUnit: 'celsius',
			pressureUnit, // 'bar' ან 'psi'
			pressureReferencePoint: 'gauge', // შენს UI-ს ემთხვევა
			pressureCalculationPoint: phase, // 'dew' ან 'bubble'
			gaugeType: 'dry',
			altitudeInMeter: 0,
		}

		try {
			const res = await fetch(
				`https://reftools.danfoss.com/api/ref-slider/temperature?refId=${refId}`,
				{
					method: 'POST',
					headers: { 'content-type': 'application/json; charset=utf-8' },
					body: JSON.stringify(body),
				},
			)

			if (!res.ok) return null

			// API ზოგჯერ plain text number აბრუნებს
			const txt = await res.text()
			const t = parseFloat(txt)

			if (!Number.isFinite(t)) return null

			ptCache.set(cacheKey, t)
			return t
		} catch (e) {
			return null
		}
	}

	// ეს არის შენი UI-დან დასაძახებელი მთავარი ფუნქცია
	window.calculatePTChart = function () {
		const refEl = document.getElementById('pt-ref')
		const pressEl = document.getElementById('pt-press')
		const unitEl = document.getElementById('pt-unit')
		const display = document.getElementById('pt-display')

		if (!refEl || !pressEl || !unitEl || !display) return

		const ref = refEl.value
		togglePhaseUI(ref)

		const press = parseFloat(pressEl.value)
		const unit = unitEl.value
		const phase = getPhaseForUI(ref)

		if (Number.isNaN(press)) {
			display.innerHTML = '--- °C'
			return
		}

		// debounce: აკრეფის დროს არ გავუშვათ ათჯერ fetch
		if (ptTimer) clearTimeout(ptTimer)
		ptTimer = setTimeout(async () => {
			display.innerHTML = '...'

			const temp = await fetchSaturationTempDanfoss({
				ref,
				pressure: press,
				unit,
				phase,
			})

			if (temp !== null) {
				display.innerHTML = `${temp.toFixed(1)} °C`
			} else {
				display.innerHTML = 'Error'
			}
		}, 250)
	}

	// პირველად ჩატვირთვაზე UI გაასწორე
	document.addEventListener('DOMContentLoaded', () => {
		const refEl = document.getElementById('pt-ref')
		if (refEl) togglePhaseUI(refEl.value)
	})
})()

/* ===============================
   3. UNIT CONVERTER
================================ */
window.convertUnits = function () {
	const value = parseFloat(document.getElementById('conv-input').value)
	const type = document.getElementById('conv-type').value
	const resultDisplay = document.getElementById('conv-result-display')

	if (isNaN(value)) {
		resultDisplay.textContent = '---'
		return
	}

	let result = 0
	let unitLabel = ''

	switch (type) {
		case 'c_to_f':
			result = (value * 9) / 5 + 32
			unitLabel = '°F'
			break
		case 'f_to_c':
			result = ((value - 32) * 5) / 9
			unitLabel = '°C'
			break
		case 'bar_to_psi':
			result = value * 14.5038
			unitLabel = 'PSI'
			break
		case 'psi_to_bar':
			result = value / 14.5038
			unitLabel = 'Bar'
			break
		case 'kw_to_btu':
			result = value * 3412.14
			unitLabel = 'BTU/h'
			break
		case 'btu_to_kw':
			result = value / 3412.14
			unitLabel = 'kW'
			break
	}

	resultDisplay.innerHTML = `${result.toFixed(2)} <small>${unitLabel}</small>`
}

/* ===============================
   4. REFRIGERANT CHARGE 
================================ */
window.toggleRefCustomInput = function () {
	const selectVal = document.getElementById('ref-pipe-select').value
	const customContainer = document.getElementById('ref-custom-container')

	if (selectVal === 'custom') {
		customContainer.style.display = 'block'
	} else {
		customContainer.style.display = 'none'
	}
}

window.calculateRefCharge = function () {
	const totalLen = parseFloat(document.getElementById('ref-total-len').value)
	const baseLen = parseFloat(document.getElementById('ref-base-len').value)
	const selectVal = document.getElementById('ref-pipe-select').value

	const resultBox = document.getElementById('ref-result')
	const resultText = document.getElementById('ref-result-text')

	if (!totalLen || !baseLen) {
		alert('შეავსეთ სიგრძეები!')
		return
	}

	let factor = 0
	if (selectVal === 'custom') {
		factor = parseFloat(document.getElementById('ref-custom-val').value)
		if (!factor) {
			alert('მიუთითეთ დამატების კოეფიციენტი (გრამი/მეტრზე)!')
			return
		}
	} else {
		factor = parseFloat(selectVal)
	}

	if (totalLen <= baseLen) {
		resultText.innerHTML = `<span style="color: var(--color-success)">დამატება არ არის საჭირო</span> <br> <small>(ტრასა ქარხნულ ლიმიტშია)</small>`
		resultBox.classList.add('show')
		return
	}

	// კალკულაცია
	const diff = totalLen - baseLen
	const addGram = diff * factor

	resultText.innerHTML = `
        დასამატებელია: <br>
        <strong style="font-size: 1.4em; color: var(--color-primary)">${Math.round(
					addGram,
				)} გრამი</strong>
        <br>
        <span style="font-size: 0.9em; color: var(--color-text-muted)">
            (${diff} მ x ${factor} გ/მ)
        </span>
    `
	resultBox.classList.add('show')
}

/* ===============================
   5. VOLTAGE DROP
================================ */
window.calculateVoltageDrop = function () {
	const volt = parseFloat(document.getElementById('vd-volt').value)
	const amps = parseFloat(document.getElementById('vd-amps').value)
	const dist = parseFloat(document.getElementById('vd-dist').value)
	const size = parseFloat(document.getElementById('vd-size').value)
	const mat = document.getElementById('vd-mat').value

	const resultBox = document.getElementById('vd-result')
	const resultText = document.getElementById('vd-result-text')

	if (!volt || !amps || !dist) {
		alert('შეავსეთ მონაცემები!')
		return
	}

	const rho = mat === 'cu' ? 0.0175 : 0.028
	const vDrop = (2 * dist * amps * rho) / size
	const vEnd = volt - vDrop
	const percentDrop = (vDrop / volt) * 100

	let color = 'var(--color-success)'
	let msg = 'ნორმაშია (< 3%)'

	if (percentDrop > 5) {
		color = 'var(--color-danger)'
		msg = 'კრიტიკულია! (> 5%)'
	} else if (percentDrop > 3) {
		color = 'var(--color-warning)'
		msg = 'საზღვარზეა (3-5%)'
	}

	resultText.innerHTML = `
        ვარდნა: <strong style="font-size: 1.2em; color: ${color}">${vDrop.toFixed(
					2,
				)} V</strong> (${percentDrop.toFixed(1)}%)
        <br>
        ბოლოში მივა: <strong>${vEnd.toFixed(1)} V</strong>
        <hr style="margin: 5px 0; opacity: 0.5;">
        <small style="color: ${color}">${msg}</small>
    `
	resultBox.classList.add('show')
}

/* ===============================
   6. SUPERHEAT / SUBCOOLING (Simplfied & Moved to End)
================================ */
window.calculateDiagnosis = function () {
	const mode = document.querySelector('input[name="diag-mode"]:checked').value
	// ახლა მხოლოდ ტემპერატურას ვითხოვთ (წნევა ამოღებულია)
	const satTemp = parseFloat(document.getElementById('diag-sat').value)
	const lineTemp = parseFloat(document.getElementById('diag-line').value)

	const resultBox = document.getElementById('diag-result')
	const resultText = document.getElementById('diag-result-text')

	if (isNaN(satTemp) || isNaN(lineTemp)) {
		alert('გთხოვთ შეავსოთ ორივე ტემპერატურა!')
		return
	}

	let diff = 0
	let title = ''
	let explanation = ''
	let color = 'var(--color-text)'

	if (mode === 'sh') {
		diff = lineTemp - satTemp
		title = 'Superheat (გადამეტხურება)'

		if (diff < 4) {
			explanation = 'დაბალია! (სითხის დაბრუნების რისკი)'
			color = 'var(--color-danger)'
		} else if (diff > 12) {
			explanation = 'მაღალია! (ფრეონის ნაკლებობა ან დაბინძურება)'
			color = 'var(--color-warning)'
		} else {
			explanation = 'ნორმალურია (ეფექტური მუშაობა)'
			color = 'var(--color-success)'
		}
	} else {
		diff = satTemp - lineTemp
		title = 'Subcooling (გადამეტცივება)'

		if (diff < 2) {
			explanation = 'დაბალია! (ფრეონის ნაკლებობა)'
			color = 'var(--color-warning)'
		} else if (diff > 10) {
			explanation = 'მაღალია! (შესაძლოა გადატვირთვა)'
			color = 'var(--color-info)'
		} else {
			explanation = 'ნორმალურია'
			color = 'var(--color-success)'
		}
	}

	resultText.innerHTML = `
        ${title}: <strong style="font-size: 1.4em;">${diff.toFixed(
					1,
				)} °C</strong> <br>
        <span style="color: ${color}; font-weight: bold;">${explanation}</span>
    `
	resultBox.classList.add('show')
}

/* ===============================
   7. CONDENSATE RATE CALCULATOR (WITH RECOMMENDATIONS)
================================ */
window.calculateCondensate = function () {
	const btu = parseFloat(document.getElementById('cond-btu').value)
	const humidityFactor = parseFloat(
		document.getElementById('cond-humidity').value,
	)

	const resultBox = document.getElementById('cond-result')
	const resultText = document.getElementById('cond-result-text')

	if (!btu) {
		alert('შეიყვანეთ სიმძლავრე!')
		return
	}

	// 1. BTU -> kW
	const kw = btu / 3412

	// 2. წყლის რაოდენობა (ლ/სთ)
	const litersPerHour = kw * humidityFactor

	// 3. რეკომენდაციების ლოგიკა
	let pipeRecommendation = ''
	let pumpRecommendation = ''

	// მილის დიამეტრი
	if (litersPerHour < 10) {
		pipeRecommendation = 'Ø16მმ (სტანდარტული გოფრე)'
	} else if (litersPerHour >= 10 && litersPerHour < 20) {
		pipeRecommendation = 'Ø20მმ (მყარი მილი / PVC)'
	} else {
		pipeRecommendation = 'Ø25მმ - Ø32მმ (მაგისტრალური)'
	}

	// ტუმბოს შერჩევა (Safety Factor x3)
	// ბაზარზე მინიმუმი არის ხოლმე 10-12 ლ/სთ
	let minPumpCapacity = Math.ceil(litersPerHour * 3)
	if (minPumpCapacity < 10) minPumpCapacity = 10

	pumpRecommendation = `მინ. ${minPumpCapacity} ლ/სთ (Silent Type)`

	// 4. შედეგის ვიზუალიზაცია
	resultText.innerHTML = `
        კონდენსატი: <strong style="font-size: 1.4em; color: var(--color-info)">${litersPerHour.toFixed(
					2,
				)} ლ/სთ</strong>
        <br>
        <span style="font-size: 0.9em; color: var(--color-text-muted)">
            (დატვირთვა: ${kw.toFixed(1)} kW)
        </span>

        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--color-border-accent);">

        <div style="text-align: left; background: var(--color-bg); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
            <strong style="color: var(--color-primary); font-size: 0.95rem;">🛠 რეკომენდაცია:</strong>
            <ul style="margin: 5px 0 0 15px; padding-left: 10px; font-size: 0.9rem; list-style-type: disc;">
                <li style="margin-bottom: 4px;">მილი: <strong>${pipeRecommendation}</strong></li>
                <li>ტუმბო: <strong>${pumpRecommendation}</strong></li>
            </ul>
            <div style="margin-top: 8px; font-size: 0.8rem; color: var(--color-text-muted); font-style: italic;">
                💡 რჩევა: თვითდინებისას დაიცავით დახრა (1სმ / 1 მეტრზე).
            </div>
        </div>
    `
	resultBox.classList.add('show')
}

/* ===============================
   8. ROI / ENERGY SAVINGS
================================ */
window.calculateROI = function () {
	const btu = parseFloat(document.getElementById('roi-btu').value)
	const hours = parseFloat(document.getElementById('roi-hours').value)
	const tariff = parseFloat(document.getElementById('roi-tariff').value)

	// ფიქსირებული კოეფიციენტები შედარებისთვის
	const copOnOff = 2.8 // სტანდარტული On/Off
	const copInverter = 3.6 // კარგი Inverter (A++)

	const resultBox = document.getElementById('roi-result')
	const resultText = document.getElementById('roi-result-text')

	if (!btu || !hours || !tariff) {
		alert('შეავსეთ ყველა ველი!')
		return
	}

	// 1. სიმძლავრე კილოვატებში
	const coolingKW = btu / 3412

	// 2. მოხმარება (kW) საათში
	const powerOnOff = coolingKW / copOnOff
	const powerInverter = coolingKW / copInverter

	// 3. ხარჯი თვეში (30 დღე)
	const costOnOff = powerOnOff * hours * tariff * 30
	const costInverter = powerInverter * hours * tariff * 30

	// 4. ეკონომია
	const saveMonth = costOnOff - costInverter
	const saveYear = saveMonth * 12

	resultText.innerHTML = `
        <div style="text-align: left; margin-bottom: 15px; font-size: 0.95rem; line-height: 1.6;">
            ხარჯი თვეში:<br>
            <span style="color: var(--color-danger);">🔴 On/Off (ჩვეულებრივი): <strong>${costOnOff.toFixed(
							2,
						)} ₾</strong></span><br>
            <span style="color: var(--color-success);">🟢 Inverter (ეკონომიური): <strong>${costInverter.toFixed(
							2,
						)} ₾</strong></span>
        </div>
        
        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--color-border-accent);">
        
        <div>
            თქვენი ეკონომია:<br>
            <strong style="font-size: 1.6em; color: var(--color-success);">💰 ${Math.round(
							saveMonth,
						)} ₾</strong> <small>/თვეში</small>
            <br>
            <span style="font-size: 0.9rem; color: var(--color-text-muted);">
                (📅 წელიწადში: ~${Math.round(saveYear)} ₾)
            </span>
        </div>
    `
	resultBox.classList.add('show')
}

/* ===============================
   9. AIRFLOW CALCULATOR (METRIC - m³/h)
================================ */
window.calculateAirflow = function () {
	const btu = parseFloat(document.getElementById('air-btu').value)
	const retTemp = parseFloat(document.getElementById('air-return').value)
	const supTemp = parseFloat(document.getElementById('air-supply').value)

	const resultBox = document.getElementById('air-result')
	const resultText = document.getElementById('air-result-text')

	if (!btu || isNaN(retTemp) || isNaN(supTemp)) {
		alert('შეავსეთ მონაცემები!')
		return
	}

	// 1. Delta T
	const deltaT_C = retTemp - supTemp

	if (deltaT_C <= 0) {
		alert(
			'შემავალი ტემპერატურა უნდა იყოს გამომავალზე მაღალი (გაგრილების რეჟიმი)!',
		)
		return
	}

	// ცვლადები
	let displayMain = '---'
	let statusMsg = ''
	let statusColor = 'var(--color-text)'

	// 2. ლოგიკა
	if (deltaT_C < 3) {
		displayMain = '---'
		statusMsg = '⚠️ კომპრესორი გამორთულია (სხვაობა < 3°C)'
		statusColor = 'var(--color-danger)'
	} else {
		const sensibleBTU = btu * 0.75

		// CFM (შიდა გამოთვლა)
		const cfm = sensibleBTU / (1.08 * (deltaT_C * 1.8))

		// ევროპული სტანდარტი (მ³/სთ)
		const m3h = cfm * 1.7

		displayMain = Math.round(m3h) + ' მ³/სთ'

		// 3. სტატუსები
		if (deltaT_C < 8) {
			statusMsg = '⚠️ პრობლემა! სისტემა ცუდად აგრილებს'
			statusColor = 'var(--color-warning)'
		} else if (deltaT_C >= 8 && deltaT_C <= 15) {
			statusMsg = '✅ იდეალურია! სისტემა გამართულია'
			statusColor = 'var(--color-success)'
		} else if (deltaT_C > 20) {
			statusMsg = '🛑 ჰაერის ნაკადი შეზღუდულია! (გაჭედილი ფილტრი)'
			statusColor = 'var(--color-danger)'
		} else {
			statusMsg = 'ℹ️ გადაამოწმეთ პარამეტრები'
			statusColor = 'var(--color-text-muted)'
		}
	}

	// 4. შედეგი
	resultText.innerHTML = `
        ჰაერის ნაკადი: <br>
        <strong style="font-size: 1.6em; color: var(--color-primary)">${displayMain}</strong>
        
        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--color-border-accent);">
        
        <div style="font-size: 0.95rem; margin-bottom: 5px;">
            Delta T: <strong>${deltaT_C.toFixed(1)} °C</strong>
        </div>
        <div style="color: ${statusColor}; font-weight: bold; font-size: 0.9rem; line-height: 1.4;">
            ${statusMsg}
        </div>
    `
	resultBox.classList.add('show')
}
