let tab = document.querySelector('.form-toggle');
let form = document.querySelector('.search');

tab.addEventListener('pointerdown', (e) => {
	if (form.classList[1]) {
		form.classList.remove('closed');
	} else {
		form.classList.add('closed');
	}
});
