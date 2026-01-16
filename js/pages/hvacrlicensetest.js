import { hvacTest } from '../../data/hvacTests.js'

const STORAGE_KEY = 'hvac_quiz_session_v5'

const initialState = {
	status: 'start',
	questions: [],
	userAnswers: [],
	currentIndex: 0,
	timeLeft: 1800,
}

let quizState = { ...initialState }
let timerInterval = null

export function HVACRLicenseTestPage() {
	loadState()

	setTimeout(() => {
		initView()
	}, 0)

	return `
        <div class="hvac-quiz-card" id="hvac-quiz-app-container">
        </div>
    `
}

function initView() {
	const container = document.getElementById('hvac-quiz-app-container')
	if (!container) return

	if (quizState.status === 'start') {
		renderStartScreen(container)
	} else if (quizState.status === 'quiz') {
		renderQuiz(container)
		startTimer()
	} else if (quizState.status === 'result') {
		finishTest(false, true)
	}
}

function renderStartScreen(container) {
	container.innerHTML = `
        <div style="text-align:center; padding: 40px;">
            <div style="font-size:4rem; margin-bottom:20px;">📝</div>
            <h2 style="margin-bottom:20px;">საგამოცდო ტესტირება</h2>
            <p style="color:#666; margin-bottom:30px;">
                30 კითხვა | 30 წუთი <br>
                უკან დაბრუნება შეუძლებელია
            </p>
            <button class="hvac-btn hvac-btn-next" onclick="window.startQuizAction()">
                ტესტის დაწყება
            </button>
        </div>
    `
}

function renderQuiz(
	container = document.getElementById('hvac-quiz-app-container')
) {
	if (!container) return

	const currentQ = quizState.questions[quizState.currentIndex]
	const userAns = quizState.userAnswers[quizState.currentIndex]
	const isLast = quizState.currentIndex === 29

	const optionsHtml = currentQ.options
		.map(
			(opt, idx) => `
        <div class="hvac-option ${userAns === idx ? 'selected' : ''}" 
             onclick="window.selectOption(${idx})">
            <span class="hvac-opt-letter">${['A', 'B', 'C', 'D'][idx]}.</span> 
            <span class="hvac-opt-text">${opt}</span>
        </div>
    `
		)
		.join('')

	container.innerHTML = `
        <div class="hvac-quiz-header">
            <span class="hvac-question-counter">საკითხი ${
							quizState.currentIndex + 1
						} / 30</span>
            <div class="hvac-timer-pill" id="hvac-timer-display">
                ${formatTime(quizState.timeLeft)}
            </div>
        </div>

        <div class="hvac-question-text">${currentQ.q}</div>

        <div class="hvac-options-container">
            ${optionsHtml}
        </div>

        <div class="hvac-quiz-footer">
            <button class="hvac-btn hvac-btn-skip" onclick="window.skipQuestion()">
                გამოტოვება
            </button>

            <button class="hvac-btn hvac-btn-next" onclick="window.nextQuestion()">
                ${isLast ? 'დასრულება' : 'შემდეგი'}
            </button>
        </div>
    `
}

// --- Logic ---

window.startQuizAction = () => {
	const shuffledRaw = [...hvacTest].sort(() => 0.5 - Math.random()).slice(0, 30)

	const processedQuestions = shuffledRaw.map(q => {
		const richOptions = q.options.map((opt, i) => ({
			text: opt,
			isCorrect: i === q.correct,
		}))

		// richOptions.sort(() => 0.5 - Math.random()) <--- პასუხები რენდომად

		return {
			q: q.q,
			options: richOptions.map(o => o.text),
			correct: richOptions.findIndex(o => o.isCorrect),
		}
	})

	quizState = {
		...initialState,
		status: 'quiz',
		questions: processedQuestions,
		userAnswers: new Array(30).fill(null),
	}
	saveState()
	initView()
}

function startTimer() {
	if (timerInterval) clearInterval(timerInterval)
	const timerEl = document.getElementById('hvac-timer-display')

	timerInterval = setInterval(() => {
		quizState.timeLeft--
		saveState()

		if (timerEl) {
			timerEl.textContent = formatTime(quizState.timeLeft)
			if (quizState.timeLeft < 60) timerEl.classList.add('danger')
		}

		if (quizState.timeLeft <= 0) finishTest(true)
	}, 1000)
}

// --- Controls ---

window.selectOption = idx => {
	quizState.userAnswers[quizState.currentIndex] = idx
	saveState()
	renderQuiz()
}

