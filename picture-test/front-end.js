let tab = document.querySelector('.form-toggle');
let form = document.querySelector('.search');
let formCnt = document.querySelector('.form-ctn');
let btns = document.querySelector('.btn-ctn');
let searchBtn = document.querySelector('.search-btn');
let text = document.querySelector('.text');

tab.addEventListener('pointerdown', (e) => {
	if (form.classList[1]) {
		form.classList.remove('closed');
		btns.classList.remove('hide');
		text.textContent = 'close';
	} else {
		form.classList.add('closed');
		text.textContent = 'open';
	}
});

if (matchMedia('(hover: false)').matches) {
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
