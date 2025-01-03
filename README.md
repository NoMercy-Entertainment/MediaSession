# MediaSession for Capacitor and web

## Installation
```sh
npm install @nomercy-entertainment/media-session
```

## Usage
```typescript
import { MediaSession } from '@nomercy-entertainment/media-session';

const mediaSession = new MediaSessionManager();

// Set metadata
mediaSession.setMetadata({
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  artwork: 'https://example.com/artwork.jpg'
});

// Set playback state
mediaSession.setPlaybackState('playing');
mediaSession.setPlaybackState('paused');
mediaSession.setPlaybackState('none');

// Set position state
mediaSession.setPositionState({
  duration: 100,
  playbackRate: 1,
  position: 50
});

// Set action handler
const audioElement = document.createElement('audio');

mediaSession?.setActionHandler({
    play: () => audioElement.play(),
    pause: () => audioElement.pause(),
    stop: () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.removeAttribute('src');
    },
	previous: () => {},
	next: () => {},
	seek: (time) => audioElement.currentTime = time,
	getPosition: () => audioElement.currentTime,
});
```

## License
MIT