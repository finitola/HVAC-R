const mybutton = document.getElementById('scrollToTopBtn')

window.onscroll = function () {
	scrollFunction()
}

function scrollFunction() {
	if (
		document.body.scrollTop > 300 ||
		document.documentElement.scrollTop > 300
	) {
		mybutton.style.display = 'block'
		setTimeout(() => {
			mybutton.style.opacity = '1'
		}, 10)
	} else {
		mybutton.style.opacity = '0'
		setTimeout(() => {
			if (mybutton.style.opacity === '0') {
				mybutton.style.display = 'none'
			}
		}, 300)
	}
}

mybutton.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
})
