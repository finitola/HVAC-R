export function HomePage() {
	return `
<main>
	<div class="card-home">
		<h3 class="card__title" style="color: var(--color-accent)">გამარჯობა, კოლეგავ ! 👋</h3>
		<p class="card__description">
			აიმაღლე კვალიფიკაცია და შეამოწმე შენი ცოდნა.
		</p>
		<h4 style="color: var(--color-secondary)">
			Heating, Ventilation, Air Conditioning and Refrigeration
		</h4>
	</div>
	<div class="stylized-home">
		<a href="#hvacrlicense" class="stylized-card">
			<div class="card-icon">📖</div>
			<h3 class="card-title">სწავლა</h3>
			<p class="card-desc">კითხვები და პასუხები</p>
		</a>
		<a href="#hvacrlicensetest" class="stylized-card">
			<div class="card-icon">📝</div>
			<h3 class="card-title">ტესტირება</h3>
			<p class="card-desc">სიმულაციური ტესტირება</p>
		</a>
		<a href="#hvacrlicenseinfo" class="stylized-card">
			<div class="card-icon">ℹ️</div>
			<h3 class="card-title">ინფორმაცია</h3>
			<p class="card-desc">მაცივარაგენტები და წესები</p>
		</a>
		<a href="#hvacrcalculation" class="stylized-card">
			<div class="card-icon">🧮</div>
			<h3 class="card-title">კალკულაცია</h3>
			<p class="card-desc">HVAC/R - კალკულატორები</p>
		</a>
	</div>
</main>
`
}
