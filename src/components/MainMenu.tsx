import { UserProfile, AccessibilityConfig } from '../App';
import { Gamepad2, Trophy, TrendingUp, Zap, Target, Brain } from 'lucide-react';

interface MainMenuProps {
  user: UserProfile;
  onNavigate: (screen: 'menu' | 'activity' | 'progress' | 'settings') => void;
  accessibilityConfig: AccessibilityConfig;
}

export function MainMenu({ user, onNavigate, accessibilityConfig }: MainMenuProps) {
  const achievements = [
    { id: 'first-activity', name: 'Primeira Atividade', icon: '🎯', unlocked: user.achievements.includes('first-activity') },
    { id: 'ten-activities', name: '10 Atividades', icon: '🔥', unlocked: user.achievements.includes('ten-activities') },
    { id: 'perfect-score', name: 'Pontuação Perfeita', icon: '⭐', unlocked: user.achievements.includes('perfect-score') },
  ];

  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6 sm:p-8`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-2">Pronto para aprender? 🚀</h2>
            <p className={accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}>
              Selecione uma atividade rápida para começar
            </p>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <div className="flex items-center gap-2 justify-end">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className={accessibilityConfig.fontSize === 'large' ? 'text-xl' : accessibilityConfig.fontSize === 'small' ? 'text-sm' : ''}>
                {user.points} pontos
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className={accessibilityConfig.fontSize === 'large' ? 'text-xl' : accessibilityConfig.fontSize === 'small' ? 'text-sm' : ''}>
                {user.achievements.length} conquistas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('activity')}
          className={`${cardClass} rounded-xl shadow-lg p-6 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl mb-2">Jogo da Memória</h3>
          <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Teste sua memória em 3 minutos
          </p>
          <div className="mt-4 text-blue-500 text-sm">2-3 minutos →</div>
        </button>

        <button
          onClick={() => onNavigate('activity')}
          className={`${cardClass} rounded-xl shadow-lg p-6 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl mb-2">Quiz Relâmpago</h3>
          <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Responda perguntas rápidas
          </p>
          <div className="mt-4 text-green-500 text-sm">2-4 minutos →</div>
        </button>

        <button
          onClick={() => onNavigate('activity')}
          className={`${cardClass} rounded-xl shadow-lg p-6 hover:scale-105 transition-all text-left group`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl mb-2">Foco e Atenção</h3>
          <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
            Exercícios de concentração
          </p>
          <div className="mt-4 text-purple-500 text-sm">3-5 minutos →</div>
        </button>
      </div>

      {/* Achievements Preview */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl">Suas Conquistas</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`text-center p-4 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 scale-105'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-700 opacity-50'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className={`text-xs ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Snapshot */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <h3 className="text-xl">Seu Progresso</h3>
          </div>
          <button
            onClick={() => onNavigate('progress')}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Ver detalhes →
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso para o próximo nível</span>
              <span>{user.points % 1000} / 1000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${(user.points % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
