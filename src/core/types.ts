// Story Scene Types
export interface StoryChoice {
  id: string;
  text: string;
  requirements?: {
    stats?: { [key: string]: number };
    items?: string[];
    flags?: string[];
  };
  effects?: {
    stats?: { [key: string]: number };
    resources?: {
      gold?: number;
      soldiers?: number;
      reputation?: number;
    };
    items?: { add?: string[]; remove?: string[] };
    flags?: { add?: string[]; remove?: string[] };
  };
  nextSceneId: string;
}

export interface StoryScene {
  id: string;
  title: string;
  text: string[];
  speaker?: string;
  background?: string;
  choices: StoryChoice[];
}

// Player Character (for storage)
export interface PlayerCharacterData {
  name: string;
  leadership: number;
  war: number;
  intelligence: number;
  politics: number;
  charm: number;
  gold: number;
  soldiers: number;
  reputation: number;
  flags: string[];
  items: string[];
  relationships: { [characterId: string]: number };
}

// Runtime Player Character (with Set for flags)
export interface PlayerCharacter {
  name: string;
  leadership: number;
  war: number;
  intelligence: number;
  politics: number;
  charm: number;
  gold: number;
  soldiers: number;
  reputation: number;
  flags: Set<string>;
  items: string[];
  relationships: { [characterId: string]: number };
}

// Save Data
export interface SaveData {
  id: string;
  currentSceneId: string;
  currentSceneTitle: string;
  sceneHistory: string[];
  player: PlayerCharacterData;
  currentChapter: number;
  savedAt: string; // ISO timestamp
}

// Game State
export interface StoryGameState {
  currentSceneId: string;
  sceneHistory: string[];
  player: PlayerCharacter;
  currentChapter: number;

  // Actions
  makeChoice: (choiceId: string) => void;
  goToScene: (sceneId: string) => void;
  resetGame: () => void;
  saveGame: (slotId: string) => void;
  loadGame: (slotId: string) => boolean;
  deleteSave: (slotId: string) => void;
  getAllSaves: () => SaveData[];
}
