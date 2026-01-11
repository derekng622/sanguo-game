import { useStoryGame } from './core/gameState'
import { useCurrentScene } from './core/gameState'
import type { SaveData } from './core/types'
import { useEffect, useState } from 'react'
import './index.css'

// 属性名翻译
const statNames: { [key: string]: string } = {
  leadership: '统率',
  war: '武力',
  intelligence: '智力',
  politics: '政治',
  charm: '魅力',
}

// 资源名翻译
const resourceNames: { [key: string]: string } = {
  gold: '金钱',
  soldiers: '士兵',
  reputation: '声望',
}

// 格式化时间
const formatSaveTime = (isoString: string) => {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 7) return `${diffDays}天前`

  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function App() {
  const { player, makeChoice, resetGame, sceneHistory, saveGame, loadGame, deleteSave, getAllSaves } = useStoryGame()
  const scene = useCurrentScene()
  const [showLoadScreen, setShowLoadScreen] = useState(true)
  const [showSaveMenu, setShowSaveMenu] = useState(false)
  const [message, setMessage] = useState('')
  const [saves, setSaves] = useState<SaveData[]>([])

  // Refresh saves when needed
  const refreshSaves = () => {
    setSaves(getAllSaves())
  }

  // Check for save data on mount
  useEffect(() => {
    refreshSaves()
  }, [getAllSaves])

  const handleLoadGame = (slotId: string) => {
    const success = loadGame(slotId)
    if (success) {
      setShowLoadScreen(false)
      setMessage('游戏已加载！')
      setTimeout(() => setMessage(''), 2000)
    } else {
      setMessage('加载失败！')
    }
  }

  const handleNewGame = () => {
    resetGame()
    setShowLoadScreen(false)
  }

  const handleSaveGame = (slotId: string) => {
    saveGame(slotId)
    refreshSaves()
    setShowSaveMenu(false)
    setMessage('游戏已保存！')
    setTimeout(() => setMessage(''), 2000)
  }

  const handleDeleteSave = (slotId: string) => {
    if (confirm('确定要删除这个存档吗？')) {
      deleteSave(slotId)
      refreshSaves()
    }
  }

  // Get available choices (check requirements)
  const availableChoices = scene.choices.filter(choice => {
    if (!choice.requirements) return true

    // Check stats requirements
    if (choice.requirements.stats) {
      for (const [stat, required] of Object.entries(choice.requirements.stats)) {
        if ((player as any)[stat] < required) return false
      }
    }

    // Check flags requirements
    if (choice.requirements.flags) {
      const playerFlags = Array.from(player.flags)
      if (!choice.requirements.flags.every(flag => playerFlags.includes(flag))) return false
    }

    // Check items requirements
    if (choice.requirements.items) {
      if (!choice.requirements.items.every(item => player.items.includes(item))) return false
    }

    return true
  })

  const handleChoice = (choiceId: string) => {
    makeChoice(choiceId)
    window.scrollTo(0, 0)
  }

  // Load/Start screen
  if (showLoadScreen) {
    return (
      <div className="min-h-screen bg-paper-beige text-ink-black font-serif flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-6xl font-bold text-crimson-red text-center mb-4">三国演义</h1>
          <p className="text-xl text-gray-600 text-center mb-12">互动故事游戏</p>

          {/* Existing saves */}
          {saves.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">继续游戏</h2>
              <div className="space-y-3">
                {saves.map((save) => (
                  <div
                    key={save.id}
                    className="bg-white/80 p-4 rounded-lg border-2 border-gray-300 hover:border-crimson-red transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-1">{save.currentSceneTitle}</div>
                        <div className="text-sm text-gray-500">
                          {save.player.name} · 声望 {save.player.reputation}
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatSaveTime(save.savedAt)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadGame(save.id)}
                          className="bg-crimson-red text-paper-beige px-4 py-2 rounded hover:bg-red-900 cursor-pointer"
                        >
                          读取
                        </button>
                        <button
                          onClick={() => handleDeleteSave(save.id)}
                          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New game button */}
          <button
            onClick={handleNewGame}
            className="w-full bg-ink-black text-paper-beige px-8 py-4 rounded-lg shadow-lg hover:bg-gray-800 transition-colors text-xl font-bold cursor-pointer"
          >
            {saves.length > 0 ? '开始新游戏' : '开始游戏'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper-beige text-ink-black font-serif">
      {/* Top Bar - Player Stats */}
      <div className="bg-ink-black text-paper-beige px-6 py-3 flex justify-between items-center text-sm">
        <div className="flex gap-6">
          <span className="font-bold">{player.name}</span>
          <span>统率: {player.leadership}</span>
          <span>武力: {player.war}</span>
          <span>智力: {player.intelligence}</span>
          <span>政治: {player.politics}</span>
          <span>魅力: {player.charm}</span>
        </div>
        <div className="flex gap-6 items-center">
          <span>金钱: {player.gold}</span>
          <span>士兵: {player.soldiers}</span>
          <span>声望: {player.reputation}</span>
          <button
            onClick={() => {
              refreshSaves()
              setShowSaveMenu(true)
            }}
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded cursor-pointer"
          >
            保存/读取
          </button>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-ink-black text-paper-beige px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Save/Load Menu */}
      {showSaveMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-8">
          <div className="bg-paper-beige rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">保存/读取游戏</h2>
                <button
                  onClick={() => setShowSaveMenu(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Save slots */}
              <div className="space-y-3 mb-6">
                {/* Save slots 1-5 */}
                {[1, 2, 3, 4, 5].map((slotNum) => {
                  const slotId = `save_${slotNum}`
                  const existingSave = saves.find(s => s.id === slotId)

                  return (
                    <div
                      key={slotId}
                      className="bg-white/60 p-4 rounded-lg border-2 border-gray-300"
                    >
                      {existingSave ? (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-bold text-lg mb-1">{existingSave.currentSceneTitle}</div>
                            <div className="text-sm text-gray-500">
                              {existingSave.player.name} · 声望 {existingSave.player.reputation}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatSaveTime(existingSave.savedAt)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLoadGame(slotId)}
                              className="bg-crimson-red text-paper-beige px-4 py-2 rounded hover:bg-red-900 cursor-pointer"
                            >
                              读取
                            </button>
                            <button
                              onClick={() => handleSaveGame(slotId)}
                              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
                            >
                              覆盖
                            </button>
                            <button
                              onClick={() => handleDeleteSave(slotId)}
                              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="text-gray-400">存档 {slotNum} - 空槽位</div>
                          <button
                            onClick={() => handleSaveGame(slotId)}
                            className="bg-ink-black text-paper-beige px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
                          >
                            保存
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="text-center text-sm text-gray-500">
                当前进度：{scene.title}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Story Area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Chapter Title */}
        <h1 className="text-4xl font-bold text-crimson-red text-center mb-2">
          {scene.title}
        </h1>

        {/* Speaker */}
        {scene.speaker && (
          <p className="text-center text-gray-500 mb-6 italic">
            —— {scene.speaker} ——
          </p>
        )}

        {/* Story Text */}
        <div className="bg-white/60 p-8 rounded-lg shadow-lg border-2 border-gray-300 mb-8">
          {scene.text.map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed indent-8">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Choices */}
        <div className="space-y-4">
          {availableChoices.length === 0 ? (
            <p className="text-center text-gray-500">暂无可用选项...</p>
          ) : (
            availableChoices.map(choice => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                className="w-full text-left bg-white hover:bg-crimson-red hover:text-paper-beige transition-all duration-300 p-6 rounded-lg shadow-md border-2 border-gray-300 hover:border-crimson-red cursor-pointer"
              >
                <div className="font-bold text-lg mb-2">{choice.text}</div>

                {/* Show locked requirements if any */}
                {choice.requirements && (
                  <div className="text-sm text-gray-500 mt-2">
                    {choice.requirements.stats && (
                      <span className="mr-3">
                        需要: {Object.entries(choice.requirements.stats)
                          .map(([stat, val]) => `${statNames[stat] || stat} ${val}`)
                          .join(', ')}
                      </span>
                    )}
                  </div>
                )}

                {/* Show effects preview */}
                {choice.effects && (
                  <div className="text-xs text-gray-400 mt-1">
                    {choice.effects.stats && (
                      <span className="mr-3">
                        属性: {Object.entries(choice.effects.stats)
                          .map(([stat, val]) => `${statNames[stat] || stat}${val > 0 ? '+' : ''}${val}`)
                          .join(', ')}
                      </span>
                    )}
                    {choice.effects.resources && (
                      <span className="mr-3">
                        资源: {Object.entries(choice.effects.resources)
                          .filter(([_, val]) => val !== 0)
                          .map(([res, val]) => `${resourceNames[res] || res}${val > 0 ? '+' : ''}${val}`)
                          .join(', ')}
                      </span>
                    )}
                    {choice.effects.items?.add && (
                      <span className="mr-3">获得: {choice.effects.items.add.join(', ')}</span>
                    )}
                  </div>
                )}
              </button>
            ))
          )}
        </div>

        {/* Bottom Controls */}
        <div className="mt-12 flex justify-between items-center text-sm text-gray-500">
          <div>
            历史场景: {sceneHistory.length}
          </div>
          <button
            onClick={() => {
              if (confirm('确定要重新开始吗？当前进度将丢失。')) {
                resetGame()
                setShowLoadScreen(true)
                refreshSaves()
              }
            }}
            className="text-crimson-red hover:underline cursor-pointer"
          >
            重新开始
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-500 text-sm space-y-1">
        <div>三国演义 · 互动故事游戏</div>
        <div className="text-xs">作者：小远 · 广州番禺半山</div>
      </div>
    </div>
  )
}

export default App