window.nextQuestion = () => {
	let nextIndex = quizState.currentIndex + 1

	// ვეძებთ შემდეგ ცარიელ ან მომდევნო კითხვას
	while (nextIndex < 30 && quizState.userAnswers[nextIndex] !== null) {
		nextIndex++
	}

	if (nextIndex < 30) {
		quizState.currentIndex = nextIndex
		saveState()
		renderQuiz()
	} else {
		window.tryFinishTest()
	}
}

window.skipQuestion = () => {
	quizState.userAnswers[quizState.currentIndex] = null
	saveState()

	let nextIndex = quizState.currentIndex + 1
	if (nextIndex < 30) {
		quizState.currentIndex = nextIndex
		saveState()
		renderQuiz()
	} else {
		window.tryFinishTest()
	}
}

window.tryFinishTest = () => {
	const firstSkippedIndex = quizState.userAnswers.indexOf(null)

	if (firstSkippedIndex !== -1) {
		alert(
			`თქვენ გამოტოვებული გაქვთ კითხვა N${
				firstSkippedIndex + 1
			}. დასასრულებლად აუცილებელია პასუხის გაცემა.`
		)
		quizState.currentIndex = firstSkippedIndex
		saveState()
		renderQuiz()
		return
	}

	if (confirm('ნამდვილად გსურთ ტესტის დასრულება?')) {
		finishTest(false)
	}
}

function finishTest(timeUp = false, renderOnly = false) {
	clearInterval(timerInterval)

	if (!renderOnly) {
		quizState.status = 'result'
		saveState()
	}

	const container = document.getElementById('hvac-quiz-app-container')

	let correctCount = 0
	const reviewHTML = quizState.questions
		.map((q, idx) => {
			const userAns = quizState.userAnswers[idx]
			const isCorrect = userAns === q.correct
			if (isCorrect) correctCount++

			const userAnsText =
				userAns !== null ? q.options[userAns] : 'პასუხი არ გაგიციათ'
			const correctAnsText = q.options[q.correct]
			const statusClass = isCorrect ? 'hvac-res-correct' : 'hvac-res-wrong'

			return `
            <div class="hvac-review-item ${statusClass}">
                <div class="hvac-review-q"><strong>${idx + 1}.</strong> ${
				q.q
			}</div>
                <div class="hvac-review-ans">
                    <span class="hvac-label">თქვენი პასუხი:</span> 
                    <span class="hvac-val ${
											isCorrect ? 'text-green' : 'text-red'
										}">${userAnsText}</span>
                </div>
                ${
									!isCorrect
										? `
                <div class="hvac-review-ans">
                    <span class="hvac-label">სწორი პასუხი:</span> 
                    <span class="hvac-val text-green">${correctAnsText}</span>
                </div>`
										: ''
								}
            </div>
        `
		})
		.join('')

	const isPassed = correctCount >= 27

	container.innerHTML = `
        <div class="hvac-result-container">
            <h2>${timeUp ? 'დრო ამოიწურა!' : 'ტესტი დასრულებულია'}</h2>
            
            <div class="hvac-score-box ${isPassed ? 'passed' : 'failed'}">
                ${correctCount} / 30
            </div>
            
            <h3 style="margin-bottom: 30px;">${
							isPassed
								? 'გილოცავთ! ტესტი წარმატებით ჩააბარეთ.'
								: 'სამწუხაროდ ზღვარი ვერ გადალახეთ.'
						}</h3>

            <div class="hvac-review-container">
                <h4>დეტალური შედეგები:</h4>
                <br/>
                ${reviewHTML}
            </div>
            
            <div style="margin-top: 40px; display:flex; justify-content:center; gap:20px;">
                 <button class="hvac-btn hvac-btn-next" onclick="window.restartFullTest()">თავიდან დაწყება</button>
                 <button class="hvac-btn hvac-btn-skip" style="border:1px solid #ccc" onclick="window.exitToHome()">მთავარი</button>
            </div>
        </div>
    `
	container.scrollIntoView({ behavior: 'smooth' })
}

window.restartFullTest = () => {
	sessionStorage.removeItem(STORAGE_KEY)
	quizState = { ...initialState }
	window.startQuizAction()
}

window.exitToHome = () => {
	sessionStorage.removeItem(STORAGE_KEY)
	window.location.href = '?page=home'
}

function formatTime(s) {
	const m = Math.floor(s / 60)
	const sec = s % 60
	return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

function saveState() {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quizState))
}

function loadState() {
	const navEntry = performance.getEntriesByType('navigation')[0]
	const isReload = navEntry ? navEntry.type === 'reload' : false

	if (isReload) {
		try {
			const s = sessionStorage.getItem(STORAGE_KEY)
			if (s) quizState = JSON.parse(s)
		} catch (e) {}
	} else {
		sessionStorage.removeItem(STORAGE_KEY)
		quizState = { ...initialState }
	}
}
