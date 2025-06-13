import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Using your provided Liveblocks public key
const client = createClient({
  publicApiKey: "pk_dev_EsUP6uuQ_EGqCv5ngC_XYsHzBRB-g8y_ONPjaEOFcZLceOk_ZO75It8cNDsiKO0O",
  // For demo purposes, we'll use throttle: 16 for smooth interactions
  throttle: 16,
});

// Define types for our collaborative state
export type TextBox = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
  fontSize: number;
  isSelected: boolean;
};

export type Comment = {
  id: string;
  textBoxId: string;
  x: number;
  y: number;
  text: string;
  author: string;
  timestamp: number;
};

export type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string | null;
  isTyping: boolean;
  lastActivity: number;
};

export type Storage = {
  textBoxes: Record<string, TextBox>;
  comments: Record<string, Comment>;
};

// Create room context with proper typing
export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useOthers,
  useSelf,
  useStorage,
  useMutation,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
} = createRoomContext<Presence, Storage>(client);