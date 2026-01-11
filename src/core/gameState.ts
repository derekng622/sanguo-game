import { create } from 'zustand';
import type { StoryGameState, PlayerCharacter, PlayerCharacterData, SaveData } from './types';
import { storyScenes } from '../data/storyScenes';

const SAVE_KEY = 'sanguo_story_saves';

const createInitialPlayer = (): PlayerCharacter => ({
  name: '刘玄德',
  leadership: 75,
  war: 73,
  intelligence: 74,
  politics: 78,
  charm: 99,
  gold: 100,
  soldiers: 500,
  reputation: 10,
  flags: new Set<string>(),
  items: [],
  relationships: {
    '关羽': 95,
    '张飞': 92,
    '诸葛亮': 0,
    '曹操': 50,
    '孙权': 30,
  }
});

// Convert runtime player to saveable format
const playerToData = (player: PlayerCharacter): PlayerCharacterData => ({
  ...player,
  flags: Array.from(player.flags),
});

// Convert saveable data to runtime player
const dataToPlayer = (data: PlayerCharacterData): PlayerCharacter => ({
  ...data,
  flags: new Set(data.flags),
});

// Get all saves from localStorage
const getAllSavesFromStorage = (): SaveData[] => {
  try {
    const savesJson = localStorage.getItem(SAVE_KEY);
    if (!savesJson) return [];
    const saves = JSON.parse(savesJson);
    return Array.isArray(saves) ? saves : [];
  } catch (error) {
    console.error('Failed to load saves:', error);
    return [];
  }
};

// Save all saves to localStorage
const saveAllSavesToStorage = (saves: SaveData[]) => {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
};

export const useStoryGame = create<StoryGameState>((set, get) => ({
  currentSceneId: 'intro',
  sceneHistory: [],
  player: createInitialPlayer(),
  currentChapter: 1,

  makeChoice: (choiceId: string) => {
    const state = get();
    const currentScene = storyScenes[state.currentSceneId];
    const choice = currentScene?.choices.find((c: { id: string }) => c.id === choiceId);

    if (!choice || !choice.effects) return;

    // Apply choice effects
    const newPlayer = { ...state.player };

    // Update stats (leadership, war, etc.)
    if (choice.effects.stats) {
      Object.entries(choice.effects.stats).forEach(([stat, value]) => {
        (newPlayer as any)[stat] = Math.max(0, (newPlayer as any)[stat] + value);
      });
    }

    // Update resources (gold, soldiers, reputation)
    if (choice.effects.resources) {
      if (choice.effects.resources.gold !== undefined) {
        newPlayer.gold = Math.max(0, newPlayer.gold + choice.effects.resources.gold);
      }
      if (choice.effects.resources.soldiers !== undefined) {
        newPlayer.soldiers = Math.max(0, newPlayer.soldiers + choice.effects.resources.soldiers);
      }
      if (choice.effects.resources.reputation !== undefined) {
        newPlayer.reputation = Math.max(0, newPlayer.reputation + choice.effects.resources.reputation);
      }
    }

    // Update items
    if (choice.effects.items) {
      if (choice.effects.items.add) {
        newPlayer.items = [...new Set([...newPlayer.items, ...choice.effects.items.add])];
      }
      if (choice.effects.items.remove) {
        newPlayer.items = newPlayer.items.filter(item =>
          !choice.effects!.items!.remove!.includes(item)
        );
      }
    }

    // Update flags
    if (choice.effects.flags) {
      const newFlags = new Set(newPlayer.flags);
      if (choice.effects.flags.add) {
        choice.effects.flags.add.forEach((flag: string) => newFlags.add(flag));
      }
      if (choice.effects.flags.remove) {
        choice.effects.flags.remove.forEach((flag: string) => newFlags.delete(flag));
      }
      newPlayer.flags = newFlags;
    }

    set({
      player: newPlayer,
      currentSceneId: choice.nextSceneId,
      sceneHistory: [...state.sceneHistory, state.currentSceneId],
    });
  },

  goToScene: (sceneId: string) => {
    set(state => ({
      currentSceneId: sceneId,
      sceneHistory: [...state.sceneHistory, state.currentSceneId],
    }));
  },

  resetGame: () => {
    set({
      currentSceneId: 'intro',
      sceneHistory: [],
      player: createInitialPlayer(),
      currentChapter: 1,
    });
  },

  saveGame: (slotId: string) => {
    const state = get();
    const currentScene = storyScenes[state.currentSceneId];

    const saveData: SaveData = {
      id: slotId,
      currentSceneId: state.currentSceneId,
      currentSceneTitle: currentScene?.title || '未知场景',
      sceneHistory: state.sceneHistory,
      player: playerToData(state.player),
      currentChapter: state.currentChapter,
      savedAt: new Date().toISOString(),
    };

    // Get all existing saves, update or add this one
    const saves = getAllSavesFromStorage();
    const existingIndex = saves.findIndex(s => s.id === slotId);

    if (existingIndex >= 0) {
      saves[existingIndex] = saveData;
    } else {
      saves.push(saveData);
    }

    // Sort by saved time (newest first)
    saves.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

    saveAllSavesToStorage(saves);
  },

  loadGame: (slotId: string) => {
    try {
      const saves = getAllSavesFromStorage();
      const saveData = saves.find(s => s.id === slotId);

      if (!saveData) return false;

      set({
        currentSceneId: saveData.currentSceneId,
        sceneHistory: saveData.sceneHistory,
        player: dataToPlayer(saveData.player),
        currentChapter: saveData.currentChapter,
      });
      return true;
    } catch (error) {
      console.error('Failed to load save:', error);
      return false;
    }
  },

  deleteSave: (slotId: string) => {
    const saves = getAllSavesFromStorage();
    const filtered = saves.filter(s => s.id !== slotId);
    saveAllSavesToStorage(filtered);
  },

  getAllSaves: () => {
    return getAllSavesFromStorage();
  },
}));

// Helper to get current scene
export const useCurrentScene = () => {
  const currentSceneId = useStoryGame(state => state.currentSceneId);
  return storyScenes[currentSceneId] || storyScenes['intro'];
};
