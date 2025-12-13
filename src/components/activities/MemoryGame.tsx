import { useState, useEffect } from 'react';
import { Activity, AccessibilityConfig } from '../../App';
import { ArrowLeft, Clock, Star } from 'lucide-react';

interface MemoryGameProps {
  onComplete: (activity: Activity) => void;
  onBack: () => void;
  accessibilityConfig: AccessibilityConfig;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎺'];

export function MemoryGame({ onComplete, onBack, accessibilityConfig }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (matches === 8 && !gameComplete) {
      setGameComplete(true);
      const score = Math.max(0, 100 - moves * 2);
      const activity: Activity = {
        id: Date.now().toString(),
        type: 'memory',
        completed: true,
        score,
        timeSpent: timeElapsed,
        date: new Date().toISOString(),
      };
      
      setTimeout(() => {
        if (accessibilityConfig.soundEffects) {
          // Play success sound (would need actual audio)
        }
        onComplete(activity);
      }, 1000);
    }
  }, [matches, gameComplete]);

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  return (
    <div className="space-y-6">
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h2 className="text-2xl">Jogo da Memória 🧠</h2>
          <div className="w-24" />
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <Clock className="w-5 h-5" />
            <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
            <Star className="w-5 h-5" />
            <span>Movimentos: {moves}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
            <span>Pares: {matches}/8</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || card.isFlipped}
              className={`aspect-square rounded-xl text-4xl sm:text-5xl flex items-center justify-center transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-blue-400 to-purple-400 scale-95'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gradient-to-br from-blue-200 to-purple-200 hover:scale-105'
              } ${card.isMatched ? 'opacity-50' : ''} ${
                accessibilityConfig.reduceMotion ? '' : 'hover:shadow-lg'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        {gameComplete && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl mb-2 text-gray-800">Parabéns!</h3>
            <p className="text-gray-700">
              Você completou o jogo em {moves} movimentos e {timeElapsed} segundos!
            </p>
            <p className="text-lg mt-2 text-blue-600">
              +{Math.max(0, 100 - moves * 2)} pontos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
