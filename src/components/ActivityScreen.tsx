import { useState } from 'react';
import { Activity, AccessibilityConfig } from '../App';
import { MemoryGame } from './activities/MemoryGame';
import { QuizGame } from './activities/QuizGame';
import { FocusGame } from './activities/FocusGame';
import { Brain, Target, Gamepad2 } from 'lucide-react';

interface ActivityScreenProps {
  onActivityComplete: (activity: Activity) => void;
  accessibilityConfig: AccessibilityConfig;
}

export function ActivityScreen({ onActivityComplete, accessibilityConfig }: ActivityScreenProps) {
  const [selectedActivity, setSelectedActivity] = useState<'memory' | 'quiz' | 'focus' | null>(null);

  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  if (selectedActivity === 'memory') {
    return (
      <MemoryGame
        onComplete={onActivityComplete}
        onBack={() => setSelectedActivity(null)}
        accessibilityConfig={accessibilityConfig}
      />
    );
  }

  if (selectedActivity === 'quiz') {
    return (
      <QuizGame
        onComplete={onActivityComplete}
        onBack={() => setSelectedActivity(null)}
        accessibilityConfig={accessibilityConfig}
      />
    );
  }

  if (selectedActivity === 'focus') {
    return (
      <FocusGame
        onComplete={onActivityComplete}
        onBack={() => setSelectedActivity(null)}
        accessibilityConfig={accessibilityConfig}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${cardClass} rounded-2xl shadow-xl p-6 sm:p-8`}>
        <h2 className="text-2xl sm:text-3xl mb-2">Escolha uma Atividade 🎮</h2>
        <p className={accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}>
          Todas as atividades duram entre 2 e 5 minutos
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={() => setSelectedActivity('memory')}
          className={`${cardClass} rounded-2xl shadow-xl p-8 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl mb-3">Jogo da Memória</h3>
          <p className={`mb-4 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Encontre os pares de cartas iguais. Teste sua memória visual e concentração.
          </p>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              2-3 minutos
            </span>
            <span className="text-blue-500">Iniciar →</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedActivity('quiz')}
          className={`${cardClass} rounded-2xl shadow-xl p-8 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl mb-3">Quiz Relâmpago</h3>
          <p className={`mb-4 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Responda perguntas rápidas sobre diversos temas. Aprenda se divertindo!
          </p>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              2-4 minutos
            </span>
            <span className="text-green-500">Iniciar →</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedActivity('focus')}
          className={`${cardClass} rounded-2xl shadow-xl p-8 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl mb-3">Foco e Atenção</h3>
          <p className={`mb-4 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Clique apenas nos objetos corretos. Exercite sua atenção seletiva.
          </p>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              3-5 minutos
            </span>
            <span className="text-purple-500">Iniciar →</span>
          </div>
        </button>
      </div>

      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <h3 className="text-xl mb-4">💡 Dicas para melhor aproveitamento</h3>
        <ul className="space-y-2">
          <li className={`flex items-start gap-2 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
            <span className="text-green-500 mt-1">✓</span>
            <span>Encontre um lugar tranquilo e confortável</span>
          </li>
          <li className={`flex items-start gap-2 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
            <span className="text-green-500 mt-1">✓</span>
            <span>Ajuste as configurações de acessibilidade conforme sua necessidade</span>
          </li>
          <li className={`flex items-start gap-2 ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
            <span className="text-green-500 mt-1">✓</span>
            <span>Não se preocupe com erros - o importante é praticar!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
