/* ===============================
   HVAC/R CALCULATORS LOGIC
   P-T Calculation using Lookup Tables (Gauge Pressure Corrected)
================================ */

// ზუსტი მონაცემთა ბაზა (Bar Gauge -> Saturation Temp °C)
const refrigerantData = {
	R410A: [
		{ p: 0, t: -51 },
		{ p: 4, t: -15.2 },
		{ p: 6, t: -3.8 },
		{ p: 8, t: 0.5 },
		{ p: 10, t: 7.2 },
		{ p: 12, t: 12.5 },
		{ p: 15, t: 20.2 },
		{ p: 20, t: 32.0 },
		{ p: 25, t: 41.8 },
		{ p: 30, t: 49.6 },
		{ p: 35, t: 56.5 },
		{ p: 40, t: 62.5 },
	],
	R32: [
		{ p: 0, t: -51 },
		{ p: 4, t: -14.8 },
		{ p: 6, t: -3.2 },
		{ p: 8, t: 1.0 },
		{ p: 10, t: 7.6 },
		{ p: 12, t: 13.0 },
		{ p: 15, t: 20.8 },
		{ p: 20, t: 32.8 },
		{ p: 25, t: 42.8 },
		{ p: 30, t: 50.8 },
		{ p: 35, t: 57.8 },
		{ p: 40, t: 64.0 },
	],
	R22: [
		{ p: 0, t: -40 },
		{ p: 2, t: -13.5 },
		{ p: 4, t: 0.5 },
		{ p: 5, t: 5.8 },
		{ p: 6, t: 10.5 },
		{ p: 8, t: 18.5 },
		{ p: 10, t: 25.5 },
		{ p: 12, t: 32.0 },
		{ p: 15, t: 40.5 },
		{ p: 18, t: 48.0 },
		{ p: 20, t: 52.5 },
		{ p: 25, t: 62.0 },
	],
	R134a: [
		{ p: 0, t: -26 },
		{ p: 1, t: -10 },
		{ p: 2, t: 0.5 },
		{ p: 3, t: 8.5 },
		{ p: 4, t: 15.5 },
		{ p: 5, t: 21.5 },
		{ p: 6, t: 27.0 },
		{ p: 8, t: 36.5 },
		{ p: 10, t: 44.5 },
		{ p: 15, t: 60.0 },
	],
	R404A: [
		{ p: 0, t: -45 },
		{ p: 2, t: -23 },
		{ p: 4, t: -9.0 },
		{ p: 6, t: 2.5 },
		{ p: 8, t: 12.0 },
		{ p: 10, t: 20.5 },
		{ p: 15, t: 36.0 },
		{ p: 20, t: 48.0 },
		{ p: 25, t: 58.0 },
	],
	R290: [
		{ p: 0, t: -42 },
		{ p: 2, t: -19 },
		{ p: 4, t: -5.0 },
		{ p: 6, t: 6.5 },
		{ p: 8, t: 16.0 },
		{ p: 10, t: 24.5 },
		{ p: 15, t: 40.0 },
		{ p: 20, t: 53.0 },
	],
}

// ინტერპოლაციის დამხმარე ფუნქცია
function interpolate(x, x1, y1, x2, y2) {
	// Linear Interpolation Formula: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
	return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
}

// მთავარი ფუნქცია: P -> T კონვერტაცია
function getSaturationTemp(refrigerant, pressure, unit) {
	let p_bar = 0

	if (unit === 'PSI') {
		p_bar = pressure / 14.5038
	} else {
		p_bar = pressure
	}

	const data = refrigerantData[refrigerant]
	if (!data) return null

	// ვიპოვოთ დიაპაზონი
	for (let i = 0; i < data.length - 1; i++) {
		const point1 = data[i]
		const point2 = data[i + 1]

		if (p_bar >= point1.p && p_bar <= point2.p) {
			return interpolate(p_bar, point1.p, point1.t, point2.p, point2.t)
		}
	}

	// ექსტრაპოლაცია ან ლიმიტი
	if (p_bar < data[0].p) return data[0].t
	if (p_bar > data[data.length - 1].p) return data[data.length - 1].t

	return null
}

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
					btu
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
   2. DIGITAL P-T CHART
================================ */
window.calculatePTChart = function () {
	const ref = document.getElementById('pt-ref').value
	const press = parseFloat(document.getElementById('pt-press').value)
	const unit = document.getElementById('pt-unit').value
	const display = document.getElementById('pt-display')

	if (isNaN(press)) {
		display.innerHTML = '--- °C'
		return
	}

	const temp = getSaturationTemp(ref, press, unit)

	if (temp !== null) {
		display.innerHTML = `${temp.toFixed(1)} °C`
	} else {
		display.innerHTML = 'Error'
	}
}

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
					addGram
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
		2
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
		1
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
		document.getElementById('cond-humidity').value
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
					2
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
							2
						)} ₾</strong></span><br>
            <span style="color: var(--color-success);">🟢 Inverter (ეკონომიური): <strong>${costInverter.toFixed(
							2
						)} ₾</strong></span>
        </div>
        
        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed var(--color-border-accent);">
        
        <div>
            თქვენი ეკონომია:<br>
            <strong style="font-size: 1.6em; color: var(--color-success);">💰 ${Math.round(
							saveMonth
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
			'შემავალი ტემპერატურა უნდა იყოს გამომავალზე მაღალი (გაგრილების რეჟიმი)!'
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

		displayMain = Math.round(m3h) + ' მ³/სთ' // <--- m³/h

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
