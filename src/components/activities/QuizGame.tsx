import { useState, useEffect } from 'react';
import { Activity, AccessibilityConfig } from '../../App';
import { ArrowLeft, Clock, Check, X } from 'lucide-react';

interface QuizGameProps {
  onComplete: (activity: Activity) => void;
  onBack: () => void;
  accessibilityConfig: AccessibilityConfig;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    correctAnswer: 2,
  },
  {
    question: 'Quantos continentes existem no mundo?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
  },
  {
    question: 'Qual é o maior planeta do Sistema Solar?',
    options: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
    correctAnswer: 2,
  },
  {
    question: 'Quantos lados tem um triângulo?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
  },
  {
    question: 'Qual é a cor do céu em um dia ensolarado?',
    options: ['Verde', 'Azul', 'Vermelho', 'Amarelo'],
    correctAnswer: 1,
  },
  {
    question: 'Quantas horas tem um dia?',
    options: ['12', '24', '48', '60'],
    correctAnswer: 1,
  },
  {
    question: 'Qual desses animais voa?',
    options: ['Cachorro', 'Gato', 'Pássaro', 'Peixe'],
    correctAnswer: 2,
  },
  {
    question: 'Qual é a estação mais quente do ano?',
    options: ['Primavera', 'Verão', 'Outono', 'Inverno'],
    correctAnswer: 1,
  },
];

export function QuizGame({ onComplete, onBack, accessibilityConfig }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Game complete
        const score = Math.round((correctAnswers + (answerIndex === questions[currentQuestion].correctAnswer ? 1 : 0)) / questions.length * 100);
        const activity: Activity = {
          id: Date.now().toString(),
          type: 'quiz',
          completed: true,
          score,
          timeSpent: timeElapsed,
          date: new Date().toISOString(),
        };
        onComplete(activity);
      }
    }, 2000);
  };

  const cardClass = accessibilityConfig.theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : accessibilityConfig.theme === 'high-contrast'
    ? 'bg-black border-yellow-300 border-2'
    : 'bg-white';

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

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
          <h2 className="text-2xl">Quiz Relâmpago ⚡</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <Clock className="w-5 h-5" />
            <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso</span>
            <span>{currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="text-center mb-2 text-sm text-gray-500">
            Questão {currentQuestion + 1}
          </div>
          <h3 className={`text-xl sm:text-2xl text-center mb-8 ${
            accessibilityConfig.fontSize === 'large' ? 'text-3xl' : ''
          }`}>
            {questions[currentQuestion].question}
          </h3>

          <div className="grid gap-4 max-w-2xl mx-auto">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === questions[currentQuestion].correctAnswer;
              
              let buttonClass = '';
              if (showFeedback) {
                if (isSelected && isCorrect) {
                  buttonClass = 'bg-green-500 text-white border-green-600';
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'bg-red-500 text-white border-red-600';
                } else if (isCorrectAnswer) {
                  buttonClass = 'bg-green-500 text-white border-green-600';
                } else {
                  buttonClass = accessibilityConfig.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 opacity-50'
                    : 'bg-gray-100 border-gray-300 opacity-50';
                }
              } else {
                buttonClass = accessibilityConfig.theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${buttonClass} ${
                    !showFeedback && !accessibilityConfig.reduceMotion ? 'hover:scale-102' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={accessibilityConfig.fontSize === 'large' ? 'text-xl' : ''}>
                      {option}
                    </span>
                    {showFeedback && (
                      <>
                        {isSelected && isCorrect && <Check className="w-6 h-6" />}
                        {isSelected && !isCorrect && <X className="w-6 h-6" />}
                        {!isSelected && isCorrectAnswer && <Check className="w-6 h-6" />}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-xl text-center ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isCorrect ? '✓ Correto! Muito bem!' : '✗ Ops! Tente novamente na próxima.'}
          </div>
        )}

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
            <span>Acertos: {correctAnswers} / {currentQuestion + (showFeedback ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
