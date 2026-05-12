import { MoodBoard } from './types';

const STORAGE_KEY = 'moodquest_saved_boards';

export interface SavedBoard extends MoodBoard {
  id: string;
  savedAt: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getSavedBoards(): SavedBoard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const boards: SavedBoard[] = JSON.parse(raw);
    return boards.sort((a, b) => b.savedAt - a.savedAt);
  } catch {
    return [];
  }
}

export function saveBoard(board: MoodBoard): SavedBoard {
  const boards = getSavedBoards();
  const saved: SavedBoard = {
    ...board,
    id: board.id || generateId(),
    savedAt: Date.now(),
  };

  // Don't duplicate — update if same title+category exists
  const existingIdx = boards.findIndex(
    (b) => b.title.toLowerCase() === saved.title.toLowerCase() && b.category === saved.category
  );
  if (existingIdx >= 0) {
    boards[existingIdx] = saved;
  } else {
    boards.unshift(saved);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  return saved;
}

export function deleteBoard(id: string): void {
  const boards = getSavedBoards().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
}

export function getBoardById(id: string): SavedBoard | null {
  return getSavedBoards().find((b) => b.id === id) || null;
}
