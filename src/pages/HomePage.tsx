import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, MessageSquare, Edit3, User, FolderOpen } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import { ProjectsModal } from '../components/ProjectsModal';
import { useAuth } from '../hooks/useAuth';

export function HomePage() {
  const [roomId, setRoomId] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Edit3 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Canvas</h1>
              <p className="text-sm text-gray-500">by sammiykay</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => setShowProjectsModal(true)}
                  className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FolderOpen size={16} className="mr-2" />
                  My Projects
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={16} />
                  </div>
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <button
                    onClick={signOut}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <User size={16} className="mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero section */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Built by sammiykay
            </div>
            
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

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <span>Crafted with</span>
              <span className="text-red-500">♥</span>
              <span>by</span>
              <span className="font-semibold text-gray-700">sammiykay</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <ProjectsModal isOpen={showProjectsModal} onClose={() => setShowProjectsModal(false)} />
    </div>
  );
}