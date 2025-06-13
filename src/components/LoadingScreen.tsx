import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 animate-spin text-blue-500" size={48} />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Connecting to collaborative room...
        </h2>
        <p className="text-gray-600">
          Setting up real-time collaboration features
        </p>
      </div>
    </div>
  );
}