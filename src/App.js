import React, { useEffect, useState } from 'react';
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

	const [likedIndex, setLikedIndex] = useState([])

	const videos = ['/videos/v1.mov', '/videos/v3.mp4', '/videos/v4.mp4'];


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

	const onLike = (i) => {
		let indexes = [];
		if (likedIndex.indexOf(i) !== -1) {
			indexes = likedIndex.filter(ind => ind !== i);
		} else {
			indexes = [...likedIndex, i]
		}
		setLikedIndex(indexes);
	}

	return (
		<div class="wrapper">
			<div class="container" onScroll={checkScroll}>
				{
					videos.map((v, i) => (
						<div className='video-container'>
							<video
								key={i}
								src={v}
								controls
								loop
								muted
							/>
							<div className='video-options'>
								<button
									className={likedIndex.indexOf(i) !== -1 ? 'active-btn' : ''}
									onClick={() => onLike(i)}
								>
									Like
								</button>
								<button>Comment</button>
								<button>Share</button>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default App;
