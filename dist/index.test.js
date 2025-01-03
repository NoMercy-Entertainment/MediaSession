"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
describe('MediaSession', () => {
    let mediaSession;
    beforeAll(() => {
        // Mock global.navigator
        // @ts-ignore
        // noinspection JSConstantReassignment
        global.navigator = {};
        // Mocking MediaMetadata
        // @ts-ignore
        global.MediaMetadata = class {
            constructor(metadata) {
                Object.assign(this, metadata);
            }
        };
        // Mocking navigator.mediaSession
        // @ts-ignore
        // noinspection JSConstantReassignment
        global.navigator.mediaSession = {
            setActionHandler: jest.fn(),
            setPositionState: jest.fn(),
            metadata: null,
            playbackState: '',
        };
    });
    beforeEach(() => {
        mediaSession = new index_1.default();
    });
    test('should set metadata correctly', () => {
        const metadata = {
            title: 'Test Song',
            artist: 'Test Artist',
            album: 'Test Album',
            artwork: 'https://example.com/test-artwork.jpg',
        };
        mediaSession.setMetadata(metadata);
        expect(navigator.mediaSession.metadata).toEqual(expect.objectContaining({
            title: 'Test Song',
            artist: 'Test Artist',
            album: 'Test Album',
            artwork: expect.any(Array),
        }));
    });
    test('should set playback state correctly', () => {
        mediaSession.setPlaybackState('playing');
        expect(navigator.mediaSession.playbackState).toBe('playing');
    });
    test('should set position state correctly', () => {
        const positionState = {
            duration: 200,
            playbackRate: 1,
            position: 50,
        };
        mediaSession.setPositionState(positionState);
        expect(navigator.mediaSession.setPositionState).toHaveBeenCalledWith(positionState);
    });
    test('should set action handlers correctly', () => {
        const playHandler = jest.fn();
        const pauseHandler = jest.fn();
        const seekHandler = jest.fn();
        const getPositionMock = jest.fn().mockReturnValue(30);
        mediaSession.setActionHandler({
            play: playHandler,
            pause: pauseHandler,
            seek: seekHandler,
            getPosition: getPositionMock,
        });
        expect(navigator.mediaSession.setActionHandler).toHaveBeenCalledWith('play', playHandler);
        expect(navigator.mediaSession.setActionHandler).toHaveBeenCalledWith('pause', pauseHandler);
        expect(navigator.mediaSession.setActionHandler).toHaveBeenCalledWith('seekto', expect.any(Function));
    });
});
