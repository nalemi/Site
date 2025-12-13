import { AccessibilityConfig } from '../App';
import { Volume2, Sun, Palette, Zap, Eye, Type, Speaker } from 'lucide-react';

interface AccessibilitySettingsProps {
  config: AccessibilityConfig;
  onConfigChange: (config: AccessibilityConfig) => void;
}

export function AccessibilitySettings({ config, onConfigChange }: AccessibilitySettingsProps) {
  const cardClass = config.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : config.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  return (
    <div className="space-y-6">
      <div className={`${cardClass} rounded-2xl shadow-xl p-6 sm:p-8`}>
        <h2 className="text-2xl sm:text-3xl mb-2">Configurações de Acessibilidade ♿</h2>
        <p className={config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}>
          Personalize sua experiência para máximo conforto
        </p>
      </div>

      {/* Audio Settings */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl">Áudio</h3>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Ajuste o volume e efeitos sonoros
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Volume Geral</label>
              <span className="text-sm text-blue-600">{config.volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.volume}
              onChange={(e) => onConfigChange({ ...config, volume: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Speaker className="w-5 h-5 text-gray-600" />
              <div>
                <p>Efeitos Sonoros</p>
                <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-500'}`}>
                  Sons de feedback e notificações
                </p>
              </div>
            </div>
            <button
              onClick={() => onConfigChange({ ...config, soundEffects: !config.soundEffects })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                config.soundEffects ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  config.soundEffects ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Settings */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl">Visual</h3>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Personalize cores e brilho
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm">Brilho da Tela</label>
              <span className="text-sm text-purple-600">{config.brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={config.brightness}
              onChange={(e) => onConfigChange({ ...config, brightness: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-3">Tema de Cores</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onConfigChange({ ...config, theme: 'light' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  config.theme === 'light'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-800">Claro</p>
              </button>

              <button
                onClick={() => onConfigChange({ ...config, theme: 'dark' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  config.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-2 bg-gray-800 rounded-full" />
                <p className="text-sm text-gray-800">Escuro</p>
              </button>

              <button
                onClick={() => onConfigChange({ ...config, theme: 'high-contrast' })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  config.theme === 'high-contrast'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <Palette className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-800">Alto Contraste</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Text Settings */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Type className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl">Texto</h3>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Ajuste o tamanho da fonte
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-3">Tamanho da Fonte</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onConfigChange({ ...config, fontSize: 'small' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                config.fontSize === 'small'
                  ? 'border-green-500 bg-green-50'
                  : config.theme === 'dark'
                  ? 'border-gray-700 bg-gray-700 hover:border-green-300'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <p className={`text-xs ${config.fontSize === 'small' ? 'text-gray-800' : ''}`}>Pequeno</p>
              <p className={`text-sm mt-1 ${config.fontSize === 'small' ? 'text-gray-600' : 'text-gray-500'}`}>Aa</p>
            </button>

            <button
              onClick={() => onConfigChange({ ...config, fontSize: 'medium' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                config.fontSize === 'medium'
                  ? 'border-green-500 bg-green-50'
                  : config.theme === 'dark'
                  ? 'border-gray-700 bg-gray-700 hover:border-green-300'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <p className={`text-sm ${config.fontSize === 'medium' ? 'text-gray-800' : ''}`}>Médio</p>
              <p className={`mt-1 ${config.fontSize === 'medium' ? 'text-gray-600' : 'text-gray-500'}`}>Aa</p>
            </button>

            <button
              onClick={() => onConfigChange({ ...config, fontSize: 'large' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                config.fontSize === 'large'
                  ? 'border-green-500 bg-green-50'
                  : config.theme === 'dark'
                  ? 'border-gray-700 bg-gray-700 hover:border-green-300'
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <p className={`${config.fontSize === 'large' ? 'text-gray-800' : ''}`}>Grande</p>
              <p className={`text-xl mt-1 ${config.fontSize === 'large' ? 'text-gray-600' : 'text-gray-500'}`}>Aa</p>
            </button>
          </div>
        </div>
      </div>

      {/* Motion Settings */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl">Animações</h3>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Controle de movimento e transições
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Reduzir Movimento</p>
              <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-500'}`}>
                Minimiza animações e transições
              </p>
            </div>
            <button
              onClick={() => onConfigChange({ ...config, reduceMotion: !config.reduceMotion })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                config.reduceMotion ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  config.reduceMotion ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p>Interface Simplificada</p>
              <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-500'}`}>
                Modo ideal para TEA/TDAH
              </p>
            </div>
            <button
              onClick={() => onConfigChange({ ...config, simplifiedUI: !config.simplifiedUI })}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                config.simplifiedUI ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  config.simplifiedUI ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preset Profiles */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <h3 className="text-xl mb-4">Perfis Predefinidos</h3>
        <p className={`text-sm mb-6 ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
          Aplique configurações otimizadas para diferentes necessidades
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => onConfigChange({
              volume: 30,
              brightness: 80,
              theme: 'light',
              reduceMotion: true,
              simplifiedUI: true,
              fontSize: 'large',
              soundEffects: false,
            })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              config.theme === 'dark'
                ? 'border-gray-700 bg-gray-700 hover:border-blue-500'
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <div className="text-3xl mb-2">🧘</div>
            <h4 className="mb-2">Modo Sensorial Suave</h4>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Ideal para pessoas com sensibilidade sensorial (TEA)
            </p>
          </button>

          <button
            onClick={() => onConfigChange({
              volume: 50,
              brightness: 100,
              theme: 'light',
              reduceMotion: true,
              simplifiedUI: true,
              fontSize: 'medium',
              soundEffects: true,
            })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              config.theme === 'dark'
                ? 'border-gray-700 bg-gray-700 hover:border-purple-500'
                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
            }`}
          >
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="mb-2">Modo Foco</h4>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Ideal para TDAH - interface limpa e menos distrações
            </p>
          </button>

          <button
            onClick={() => onConfigChange({
              volume: 70,
              brightness: 120,
              theme: 'high-contrast',
              reduceMotion: false,
              simplifiedUI: false,
              fontSize: 'large',
              soundEffects: true,
            })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              config.theme === 'dark'
                ? 'border-gray-700 bg-gray-700 hover:border-yellow-500'
                : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
            }`}
          >
            <div className="text-3xl mb-2">👁️</div>
            <h4 className="mb-2">Alto Contraste</h4>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Para baixa visão e sensibilidade à luz
            </p>
          </button>

          <button
            onClick={() => onConfigChange({
              volume: 50,
              brightness: 100,
              theme: 'light',
              reduceMotion: false,
              simplifiedUI: false,
              fontSize: 'medium',
              soundEffects: true,
            })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              config.theme === 'dark'
                ? 'border-gray-700 bg-gray-700 hover:border-green-500'
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            <div className="text-3xl mb-2">✨</div>
            <h4 className="mb-2">Padrão</h4>
            <p className={`text-sm ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-600'}`}>
              Configurações balanceadas para todos
            </p>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={`${cardClass} rounded-2xl shadow-xl p-6`}>
        <h3 className="text-xl mb-4">💡 Sobre Acessibilidade</h3>
        <div className="space-y-3">
          <p className={config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}>
            Essas configurações foram desenvolvidas pensando em pessoas com:
          </p>
          <ul className="space-y-2">
            <li className={`flex items-start gap-2 ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
              <span className="text-blue-500">•</span>
              <span><strong>TEA (Transtorno do Espectro Autista)</strong> - Interface simplificada e controle sensorial</span>
            </li>
            <li className={`flex items-start gap-2 ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
              <span className="text-green-500">•</span>
              <span><strong>TDAH</strong> - Foco e minimização de distrações</span>
            </li>
            <li className={`flex items-start gap-2 ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
              <span className="text-purple-500">•</span>
              <span><strong>Deficiência Visual</strong> - Alto contraste e fonte ajustável</span>
            </li>
            <li className={`flex items-start gap-2 ${config.theme === 'high-contrast' ? 'text-yellow-300' : 'text-gray-700'}`}>
              <span className="text-orange-500">•</span>
              <span><strong>Sensibilidade Sensorial</strong> - Controle total de estímulos visuais e sonoros</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
