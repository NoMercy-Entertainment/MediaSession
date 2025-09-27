# MediaSession for Capacitor & Web

[![NPM Version](https://img.shields.io/npm/v/@nomercy-entertainment/media-session?style=flat&logo=npm&logoColor=white&color=cb3837)](https://www.npmjs.com/package/@nomercy-entertainment/media-session)
[![NPM Downloads](https://img.shields.io/npm/dm/@nomercy-entertainment/media-session?style=flat&logo=npm&logoColor=white&color=cb3837)](https://www.npmjs.com/package/@nomercy-entertainment/media-session)
[![License](https://img.shields.io/github/license/NoMercy-Entertainment/MediaSession?style=flat&color=green)](./LICENSE)

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framework Agnostic](https://img.shields.io/badge/Framework-Agnostic-orange?style=flat)](https://github.com/NoMercy-Entertainment/MediaSession)
[![GitHub Stars](https://img.shields.io/github/stars/NoMercy-Entertainment/MediaSession?style=flat&logo=github&logoColor=white&color=yellow)](https://github.com/NoMercy-Entertainment/MediaSession/stargazers)


---

## About

A cross-platform Media Session API wrapper for [Capacitor](https://capacitorjs.com/) and web. Provides unified media controls, metadata, and playback state management for audio/video apps.

Empowers media experiences in [NoMercyTV](https://nomercy.tv/) and other NoMercy projects.

---

## Features

- **Unified API:** Works seamlessly on web and Capacitor platforms
- **Media Metadata:** Set title, artist, album, and artwork
- **Playback State:** Control and reflect play, pause, stop, etc.
- **Position State:** Sync duration, position, and playback rate
- **Action Handlers:** Respond to play, pause, seek, next/previous, and more
- **TypeScript Support:** Full typings for safe integration
- **Framework Agnostic:** Use with any frontend framework

---

## 🚀 Quick Start

### Installation

```sh
npm install @nomercy-entertainment/media-session
```

### Basic Usage

```typescript
import MediaSession from '@nomercy-entertainment/media-session';

const mediaSession = new MediaSession();

// Set metadata
mediaSession.setMetadata({
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  artwork: 'https://example.com/artwork.jpg'
});

// Set playback state
mediaSession.setPlaybackState('playing');

const audioElement = document.createElement('audio');

// Set position state
mediaSession.setPositionState({
  duration: audioElement.duration,
  playbackRate: audioElement.playbackRate,
  position: audioElement.currentTime
});

// Set action handlers
mediaSession.setActionHandler({
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

---

## 🎛️ Advanced Features

### Media Session Integration

- Native OS media controls (lock screen, notification, hardware buttons)
- Customizable action handlers for all major media events
- Automatic artwork resizing for platform compatibility

---

## 🔧 Browser & Platform Support

| Feature           | Chrome | Firefox | Safari | Edge |
|-------------------|:------:|:-------:|:------:|:----:|
| Media Session API |   ✅   |   ✅    |   ✅   |  ✅  |
| Capacitor         |   ✅   |   N/A   |  N/A   | N/A  |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/NoMercy-Entertainment/MediaSession/blob/master/CONTRIBUTING.md) for details.

### Development Setup

```sh
# Clone the repository
https://github.com/NoMercy-Entertainment/MediaSession.git
cd MediaSession

# Install dependencies
npm install

# Build and test
npm run build
npm run test
```

---

## 📄 License

This project is licensed under the [Apache 2.0 License](./LICENSE) - see the LICENSE file for details.

---

## 🏢 About NoMercy Entertainment

NoMercy Entertainment builds open-source media tools that give developers full control over their audio and video.

### Our Ecosystem

- [NoMercy MediaServer](https://github.com/NoMercy-Entertainment/NoMercyMediaServer)
- [NoMercy VideoPlayer](https://github.com/NoMercy-Entertainment/NoMercyVideoPlayer)
- [NoMercy MusicPlayer](https://github.com/NoMercy-Entertainment/NoMercyMusicPlayer)
- [NoMercy FFmpeg](https://github.com/NoMercy-Entertainment/NoMercyFFMpeg)

### Links

- 🌐 Website: [nomercy.tv](https://nomercy.tv/)
- 📧 Contact: [support@nomercy.tv](mailto:support@nomercy.tv)
- 💼 GitHub: [@NoMercy-Entertainment](https://github.com/NoMercy-Entertainment)

---

<div align="center">

**Built with ❤️ by the NoMercy Engineering Team**

</div>