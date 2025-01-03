// noinspection JSUnusedGlobalSymbols

import {ActionHandler, MediaSession as CapMediaSession} from '@jofr/capacitor-media-session';

interface MetadataOptions extends Omit<MediaMetadataInit, 'artwork'> {
	artwork: MediaMetadataInit['artwork'] | string | undefined;
}

export default class MediaSession {
	setActionHandler({
		 play, pause, stop,
		 previous, next, seek,
		 getPosition,
	}: {
		 play?: MediaSessionActionHandler;
		 pause?: MediaSessionActionHandler;
		 stop?: MediaSessionActionHandler;
		 previous?: MediaSessionActionHandler;
		 next?: MediaSessionActionHandler;
		 seek?: (number: number) => void;
		 getPosition?: () => number;
	}
	) {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.setActionHandler(
				'previoustrack',
				previous ?? (() => {
				})
			);

			navigator.mediaSession.setActionHandler(
				'nexttrack',
				next ?? (() => {
				})
			);

			if (
				typeof seek === 'function' &&
				typeof getPosition === 'function'
			) {
				navigator.mediaSession.setActionHandler(
					'seekbackward',
					(details) =>
						seek(getPosition() - (details.seekTime ?? 30))
				);

				navigator.mediaSession.setActionHandler(
					'seekforward',
					(details) =>
						seek(getPosition() + (details.seekTime ?? 30))
				);

				navigator.mediaSession.setActionHandler('seekto', (details) =>
					seek(details.seekTime as number)
				);
			}

			navigator.mediaSession.setActionHandler('play', play ?? (() => {
			}));

			navigator.mediaSession.setActionHandler('stop', stop ?? (() => {
			}));

			navigator.mediaSession.setActionHandler(
				'pause',
				pause ?? (() => {
				})
			);
		} else {
			CapMediaSession.setActionHandler(
				{
					action: 'play',
				},
				play as ActionHandler
			).then();

			CapMediaSession.setActionHandler(
				{
					action: 'pause',
				},
				pause as ActionHandler
			).then();

			if (
				typeof seek === 'function' &&
				typeof getPosition === 'function'
			) {
				CapMediaSession.setActionHandler({
					action: 'seekbackward'
				}, details => seek(getPosition() - (details.seekTime ?? 30))).then();

				CapMediaSession.setActionHandler({
					action: 'seekforward'
				}, details => seek(getPosition() + (details.seekTime ?? 30))).then();

				CapMediaSession.setActionHandler({
					action: 'seekto'
				}, detail => seek(detail.seekTime ?? 0)).then();
			}

			CapMediaSession.setActionHandler(
				{
					action: 'previoustrack',
				},
				previous as ActionHandler
			).then();

			CapMediaSession.setActionHandler(
				{
					action: 'nexttrack',
				},
				next as ActionHandler
			).then();

			CapMediaSession.setActionHandler(
				{
					action: 'stop',
				},
				stop as ActionHandler
			).then();
		}
	}

	setPlaybackState(playbackState: MediaSessionPlaybackState) {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.playbackState = playbackState;
		} else {
			CapMediaSession.setPlaybackState({
				playbackState: playbackState,
			}).then();
		}
	}

	setMetadata({title, artist, album, artwork}: MetadataOptions) {
		let artworkList: MediaImage[] = [];

		if (typeof artwork !== 'undefined' && Array.isArray(artwork)) {
			artworkList = artwork;
		} else if (typeof artwork === 'string') {
			artworkList = artwork
				? [
					{
						src: encodeURI(
							`${artwork}?width=96&type=png&aspect_ratio=1`
						),
						sizes: '96x96',
						type: artwork.endsWith('.png') || artwork.includes('type=png')
							? 'image/png'
							: 'image/jpeg',
					},
					{
						src: encodeURI(
							`${artwork}?width=128&type=png&aspect_ratio=1`
						),
						sizes: '128x128',
						type: artwork.endsWith('.png') || artwork.includes('type=png')
							? 'image/png'
							: 'image/jpeg',
					},
					{
						src: encodeURI(
							`${artwork}?width=192&type=png&aspect_ratio=1`
						),
						sizes: '192x192',
						type: artwork.endsWith('.png') || artwork.includes('type=png')
							? 'image/png'
							: 'image/jpeg',
					},
					{
						src: encodeURI(
							`${artwork}?width=256&type=png&aspect_ratio=1`
						),
						sizes: '256x256',
						type: artwork.endsWith('.png') || artwork.includes('type=png')
							? 'image/png'
							: 'image/jpeg',
					},
					{
						src: encodeURI(
							`${artwork}?width=384&type=png&aspect_ratio=1`
						),
						sizes: '384x384',
						type: artwork.endsWith('.png') || artwork.includes('type=png')
							? 'image/png'
							: 'image/jpeg',
					},
					{
						src: encodeURI(
							`${artwork}?width=512&type=png&aspect_ratio=1`
						),
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
		} else {
			try {
				CapMediaSession.setMetadata({
					title,
					artist,
					album,
					artwork: artworkList,
				}).then();
			} catch (e) {
				console.error('CapMediaSession.setMetadata', e);
			}
		}
	}

	setPositionState({
		 duration,
		 playbackRate,
		 position
	}: {
		duration: number;
		playbackRate: number;
		position: number;
	}) {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.setPositionState({
				duration,
				playbackRate,
				position,
			});
		} else {
			CapMediaSession.setPositionState({
				duration,
				playbackRate,
				position,
			}).then();
		}
	}
}

export {
	ActionHandler,
}
