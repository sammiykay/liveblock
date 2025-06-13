import React, { useCallback } from 'react';
import { useStorage, useMyPresence } from '../lib/liveblocks';
import { useCanvas } from '../hooks/useCanvas';
import { useKeyboard } from '../hooks/useKeyboard';
import { TextBoxComponent } from './TextBox';
import { LiveCursors } from './LiveCursors';
import { Toolbar } from './Toolbar';

export function Canvas() {
  const textBoxes = useStorage((root) => root.textBoxes);
  const [myPresence] = useMyPresence();
  
  const {
    canvasRef,
    updateCursor,
    createTextBox,
    updateTextBox,
    deleteTextBox,
    selectTextBox,
  } = useCanvas();

  // Handle canvas double-click to create new text box
  const handleCanvasDoubleClick = useCallback((event: React.MouseEvent) => {
    if (event.target === canvasRef.current) {
      const bounds = canvasRef.current!.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      
      const newId = createTextBox({ x, y });
      selectTextBox(newId);
    }
  }, [createTextBox, selectTextBox]);

  // Handle canvas click to deselect
  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (event.target === canvasRef.current) {
      selectTextBox(null);
    }
  }, [selectTextBox]);

  // Handle delete selected text box
  const handleDelete = useCallback(() => {
    if (myPresence.selection) {
      deleteTextBox(myPresence.selection);
      selectTextBox(null);
    }
  }, [myPresence.selection, deleteTextBox, selectTextBox]);

  // Handle escape to deselect
  const handleEscape = useCallback(() => {
    selectTextBox(null);
  }, [selectTextBox]);

  useKeyboard(handleDelete, handleEscape);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <Toolbar />
      
      <div
        ref={canvasRef}
        className="relative w-full h-full cursor-crosshair"
        onPointerMove={updateCursor}
        onDoubleClick={handleCanvasDoubleClick}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(#e5e7eb 1px, transparent 1px),
              linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Text boxes */}
        {textBoxes && Object.values(textBoxes).map((textBox) => (
          <TextBoxComponent
            key={textBox.id}
            textBox={textBox}
            isSelected={myPresence.selection === textBox.id}
            onSelect={() => selectTextBox(textBox.id)}
            onUpdate={(updates) => updateTextBox(textBox.id, updates)}
            onDelete={() => deleteTextBox(textBox.id)}
          />
        ))}

        {/* Live cursors */}
        <LiveCursors />
      </div>
    </div>
  );
}