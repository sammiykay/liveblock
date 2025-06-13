import { useState, useEffect } from 'react';
import { supabase, CanvasData } from '../lib/supabase';

export function useCanvasData(roomId: string) {
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCanvasData();
  }, [roomId]);

  const fetchCanvasData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('canvas_data')
        .select('*')
        .eq('room_id', roomId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }
      
      setCanvasData(data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveCanvasData = async (data: any) => {
    try {
      if (canvasData) {
        // Update existing canvas data
        const { error } = await supabase
          .from('canvas_data')
          .update({ data })
          .eq('room_id', roomId);

        if (error) throw error;
      } else {
        // Create new canvas data entry
        const { error } = await supabase
          .from('canvas_data')
          .insert({
            room_id: roomId,
            data,
            project_id: null, // Will be null for standalone rooms
          });

        if (error) throw error;
      }
      
      await fetchCanvasData();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to save canvas data');
    }
  };

  return {
    canvasData,
    loading,
    error,
    saveCanvasData,
    refetch: fetchCanvasData,
  };
}