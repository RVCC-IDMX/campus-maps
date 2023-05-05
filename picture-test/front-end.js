let tab = document.querySelector('.form-toggle');
let form = document.querySelector('.search');
let formCnt = document.querySelector('.form-ctn');
let btns = document.querySelector('.btn-ctn');

tab.addEventListener('pointerdown', (e) => {
	if (form.classList[1]) {
		form.classList.remove('closed');
		btns.classList.remove('hide');
		formCnt.classList.add('boop');
	} else {
		form.classList.add('closed');
	}
});
