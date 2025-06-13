import React from 'react';
import { useParams } from 'react-router-dom';
import { Room } from '../components/Room';

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Invalid Room</h2>
          <p className="text-gray-600">No room ID provided.</p>
        </div>
      </div>
    );
  }

  return <Room roomId={roomId} />;
}