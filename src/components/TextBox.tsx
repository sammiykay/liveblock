import React, { useCallback, useRef, useState, useEffect } from 'react';
import { MessageCircle, Trash2, Move } from 'lucide-react';
import { TextBox } from '../lib/liveblocks';
import { useMyPresence } from '../lib/liveblocks';

interface TextBoxProps {
  textBox: TextBox;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<TextBox>) => void;
  onDelete: () => void;
}

export function TextBoxComponent({ 
  textBox, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete 
}: TextBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [myPresence, updateMyPresence] = useMyPresence();

  // Handle text editing
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onSelect();
  }, [onSelect]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ text: e.target.value });
  }, [onUpdate]);

  const handleTextBlur = useCallback(() => {
    setIsEditing(false);
    updateMyPresence({ isTyping: false });
  }, [updateMyPresence]);

  const handleTextKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      updateMyPresence({ isTyping: false });
    }
    e.stopPropagation();
  }, [updateMyPresence]);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isEditing) return;
    
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - textBox.x,
      y: e.clientY - textBox.y,
    });
  }, [isEditing, onSelect, textBox.x, textBox.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
  }, [isDragging, dragStart, onUpdate]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle resize handles
  const handleResize = useCallback((e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = textBox.width;
    const startHeight = textBox.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      
      if (direction.includes('right')) {
        newWidth = Math.max(100, startWidth + deltaX);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(50, startHeight + deltaY);
      }
      
      onUpdate({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [textBox.width, textBox.height, onUpdate]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      updateMyPresence({ isTyping: true });
    }
  }, [isEditing, updateMyPresence]);

  return (
    <div
      className={`absolute border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 shadow-lg' 
          : 'border-transparent hover:border-gray-300'
      } ${isDragging ? 'shadow-xl scale-105' : ''}`}
      style={{
        left: textBox.x,
        top: textBox.y,
        width: textBox.width,
        height: textBox.height,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {/* Main content area */}
      <div className="relative w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={textBox.text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            className="w-full h-full p-3 border-none outline-none resize-none"
            style={{
              fontSize: textBox.fontSize,
              color: textBox.color,
              fontFamily: 'Inter, sans-serif',
            }}
          />
        ) : (
          <div
            className="w-full h-full p-3 cursor-pointer"
            style={{
              fontSize: textBox.fontSize,
              color: textBox.color,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {textBox.text || 'Double-click to edit'}
          </div>
        )}
        
        {/* Selection toolbar */}
        {isSelected && !isEditing && (
          <div className="absolute -top-12 left-0 flex items-center space-x-2 bg-white rounded-lg shadow-lg border px-2 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1 hover:bg-gray-100 rounded"
              title="Edit text"
            >
              <Move size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Add comment functionality
              }}
              className="p-1 hover:bg-gray-100 rounded"
              title="Add comment"
            >
              <MessageCircle size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-red-100 text-red-600 rounded"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Resize handles */}
      {isSelected && !isEditing && (
        <>
          <div
            className="absolute -right-1 -bottom-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize"
            onMouseDown={(e) => handleResize(e, 'bottom-right')}
          />
          <div
            className="absolute -right-1 top-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-e-resize transform -translate-y-1/2"
            onMouseDown={(e) => handleResize(e, 'right')}
          />
          <div
            className="absolute -bottom-1 left-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-s-resize transform -translate-x-1/2"
            onMouseDown={(e) => handleResize(e, 'bottom')}
          />
        </>
      )}
    </div>
  );
}