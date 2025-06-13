import React from 'react';
import { RoomProvider } from '../lib/liveblocks';
import { Canvas } from './Canvas';
import { LoadingScreen } from './LoadingScreen';
import { ErrorBoundary } from './ErrorBoundary';

interface RoomProps {
  roomId: string;
}

export function Room({ roomId }: RoomProps) {
  return (
    <ErrorBoundary>
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
          selection: null,
          isTyping: false,
          lastActivity: Date.now(),
        }}
        initialStorage={{
          textBoxes: {},
          comments: {},
        }}
      >
        <Canvas />
      </RoomProvider>
    </ErrorBoundary>
  );
}