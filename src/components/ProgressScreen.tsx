import { UserProfile, Activity, AccessibilityConfig } from '../App';
import { Trophy, TrendingUp, Award, Calendar, Clock, Target } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProgressScreenProps {
  user: UserProfile;
  activities: Activity[];
  accessibilityConfig: AccessibilityConfig;
}

export function ProgressScreen({ user, activities, accessibilityConfig }: ProgressScreenProps) {
  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  // Calculate statistics
  const totalActivities = activities.length;
  const averageScore = totalActivities > 0
    ? Math.round(activities.reduce((sum, a) => sum + a.score, 0) / totalActivities)
    : 0;
  const totalTimeSpent = activities.reduce((sum, a) => sum + a.timeSpent, 0);
  const averageTime = totalActivities > 0
    ? Math.round(totalTimeSpent / totalActivities)
    : 0;

  // Activity distribution
  const activityDistribution = [
    {
      name: 'Memória',
      value: activities.filter((a) => a.type === 'memory').length,
      color: '#3B82F6',
    },
    {
      name: 'Quiz',
      value: activities.filter((a) => a.type === 'quiz').length,
      color: '#10B981',
    },
    {
      name: 'Foco',
      value: activities.filter((a) => a.type === 'focus').length,
      color: '#8B5CF6',
    },
  ];

  // Weekly progress
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const weeklyData = last7Days.map((date) => {
    const dayActivities = activities.filter(
      (a) => a.date.split('T')[0] === date
    );
    return {
      date: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' }),
      atividades: dayActivities.length,
      pontos: dayActivities.reduce((sum, a) => sum + a.score, 0),
    };
  });

  // Score history
  const recentActivities = activities.slice(-10).map((activity, index) => ({
    id: index + 1,
    pontos: activity.score,
    tipo: activity.type === 'memory' ? 'Memória' : activity.type === 'quiz' ? 'Quiz' : 'Foco',
  }));

  const achievements = [
    { id: 'first-activity', name: 'Primeira Atividade', icon: '🎯', description: 'Complete sua primeira atividade', unlocked: user.achievements.includes('first-activity') },
    { id: 'ten-activities', name: '10 Atividades', icon: '🔥', description: 'Complete 10 atividades', unlocked: user.achievements.includes('ten-activities') },
    { id: 'perfect-score', name: 'Pontuação Perfeita', icon: '⭐', description: 'Obtenha 90+ pontos em uma atividade', unlocked: user.achievements.includes('perfect-score') },
    { id: 'level-5', name: 'Nível 5', icon: '🏆', description: 'Alcance o nível 5', unlocked: user.level >= 5 },
    { id: 'week-streak', name: 'Sequência Semanal', icon: '📅', description: 'Complete atividades por 7 dias seguidos', unlocked: false },
    { id: 'speed-master', name: 'Mestre da Velocidade', icon: '⚡', description: 'Complete uma atividade em menos de 2 minutos', unlocked: activities.some(a => a.timeSpent < 120) },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${cardClass} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
                Pontos Totais
              </p>
              <p className="text-2xl">{user.points}</p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
                Atividades
              </p>
              <p className="text-2xl">{totalActivities}</p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
                Média de Pontos
              </p>
              <p className="text-2xl">{averageScore}</p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className={`text-sm ${accessibilityConfig.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
                Tempo Médio
              </p>
              <p className="text-2xl">{averageTime}s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl">Progresso de Nível</h3>
          <span className="px-4 py-2 bg-purple-500 text-white rounded-full">
            Nível {user.level}
          </span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-2">
            <span>Próximo nível em:</span>
            <span>{1000 - (user.points % 1000)} pontos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
              style={{ width: `${(user.points % 1000) / 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl">Progresso Semanal</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pontos" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Distribution */}
        <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-green-500" />
            <h3 className="text-xl">Distribuição de Atividades</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Performance */}
      {recentActivities.length > 0 && (
        <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl">Últimas Atividades</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recentActivities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pontos" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Achievements */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl">Conquistas</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-700 opacity-50'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className={`mb-1 ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                {achievement.name}
              </h4>
              <p className={`text-sm ${achievement.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity History */}
      {activities.length > 0 && (
        <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
          <h3 className="text-xl mb-4">Histórico Completo</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${accessibilityConfig.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left p-3">Data</th>
                  <th className="text-left p-3">Tipo</th>
                  <th className="text-left p-3">Pontos</th>
                  <th className="text-left p-3">Tempo</th>
                </tr>
              </thead>
              <tbody>
                {activities.slice().reverse().map((activity, index) => (
                  <tr
                    key={activity.id}
                    className={`border-b ${accessibilityConfig.theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}
                  >
                    <td className="p-3">
                      {new Date(activity.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">
                      {activity.type === 'memory' ? '🧠 Memória' : activity.type === 'quiz' ? '🎯 Quiz' : '🎮 Foco'}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                        {activity.score} pts
                      </span>
                    </td>
                    <td className="p-3">
                      {Math.floor(activity.timeSpent / 60)}:{(activity.timeSpent % 60).toString().padStart(2, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
