let tab = document.querySelector('.form-toggle');
let form = document.querySelector('.search');
let formCnt = document.querySelector('.form-ctn');
let btns = document.querySelector('.btn-ctn');
let searchBtn = document.querySelector('.search-btn');
let text = document.querySelector('.text');

let formEls = document.querySelectorAll('.predicative-field');

formEls.forEach((el) => {
	el.addEventListener('focus', (e) => {
		form.classList.remove('closed');
		text.textContent = 'close';
	});
});

tab.addEventListener('pointerdown', (e) => {
	if (form.classList[1]) {
		form.classList.remove('closed');
		text.textContent = 'close';
	} else {
		form.classList.add('closed');
		text.textContent = 'open';
	}
});

tab.addEventListener('keydown', (e) => {
	if (e.keyCode == 13) {
		if (form.classList[1]) {
			form.classList.remove('closed');
			text.textContent = 'close';
		} else {
			form.classList.add('closed');
			text.textContent = 'open';
		}
	}
});

if (!matchMedia('(hover)').matches) {
	document.addEventListener('pointerdown', (e) => {
		if (form.classList.length == 1) {
			switch (e.target.localName) {
				case 'body':
				case 'header':
				case 'canvas':
				case 'h1':
				case 'img':
				case 'div':
					form.classList.add('closed');
					text.textContent = 'open';
					break;
			}
		}
	});
}

searchBtn.addEventListener('pointerdown', (e) => {
	setTimeout(() => {
		form.classList.add('closed');
		text.textContent = 'open';
	}, 300);
});

searchBtn.addEventListener('keydown', (e) => {
	if (e.keyCode == 13) {
		setTimeout(() => {
			form.classList.add('closed');
			text.textContent = 'open';
		}, 300);
	}
});
