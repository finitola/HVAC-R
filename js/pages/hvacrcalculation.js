export function HVACRCalculationPage() {
	return `
<div class="card">
	<h3 class="card__title">HVAC/R კალკულატორები</h3>
	<p class="card__description">
		აირჩიეთ სასურველი კალკულატორი გამოთვლებისთვის.
		<br />
		გაითვალისწინეთ, რომ ეს კალკულატორები გათვლილია, ზოგადი წარმოდგენის
		შესაქმნელად, მიახლოებით შედეგებზე.
	</p>
</div>

<div class="calc-grid">
	<div class="card" style="margin: 0; display: flex; flex-direction: column">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			❄️
		</div>
		<h4 style="color: var(--color-primary)">BTU კალკულატორი</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			სიმძლავრის შერჩევა ფართობის მიხედვით
		</p>

		<div class="calc-group">
			<label class="calc-label">ოთახის ფართობი (მ²)</label>
			<input type="number" id="btu-area" class="calc-input" placeholder="0" />
		</div>

		<div class="calc-group">
			<label class="calc-label">ჭერის სიმაღლე (მ)</label>
			<input
				type="number"
				id="btu-height"
				class="calc-input"
				value="2.4"
				placeholder="2.4"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">იზოლაციის დონე</label>
			<select id="btu-factor" class="calc-select">
				<option value="35">კარგი იზოლაცია / ჩრდილი</option>
				<option value="40" selected>სტანდარტული</option>
				<option value="50">ცუდი იზოლაცია / მზიანი</option>
				<option value="60">პანორამული მინები / სახურავი</option>
			</select>
		</div>

		<button class="calc-btn" onclick="window.calculateBTU()">გამოთვლა</button>
		<div id="btu-result" class="calc-result-box">
			<p id="btu-result-text"></p>
		</div>
	</div>

	<div class="card" style="margin: 0; display: flex; flex-direction: column">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			📊
		</div>
		<h4 style="color: var(--color-info)">P-T კალკულატორი</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			წნევა ➔ ტემპერატურა (Saturated)
		</p>

		<div class="calc-group">
			<label class="calc-label">ფრეონის ტიპი</label>
			<select
				id="pt-ref"
				class="calc-select"
				onchange="window.calculatePTChart()"
			>
				<option value="R410A">R410A</option>
				<option value="R32">R32</option>
				<option value="R22">R22</option>
			</select>
		</div>

		<!-- Dew/Bubble (R410A-ზე აქვს აზრი) -->
		<div class="calc-group" id="pt-phase-wrap" style="display: none">
			<label class="calc-label">Saturated ტიპი</label>
			<select
				id="pt-phase"
				class="calc-select"
				onchange="window.calculatePTChart()"
			>
				<option value="dew">Dew (Vapor)</option>
				<option value="bubble">Bubble (Liquid)</option>
			</select>
		</div>

		<div class="calc-group">
			<label class="calc-label">შეიყვანეთ წნევა</label>
			<div style="display: flex; gap: 10px">
				<input
					type="number"
					id="pt-press"
					class="calc-input"
					placeholder="0"
					step="0.01"
					inputmode="decimal"
					oninput="window.calculatePTChart()"
				/>
				<select
					id="pt-unit"
					class="calc-select"
					style="width: 100px"
					onchange="window.calculatePTChart()"
				>
					<option value="BAR">Bar</option>
					<option value="PSI">PSI</option>
				</select>
			</div>
		</div>

		<div
			style="
				margin-top: auto;
				padding: 15px;
				background: var(--color-surface-alt);
				border-radius: var(--radius-sm);
				text-align: center;
			"
		>
			<span style="font-size: 0.85rem; color: var(--color-text-muted)"
				>Saturated Temp:</span
			>
			<div
				id="pt-display"
				style="font-size: 1.8rem; font-weight: bold; color: var(--color-info)"
			>
				--- °C
			</div>
		</div>
	</div>

	<div class="card" style="margin: 0; display: flex; flex-direction: column">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			🔄
		</div>
		<h4 style="color: var(--color-success)">კონვერტერი</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			ერთეულების სწრაფი გადაყვანა
		</p>

		<div class="calc-group">
			<label class="calc-label">აირჩიეთ ტიპი</label>
			<select
				id="conv-type"
				class="calc-select"
				onchange="window.convertUnits()"
			>
				<option value="bar_to_psi">Bar ➔ PSI (წნევა)</option>
				<option value="psi_to_bar">PSI ➔ Bar (წნევა)</option>
				<option value="c_to_f">°C ➔ °F (ტემპერატურა)</option>
				<option value="f_to_c">°F ➔ °C (ტემპერატურა)</option>
				<option value="kw_to_btu">kW ➔ BTU/h (სიმძლავრე)</option>
				<option value="btu_to_kw">BTU/h ➔ kW (სიმძლავრე)</option>
			</select>
		</div>

		<div class="calc-group">
			<label class="calc-label">შეიყვანეთ მნიშვნელობა</label>
			<input
				type="number"
				id="conv-input"
				class="calc-input"
				placeholder="0"
				oninput="window.convertUnits()"
			/>
		</div>

		<div
			style="
				margin-top: auto;
				padding: 20px;
				background: var(--color-surface-alt);
				border-radius: var(--radius-sm);
				text-align: center;
			"
		>
			<span style="font-size: 0.9rem; color: var(--color-text-muted)"
				>შედეგი:</span
			>
			<div
				id="conv-result-display"
				style="font-size: 2rem; font-weight: bold; color: var(--color-success)"
			>
				---
			</div>
		</div>
	</div>

	<div class="card">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			⚖️
		</div>
		<h4 style="color: var(--color-primary)">ფრეონის დამატება</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			მილების დიამეტრის მიხედვით
		</p>

		<div class="calc-group">
			<label class="calc-label">ტრასის რეალური სიგრძე (მ)</label>
			<input
				type="number"
				id="ref-total-len"
				class="calc-input"
				placeholder="მაგ: 15"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">ქარხნული ლიმიტი (მ)</label>
			<input
				type="number"
				id="ref-base-len"
				class="calc-input"
				value="5"
				placeholder="სტანდარტულად 5 ან 7"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">მილების წყვილი (Liquid & Gas)</label>
			<select
				id="ref-pipe-select"
				class="calc-select"
				onchange="window.toggleRefCustomInput()"
			>
				<option value="20">1/4" & 3/8" (6 - 10 მმ) | 09k-12k</option>
				<option value="20">1/4" & 1/2" (6 - 12 მმ) | 12k-18k</option>
				<option value="50">3/8" & 5/8" (10 - 16 მმ) | 18k-24k</option>
				<option value="50">3/8" & 3/4" (10 - 19 მმ) | 36k</option>
				<option value="100">1/2" & 3/4" (12 - 19 მმ) | 48k+</option>
				<option value="custom">სხვა (მითითება ხელით)</option>
			</select>
		</div>

		<div class="calc-group" id="ref-custom-container" style="display: none">
			<label class="calc-label" style="color: var(--color-accent)"
				>შეიყვანეთ გრამი/მეტრზე (g/m)</label
			>
			<input
				type="number"
				id="ref-custom-val"
				class="calc-input"
				placeholder="მაგ: 30"
			/>
		</div>

		<button class="calc-btn" onclick="window.calculateRefCharge()">
			გამოთვლა
		</button>
		<div id="ref-result" class="calc-result-box">
			<p id="ref-result-text"></p>
		</div>
	</div>

	<div class="card" style="margin: 0; display: flex; flex-direction: column">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			📉
		</div>
		<h4 style="color: var(--color-danger)">ძაბვის ვარდნა</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			სადენის კვეთის შემოწმება
		</p>

		<div class="calc-group">
			<label class="calc-label">ძაბვა (Volt) / დენი (Amps)</label>
			<div style="display: flex; gap: 10px">
				<input
					type="number"
					id="vd-volt"
					class="calc-input"
					value="220"
					placeholder="220"
				/>
				<input type="number" id="vd-amps" class="calc-input" placeholder="A" />
			</div>
		</div>

		<div class="calc-group">
			<label class="calc-label">სადენის სიგრძე (მ)</label>
			<input
				type="number"
				id="vd-dist"
				class="calc-input"
				placeholder="მანძილი"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">სადენის კვეთი (mm²) / მასალა</label>
			<div style="display: flex; gap: 10px">
				<select id="vd-size" class="calc-select">
					<option value="1.5">1.5 mm²</option>
					<option value="2.5" selected>2.5 mm²</option>
					<option value="4">4.0 mm²</option>
					<option value="6">6.0 mm²</option>
					<option value="10">10 mm²</option>
				</select>
				<select id="vd-mat" class="calc-select" style="width: 80px">
					<option value="cu">Cu (სპ)</option>
					<option value="al">Al (ალ)</option>
				</select>
			</div>
		</div>

		<button
			class="calc-btn"
			onclick="window.calculateVoltageDrop()"
			style="background-color: var(--color-danger)"
		>
			გამოთვლა
		</button>
		<div id="vd-result" class="calc-result-box">
			<p id="vd-result-text"></p>
		</div>
	</div>

	<div class="card" style="margin: 0; display: flex; flex-direction: column">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			🌡️
		</div>
		<h4 style="color: var(--color-accent)">
			დიაგნოსტიკა (SH (Cap) / SC (EEV))
		</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			სისტემის მუშაობის ანალიზი
		</p>

		<div class="toggle-container">
			<input type="radio" id="mode-sh" name="diag-mode" value="sh" checked />
			<label for="mode-sh" class="toggle-label">
				<span>🔥</span> Superheat
			</label>

			<input type="radio" id="mode-sc" name="diag-mode" value="sc" />
			<label for="mode-sc" class="toggle-label">
				<span>💧</span> Subcooling
			</label>
		</div>

		<div class="calc-group">
			<label class="calc-label">მანომეტრის ჩვენება (Saturated °C)</label>
			<input
				type="number"
				id="diag-sat"
				class="calc-input"
				placeholder="დუღილის/კონდენსაციის ტემპ."
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">მილის ტემპერატურა (Line Temp °C)</label>
			<input
				type="number"
				id="diag-line"
				class="calc-input"
				placeholder="ფაქტიური ტემპ. მილზე"
			/>
		</div>

		<button
			class="calc-btn"
			onclick="window.calculateDiagnosis()"
			style="background-color: var(--color-accent)"
		>
			გამოთვლა
		</button>
		<div id="diag-result" class="calc-result-box">
			<p id="diag-result-text"></p>
		</div>
	</div>

	<div class="card">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			💧
		</div>
		<h4 style="color: var(--color-info)">კონდენსატის რაოდენობა</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			სადრენაჟე ტუმბოს/მილის შერჩევა
		</p>

		<div class="calc-group">
			<label class="calc-label">სიმძლავრე (BTU)</label>
			<input
				type="number"
				id="cond-btu"
				class="calc-input"
				placeholder="მაგ: 12000"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">ტენიანობის დონე</label>
			<select id="cond-humidity" class="calc-select">
				<option value="0.4">დაბალი (მშრალი კლიმატი)</option>
				<option value="0.6" selected>საშუალო (სტანდარტული)</option>
				<option value="1.0">მაღალი (ნესტიანი/ტროპიკული)</option>
			</select>
		</div>

		<button
			class="calc-btn"
			onclick="window.calculateCondensate()"
			style="background-color: var(--color-info)"
		>
			გამოთვლა
		</button>
		<div id="cond-result" class="calc-result-box">
			<p id="cond-result-text"></p>
		</div>
	</div>

	<div class="card">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			💰
		</div>
		<h4 style="color: var(--color-success)">ROI / ენერგოეფექტურობა</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			On/Off vs Inverter (შედარება)
		</p>

		<div class="calc-group">
			<label class="calc-label">სიმძლავრე (BTU)</label>
			<input
				type="number"
				id="roi-btu"
				class="calc-input"
				placeholder="მაგ: 12000"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">დღიური მუშაობა (საათი)</label>
			<input
				type="number"
				id="roi-hours"
				class="calc-input"
				value="8"
				placeholder="8"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">ტარიფი (GEL/kWh)</label>
			<input
				type="number"
				id="roi-tariff"
				class="calc-input"
				value="0.22"
				step="0.01"
				placeholder="0.22"
			/>
		</div>

		<button
			class="calc-btn"
			onclick="window.calculateROI()"
			style="background-color: var(--color-success)"
		>
			გამოთვლა
		</button>
		<div id="roi-result" class="calc-result-box">
			<p id="roi-result-text"></p>
		</div>
	</div>

	<div class="card">
		<div class="card-icon" style="font-size: 2.5rem; margin-bottom: 15px">
			💨
		</div>
		<h4 style="color: var(--color-primary)">AIRFLOW (m³/h) / ჰაერის ნაკადი</h4>
		<p style="font-size: 0.85rem; margin-bottom: 15px">
			დიაგნოსტიკა ტემპერატურებით
		</p>

		<div class="calc-group">
			<label class="calc-label">სიმძლავრე (BTU)</label>
			<input
				type="number"
				id="air-btu"
				class="calc-input"
				placeholder="მაგ: 12000"
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">შემავალი ჰაერი (Return °C)</label>
			<input
				type="number"
				id="air-return"
				class="calc-input"
				placeholder="ოთახის ტემპ."
			/>
		</div>

		<div class="calc-group">
			<label class="calc-label">გამომავალი ჰაერი (Supply °C)</label>
			<input
				type="number"
				id="air-supply"
				class="calc-input"
				placeholder="ჟალუზიდან გამომავალი"
			/>
		</div>

		<button class="calc-btn" onclick="window.calculateAirflow()">
			გამოთვლა
		</button>
		<div id="air-result" class="calc-result-box">
			<p id="air-result-text"></p>
		</div>
	</div>
</div>
`
}
