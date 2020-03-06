import './styles/login.scss';

// For fun :)
(() => {
	const yadaLogin = document.querySelector('.yada_login');

	if (yadaLogin) {
		const colors = ['ff0000', 'ff00aa', 'aa00ff', '0000ff', '00ffff', '00ff00', 'eeff00', 'ff8800'];
		let colorIndex = localStorage.getItem('yada_loginColorIndex');
		let hasAddedTransition = false;

		colorIndex = colorIndex ? Number(colorIndex) : 0;

		const iterateColors = (firstIteration) => {
			if (!firstIteration && !hasAddedTransition) {
				yadaLogin.style.transition = 'background-color .75s';
				hasAddedTransition = true;
			}

			yadaLogin.style.backgroundColor = `#${colors[colorIndex]}`;
			localStorage.setItem('yada_loginColorIndex', `${colorIndex}`);

			colorIndex++;
			if (colorIndex >= colors.length) {
				colorIndex = 0;
			}
		};

		iterateColors(true);
		setInterval(iterateColors, 1500);
	}
})();
