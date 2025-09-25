import { registerRootComponent } from 'expo';
import TrackPlayer, { Capability, Event } from 'react-native-track-player';
import App from './App';

registerRootComponent(App);

async function setupTrackPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  } catch {}
}

setupTrackPlayer();

TrackPlayer.registerPlaybackService(() => require('./trackPlayerService').default);
