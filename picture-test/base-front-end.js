// Get the modal
let modal = document.querySelector('.modal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
let images = document.querySelectorAll('img');
let modalImg = document.querySelector('.modal-content');
let captionText = document.getElementById('caption');
let closeBtn = document.querySelector('.close');

images.forEach((img) => {
	img.addEventListener('pointerdown', (e) => {
		if (img.classList[0] != 'modal-content') {
			openModal(e, img);
		}
	});
});

let openModal = (e, img) => {
	modal.classList.remove('hidden');
	modalImg.src = e.target.src;
	captionText.innerText = img.alt;
	setTimeout(() => closeBtn.focus(), 0);
	closeBtn.addEventListener('keydown', (e) => {
		if (e.keyCode == 9) {
			e.preventDefault();
		}
	});
	document.addEventListener('pointerdown', (e) => {
		setTimeout(() => closeBtn.focus(), 0);
	});
	document.addEventListener('keydown', closeOnEsc);
};

let closeOnEsc = (e) => {
	if (e.keyCode == 27) {
		closeModal();
	}
};

let closeModal = () => {
	modal.classList.add('hidden');
};

closeBtn.addEventListener('pointerup', (e) => {
	setTimeout(() => closeModal(), 20);
});

closeBtn.addEventListener('keydown', (e) => {
	if (e.keyCode == 13) {
		closeModal();
	}
});
