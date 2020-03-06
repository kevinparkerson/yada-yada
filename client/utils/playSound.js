import dooropen from '../sounds/dooropen.wav';
import doorslam from '../sounds/doorslam.wav';
import imrcv from '../sounds/imrcv.wav';
import imsend from '../sounds/imsend.wav';

const soundList = {
	dooropen,
	doorslam,
	imrcv,
	imsend
};

export default function playSound (soundName) {
	if (soundList[soundName]) {
		try {
			const sound = new Audio(soundList[soundName]);
			sound.play();
		} catch (e) {}	// eslint-disable-line no-empty
	}
}
