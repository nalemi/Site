import { useState, useEffect } from 'react';
import { Activity, AccessibilityConfig } from '../../App';
import { ArrowLeft, Clock, Target } from 'lucide-react';

interface FocusGameProps {
  onComplete: (activity: Activity) => void;
  onBack: () => void;
  accessibilityConfig: AccessibilityConfig;
}

interface FocusObject {
  id: number;
  emoji: string;
  x: number;
  y: number;
  isTarget: boolean;
  clicked: boolean;
}

const targetEmojis = ['⭐', '🌟', '✨'];
const distractorEmojis = ['💫', '🔹', '🔸', '◆', '◇', '○', '●'];

export function FocusGame({ onComplete, onBack, accessibilityConfig }: FocusGameProps) {
  const [objects, setObjects] = useState<FocusObject[]>([]);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [roundTime, setRoundTime] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: '',
  });

  useEffect(() => {
    generateRound();
  }, [round]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      setRoundTime(Math.floor((Date.now() - roundStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, roundStartTime]);

  const generateRound = () => {
    const newObjects: FocusObject[] = [];
    const numTargets = Math.min(3 + round, 6);
    const numDistractors = Math.min(5 + round * 2, 15);
    
    // Add targets
    for (let i = 0; i < numTargets; i++) {
      newObjects.push({
        id: i,
        emoji: targetEmojis[Math.floor(Math.random() * targetEmojis.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        isTarget: true,
        clicked: false,
      });
    }

    // Add distractors
    for (let i = 0; i < numDistractors; i++) {
      newObjects.push({
        id: numTargets + i,
        emoji: distractorEmojis[Math.floor(Math.random() * distractorEmojis.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        isTarget: false,
        clicked: false,
      });
    }

    setObjects(newObjects);
    setRoundStartTime(Date.now());
  };

  const handleClick = (id: number) => {
    const object = objects.find((obj) => obj.id === id);
    if (!object || object.clicked) return;

    const newObjects = objects.map((obj) =>
      obj.id === id ? { ...obj, clicked: true } : obj
    );
    setObjects(newObjects);
    setClicks(clicks + 1);

    if (object.isTarget) {
      setScore(score + 10);
      setFeedback({ show: true, correct: true, message: '+10 pontos! ⭐' });

      // Check if all targets clicked
      const allTargetsClicked = newObjects.filter((obj) => obj.isTarget).every((obj) => obj.clicked);
      if (allTargetsClicked) {
        const bonus = Math.max(0, 30 - roundTime * 2);
        setScore(score + 10 + bonus);
        setFeedback({ show: true, correct: true, message: `Fase completa! +${bonus} bônus de velocidade! 🎉` });
        
        setTimeout(() => {
          if (round < totalRounds) {
            setRound(round + 1);
            setFeedback({ show: false, correct: false, message: '' });
          } else {
            // Game complete
            const finalScore = Math.min(100, Math.round((score + 10 + bonus) / totalRounds * 2));
            const activity: Activity = {
              id: Date.now().toString(),
              type: 'focus',
              completed: true,
              score: finalScore,
              timeSpent: timeElapsed,
              date: new Date().toISOString(),
            };
            onComplete(activity);
          }
        }, 2000);
      }
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback({ show: true, correct: false, message: '-5 pontos. Foque nas estrelas! ⚠️' });
    }

    setTimeout(() => {
      if (feedback.show) {
        setFeedback({ show: false, correct: false, message: '' });
      }
    }, 1500);
  };

  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  const targetsLeft = objects.filter((obj) => obj.isTarget && !obj.clicked).length;

  return (
    <div className="space-y-6">
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h2 className="text-2xl">Foco e Atenção 🎯</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <Clock className="w-5 h-5" />
            <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
            Fase {round} / {totalRounds}
          </div>
          <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg">
            Pontos: {score}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
            <Target className="w-5 h-5" />
            <span>Estrelas restantes: {targetsLeft}</span>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-6 mb-6 text-center`}>
          <p className={accessibilityConfig.fontSize === 'large' ? 'text-xl' : ''}>
            Clique apenas nas <strong className="text-yellow-500">estrelas ⭐ 🌟 ✨</strong>
          </p>
          <p className={`mt-2 text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Evite clicar nos outros objetos!
          </p>
        </div>

        {feedback.show && (
          <div className={`mb-6 p-4 rounded-xl text-center transition-all ${
            feedback.correct
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className={`relative ${
          accessibilityConfig.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 to-purple-100'
        } rounded-xl overflow-hidden`} style={{ height: '400px' }}>
          {objects.map((obj) => (
            <button
              key={obj.id}
              onClick={() => handleClick(obj.id)}
              disabled={obj.clicked}
              className={`absolute text-3xl sm:text-4xl transition-all ${
                obj.clicked ? 'opacity-30 scale-75' : 'hover:scale-125 cursor-pointer'
              } ${accessibilityConfig.reduceMotion ? '' : 'animate-pulse'}`}
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {obj.emoji}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Precisão: {clicks > 0 ? Math.round((score / (clicks * 10)) * 100) : 0}%
        </div>
      </div>
    </div>
  );
}
