import { ActionHandler } from '@jofr/capacitor-media-session';
interface MetadataOptions extends Omit<MediaMetadataInit, 'artwork'> {
    artwork: MediaMetadataInit['artwork'] | string | undefined;
}
export default class MediaSession {
    setActionHandler({ play, pause, stop, previous, next, seek, getPosition, }: {
        play?: MediaSessionActionHandler;
        pause?: MediaSessionActionHandler;
        stop?: MediaSessionActionHandler;
        previous?: MediaSessionActionHandler;
        next?: MediaSessionActionHandler;
        seek?: (number: number) => void;
        getPosition?: () => number;
    }): void;
    setPlaybackState(playbackState: MediaSessionPlaybackState): void;
    setMetadata({ title, artist, album, artwork }: MetadataOptions): void;
    setPositionState({ duration, playbackRate, position }: {
        duration: number;
        playbackRate: number;
        position: number;
    }): void;
}
export { ActionHandler, };
