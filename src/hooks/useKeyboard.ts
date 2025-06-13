import { useEffect } from 'react';
import { useMyPresence } from '../lib/liveblocks';

export function useKeyboard(onDelete: () => void, onEscape: () => void) {
  const [myPresence, updateMyPresence] = useMyPresence();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle delete key
      if ((event.key === 'Delete' || event.key === 'Backspace') && myPresence.selection) {
        event.preventDefault();
        onDelete();
      }

      // Handle escape key
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
      }

      // Update typing status
      if (event.target instanceof HTMLTextAreaElement || 
          (event.target instanceof HTMLElement && event.target.contentEditable === 'true')) {
        updateMyPresence({ isTyping: true });
      }
    };

    const handleKeyUp = () => {
      updateMyPresence({ isTyping: false });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [myPresence.selection, onDelete, onEscape, updateMyPresence]);
}