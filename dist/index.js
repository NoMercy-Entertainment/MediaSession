"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
const capacitor_media_session_1 = require("@jofr/capacitor-media-session");
class MediaSession {
    setActionHandler({ play, pause, stop, previous, next, seek, getPosition, }) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('previoustrack', previous ?? (() => {
            }));
            navigator.mediaSession.setActionHandler('nexttrack', next ?? (() => {
            }));
            if (typeof seek === 'function' &&
                typeof getPosition === 'function') {
                navigator.mediaSession.setActionHandler('seekbackward', (details) => seek(getPosition() - (details.seekTime ?? 30)));
                navigator.mediaSession.setActionHandler('seekforward', (details) => seek(getPosition() + (details.seekTime ?? 30)));
                navigator.mediaSession.setActionHandler('seekto', (details) => seek(details.seekTime));
            }
            navigator.mediaSession.setActionHandler('play', play ?? (() => {
            }));
            navigator.mediaSession.setActionHandler('stop', stop ?? (() => {
            }));
            navigator.mediaSession.setActionHandler('pause', pause ?? (() => {
            }));
        }
        else {
            capacitor_media_session_1.MediaSession.setActionHandler({
                action: 'play',
            }, play).then();
            capacitor_media_session_1.MediaSession.setActionHandler({
                action: 'pause',
            }, pause).then();
            if (typeof seek === 'function' &&
                typeof getPosition === 'function') {
                capacitor_media_session_1.MediaSession.setActionHandler({
                    action: 'seekbackward'
                }, details => seek(getPosition() - (details.seekTime ?? 30))).then();
                capacitor_media_session_1.MediaSession.setActionHandler({
                    action: 'seekforward'
                }, details => seek(getPosition() + (details.seekTime ?? 30))).then();
                capacitor_media_session_1.MediaSession.setActionHandler({
                    action: 'seekto'
                }, detail => seek(detail.seekTime ?? 0)).then();
            }
            capacitor_media_session_1.MediaSession.setActionHandler({
                action: 'previoustrack',
            }, previous).then();
            capacitor_media_session_1.MediaSession.setActionHandler({
                action: 'nexttrack',
            }, next).then();
            capacitor_media_session_1.MediaSession.setActionHandler({
                action: 'stop',
            }, stop).then();
        }
    }
    setPlaybackState(playbackState) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = playbackState;
        }
        else {
            capacitor_media_session_1.MediaSession.setPlaybackState({
                playbackState: playbackState,
            }).then();
        }
    }
    setMetadata({ title, artist, album, artwork }) {
        let artworkList = [];
        if (typeof artwork !== 'undefined' && Array.isArray(artwork)) {
            artworkList = artwork;
        }
        else if (typeof artwork === 'string') {
            artworkList = artwork
                ? [
                    {
                        src: encodeURI(`${artwork}?width=96&type=png&aspect_ratio=1`),
                        sizes: '96x96',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpeg',
                    },
                    {
                        src: encodeURI(`${artwork}?width=128&type=png&aspect_ratio=1`),
                        sizes: '128x128',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpeg',
                    },
                    {
                        src: encodeURI(`${artwork}?width=192&type=png&aspect_ratio=1`),
                        sizes: '192x192',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpeg',
                    },
                    {
                        src: encodeURI(`${artwork}?width=256&type=png&aspect_ratio=1`),
                        sizes: '256x256',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpeg',
                    },
                    {
                        src: encodeURI(`${artwork}?width=384&type=png&aspect_ratio=1`),
                        sizes: '384x384',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpeg',
                    },
                    {
                        src: encodeURI(`${artwork}?width=512&type=png&aspect_ratio=1`),
                        sizes: '512x512',
                        type: artwork.endsWith('.png') || artwork.includes('type=png')
                            ? 'image/png'
                            : 'image/jpg',
                    },
                ]
                : [];
        }
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = null;
            navigator.mediaSession.metadata = new MediaMetadata({
                title,
                artist,
                album,
                artwork: artworkList,
            });
        }
        else {
            try {
                capacitor_media_session_1.MediaSession.setMetadata({
                    title,
                    artist,
                    album,
                    artwork: artworkList,
                }).then();
            }
            catch (e) {
                console.error('CapMediaSession.setMetadata', e);
            }
        }
    }
    setPositionState({ duration, playbackRate, position }) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setPositionState({
                duration,
                playbackRate,
                position,
            });
        }
        else {
            capacitor_media_session_1.MediaSession.setPositionState({
                duration,
                playbackRate,
                position,
            }).then();
        }
    }
}
exports.default = MediaSession;
