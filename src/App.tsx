import { useState, useEffect } from 'react';
import { Home, Award, Settings, User, LogOut } from 'lucide-react';
import { MainMenu } from './components/MainMenu';
import { AuthScreen } from './components/AuthScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { AccessibilitySettings } from './components/AccessibilitySettings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  achievements: string[];
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'memory' | 'quiz' | 'focus';
  completed: boolean;
  score: number;
  timeSpent: number;
  date: string;
}

export interface AccessibilityConfig {
  volume: number;
  brightness: number;
  theme: 'light' | 'dark' | 'high-contrast';
  reduceMotion: boolean;
  simplifiedUI: boolean;
  fontSize: 'small' | 'medium' | 'large';
  soundEffects: boolean;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'activity' | 'progress' | 'settings'>('menu');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [accessibilityConfig, setAccessibilityConfig] = useState<AccessibilityConfig>({
    volume: 50,
    brightness: 100,
    theme: 'light',
    reduceMotion: false,
    simplifiedUI: false,
    fontSize: 'medium',
    soundEffects: true,
  });

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedActivities = localStorage.getItem('activities');
    const savedConfig = localStorage.getItem('accessibilityConfig');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedActivities) setActivities(JSON.parse(savedActivities));
    if (savedConfig) setAccessibilityConfig(JSON.parse(savedConfig));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('accessibilityConfig', JSON.stringify(accessibilityConfig));
  }, [accessibilityConfig]);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('menu');
  };

  const handleActivityComplete = (activity: Activity) => {
    setActivities([...activities, activity]);
    
    // Update user points and level
    if (currentUser) {
      const newPoints = currentUser.points + activity.score;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      const newAchievements = [...currentUser.achievements];

      // Award achievements
      if (activities.length + 1 === 1 && !newAchievements.includes('first-activity')) {
        newAchievements.push('first-activity');
      }
      if (activities.length + 1 === 10 && !newAchievements.includes('ten-activities')) {
        newAchievements.push('ten-activities');
      }
      if (activity.score >= 90 && !newAchievements.includes('perfect-score')) {
        newAchievements.push('perfect-score');
      }

      setCurrentUser({
        ...currentUser,
        points: newPoints,
        level: newLevel,
        achievements: newAchievements,
      });
    }
  };

  // Apply accessibility settings
  const getThemeClasses = () => {
    const baseClasses = 'min-h-screen transition-all duration-300';
    
    if (accessibilityConfig.theme === 'dark') {
      return `${baseClasses} bg-gray-900 text-white`;
    } else if (accessibilityConfig.theme === 'high-contrast') {
      return `${baseClasses} bg-black text-yellow-300`;
    }
    return `${baseClasses} bg-gradient-to-br from-blue-50 to-purple-50`;
  };

  const getBrightnessStyle = () => ({
    filter: `brightness(${accessibilityConfig.brightness}%)`,
  });

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className={getThemeClasses()} style={getBrightnessStyle()}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Olá, {currentUser.name}! 👋</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm">
                  Nível {currentUser.level}
                </span>
                <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                  ⭐ {currentUser.points} pontos
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentScreen('menu')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                currentScreen === 'menu'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50 shadow'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Menu Principal</span>
            </button>
            <button
              onClick={() => setCurrentScreen('activity')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                currentScreen === 'activity'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50 shadow'
              }`}
            >
              <Award className="w-5 h-5" />
              <span>Atividades</span>
            </button>
            <button
              onClick={() => setCurrentScreen('progress')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                currentScreen === 'progress'
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50 shadow'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Progresso</span>
            </button>
            <button
              onClick={() => setCurrentScreen('settings')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                currentScreen === 'settings'
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50 shadow'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Acessibilidade</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {currentScreen === 'menu' && (
            <MainMenu
              user={currentUser}
              onNavigate={setCurrentScreen}
              accessibilityConfig={accessibilityConfig}
            />
          )}
          {currentScreen === 'activity' && (
            <ActivityScreen
              onActivityComplete={handleActivityComplete}
              accessibilityConfig={accessibilityConfig}
            />
          )}
          {currentScreen === 'progress' && (
            <ProgressScreen
              user={currentUser}
              activities={activities}
              accessibilityConfig={accessibilityConfig}
            />
          )}
          {currentScreen === 'settings' && (
            <AccessibilitySettings
              config={accessibilityConfig}
              onConfigChange={setAccessibilityConfig}
            />
          )}
        </main>
      </div>
    </div>
  );
}
