let tab = document.querySelector('.form-toggle');
let form = document.querySelector('.search');
let formCnt = document.querySelector('.form-ctn');
let btns = document.querySelector('.btn-ctn');
let searchBtn = document.querySelector('.search-btn');

tab.addEventListener('pointerdown', (e) => {
	if (form.classList[1]) {
		form.classList.remove('closed');
		btns.classList.remove('hide');
		formCnt.classList.add('boop');
	} else {
		form.classList.add('closed');
	}
});

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
				break;
		}
	}
});

searchBtn.addEventListener('pointerdown', (e) => {
	setTimeout(() => {
		form.classList.add('closed');
	}, 300);
});
