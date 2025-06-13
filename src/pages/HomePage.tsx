import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, MessageSquare, Edit3 } from 'lucide-react';

export function HomePage() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };

  const handleQuickStart = () => {
    const randomRoomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    navigate(`/room/${randomRoomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero section */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Collaborative Design Canvas
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create, edit, and collaborate on designs in real-time. Built with React and Liveblocks 
              for seamless multi-user experiences.
            </p>
            
            {/* Quick start button */}
            <button
              onClick={handleQuickStart}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Zap className="mr-2" size={24} />
              Quick Start Demo
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Collaboration</h3>
              <p className="text-gray-600">
                See live cursors, user presence, and collaborative editing with multiple users simultaneously.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Edit3 className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Canvas</h3>
              <p className="text-gray-600">
                Drag, drop, resize, and edit text boxes with smooth interactions and visual feedback.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contextual Comments</h3>
              <p className="text-gray-600">
                Add comments and feedback directly on design elements for effective communication.
              </p>
            </div>
          </div>

          {/* Room ID form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Join Existing Room</h2>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={!roomId.trim()}
                className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Join Room
              </button>
            </form>
          </div>

          {/* Instructions */}
          <div className="mt-16 bg-blue-50 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Creating Content</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Double-click on canvas to create text boxes</li>
                  <li>• Double-click text boxes to edit content</li>
                  <li>• Drag text boxes to reposition them</li>
                  <li>• Use resize handles to change dimensions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• See live cursors of other users</li>
                  <li>• View real-time editing indicators</li>
                  <li>• Share room ID with team members</li>
                  <li>• Use Escape key to deselect elements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}