import { hvacTest } from '../../data/hvacTests.js'

export function HVACRLicensePage() {
	const testsHtml = hvacTest
		.map((test, index) => {
			const optionsHtml = test.options
				.map((option, optIndex) => {
					const isCorrect = optIndex === test.correct
					const className = isCorrect
						? 'test-option correct'
						: 'test-option normal'
					const icon = isCorrect
						? '<span class="icon">✅</span>'
						: '<span class="icon">❌</span>'

					return `
                <div class="${className}">
                    ${icon} <span>${option}</span>
                </div>
            `
				})
				.join('')
			return `
            <div class="test-card">
                <div class="test-question">
                    <strong>${test.q}</strong>
                </div>
                <div class="test-options">
                    ${optionsHtml}
                </div>
            </div>
        `
		})
		.join('')

	return `
        <div class="card">
            <h3 class="card__title">HVAC/R - ტესტები (სასწავლო რეჟიმი)</h3>
            <p class="card__description">საქართველოს კანონმდებლობის მიხედვით,
            მაცივარაგენტის შეძენისათვის, რეალიზაციისათვის და მოხმარებისათვის საჭიროა სპეციალური ლიცენზია.</p>
        </div>
        <div class="tests-wrapper">
        ${testsHtml}
        </div>
    `
}
