import { useState } from 'react';
import { UserProfile } from '../App';
import { User, Mail, LogIn, UserPlus } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: UserProfile) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || (!isLogin && !name)) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (isLogin) {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: UserProfile) => u.email === email);

      if (user) {
        onLogin(user);
      } else {
        setError('Usuário não encontrado. Por favor, cadastre-se.');
      }
    } else {
      // Register
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: UserProfile) => u.email === email);

      if (existingUser) {
        setError('Este e-mail já está cadastrado.');
        return;
      }

      const newUser: UserProfile = {
        id: Date.now().toString(),
        name,
        email,
        points: 0,
        level: 1,
        achievements: [],
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl mb-2">
            Bem-vindo! 🎉
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Seu nome"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? (
              <>
                <LogIn className="w-5 h-5" />
                Entrar
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Cadastrar
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Plataforma educacional inclusiva com foco em acessibilidade
          </p>
        </div>
      </div>
    </div>
  );
}
