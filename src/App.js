import React, { useEffect } from 'react';
import './App.css';

import scrollSnapPolyfill from 'css-scroll-snap-polyfill';

function checkScroll() {
	let videos = document.getElementsByTagName("video");

	for (let i = 0; i < videos.length; i++) {

		let video = videos[i];

		var rect = video.getBoundingClientRect();


		const visible = (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight) &&
			rect.right <= (window.innerWidth)
		);

		if (visible) {
			try {
				video.play();
			} catch (err) {
				// do something
			}

		} else {
			video.pause();
		}
	}
}


function App() {
	scrollSnapPolyfill();


	useEffect(() => {
		// on mount
		if (window) {
			checkScroll();
			window.addEventListener('resize', checkScroll, false);
		}
		return () => {
			window.removeEventListener('resize', checkScroll, false);
		}
	}, [])

	return (
		<div class="wrapper">
			<div class="container" onScroll={checkScroll}>
				<video src='/videos/v1.mov'
					// autoPlay
					controls
					loop
					muted
				/>
				<video src='/videos/v3.mp4'
					controls
					loop
					muted
				/>
				<video src='/videos/v4.mp4'
					controls
					loop
					muted
				/>
			</div>
		</div>
	);
}

export default App;
