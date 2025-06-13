import React from 'react';
import { useOthers } from '../lib/liveblocks';
import { MousePointer2 } from 'lucide-react';

const COLORS = [
  '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
  '#16A34A', '#059669', '#0891B2', '#0284C7', '#2563EB',
  '#4F46E5', '#7C3AED', '#9333EA', '#C026D3', '#DB2777'
];

export function LiveCursors() {
  const others = useOthers();

  return (
    <>
      {others.map(({ connectionId, presence, info }) => {
        if (!presence?.cursor) return null;

        const userColor = COLORS[connectionId % COLORS.length];
        const userName = info?.name || `User ${connectionId}`;

        return (
          <div
            key={connectionId}
            className="absolute pointer-events-none z-50"
            style={{
              left: presence.cursor.x,
              top: presence.cursor.y,
              transform: 'translate(-2px, -2px)',
            }}
          >
            {/* Cursor icon */}
            <MousePointer2
              size={20}
              style={{ color: userColor }}
              className="drop-shadow-sm"
            />
            
            {/* User name label */}
            <div
              className="absolute top-5 left-2 px-2 py-1 rounded text-white text-xs font-medium whitespace-nowrap"
              style={{ backgroundColor: userColor }}
            >
              {userName}
              {presence.isTyping && (
                <span className="ml-1 animate-pulse">✏️</span>
              )}
            </div>

            {/* Selection indicator */}
            {presence.selection && (
              <div
                className="absolute top-8 left-2 px-1 py-0.5 rounded text-xs font-medium opacity-75"
                style={{ 
                  backgroundColor: userColor,
                  color: 'white',
                }}
              >
                Editing
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}