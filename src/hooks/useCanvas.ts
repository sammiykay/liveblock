import { useCallback, useRef, useState } from 'react';
import { useMyPresence, useMutation } from '../lib/liveblocks';
import { TextBox } from '../lib/liveblocks';

export function useCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [myPresence, updateMyPresence] = useMyPresence();

  // Update cursor position
  const updateCursor = useCallback((event: React.PointerEvent) => {
    if (!canvasRef.current) return;
    
    const bounds = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    
    updateMyPresence({ cursor: { x, y } });
  }, [updateMyPresence]);

  // Create new text box
  const createTextBox = useMutation(({ storage }, point: { x: number; y: number }) => {
    const textBoxes = storage.get('textBoxes');
    const id = Date.now().toString();
    
    const newTextBox: TextBox = {
      id,
      x: point.x,
      y: point.y,
      width: 200,
      height: 100,
      text: 'Double-click to edit',
      color: '#374151',
      fontSize: 16,
      isSelected: false,
    };
    
    textBoxes.set(id, newTextBox);
    return id;
  }, []);

  // Update text box
  const updateTextBox = useMutation(({ storage }, id: string, updates: Partial<TextBox>) => {
    const textBoxes = storage.get('textBoxes');
    const textBox = textBoxes.get(id);
    if (textBox) {
      textBoxes.set(id, { ...textBox, ...updates });
    }
  }, []);

  // Delete text box
  const deleteTextBox = useMutation(({ storage }, id: string) => {
    const textBoxes = storage.get('textBoxes');
    textBoxes.delete(id);
  }, []);

  // Select text box
  const selectTextBox = useCallback((id: string | null) => {
    updateMyPresence({ selection: id });
  }, [updateMyPresence]);

  return {
    canvasRef,
    isDragging,
    setIsDragging,
    dragOffset,
    setDragOffset,
    updateCursor,
    createTextBox,
    updateTextBox,
    deleteTextBox,
    selectTextBox,
  };
}