import React from 'react';
import { Users, Undo, Redo, Download, Settings } from 'lucide-react';
import { useOthers, useSelf, useUndo, useRedo, useCanUndo, useCanRedo } from '../lib/liveblocks';

export function Toolbar() {
  const others = useOthers();
  const self = useSelf();
  const undo = useUndo();
  const redo = useRedo();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const activeUsers = others.length + (self ? 1 : 0);

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-4">
        {/* Active users indicator */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users size={16} />
          <span className="font-medium">{activeUsers}</span>
          <span>online</span>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        {/* Undo/Redo */}
        <div className="flex items-center space-x-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        {/* Additional tools */}
        <div className="flex items-center space-x-1">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Export"
          >
            <Download size={16} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}