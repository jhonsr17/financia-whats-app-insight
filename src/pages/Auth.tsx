import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className='min-h-screen bg-[#0D1D35] flex flex-col'>
      {/* Navigation */}
      <nav className='sticky top-0 z-50 bg-[#0D1D35]/95 backdrop-blur-sm border-b border-white/10 container mx-auto px-4 py-4 md:py-6 flex justify-between items-center'>
        <div className='text-xl md:text-2xl font-bold text-white hover:text-[#9DFAD7] transition-colors'>
          FinancIA
        </div>
        <div className='flex items-center space-x-4 md:space-x-6'>
          <span className='text-white hover:text-[#9DFAD7] transition-colors text-sm md:text-base'>
            Volver al inicio
          </span>
        </div>
      </nav>

      {/* Auth Section */}
      <section className='flex-1 flex items-center justify-center px-4 py-8 md:py-12'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>
            <p className='text-white/80 text-base md:text-lg'>
              {isLogin ? 'Bienvenido de nuevo a FinancIA' : 'Únete a FinancIA y transforma tu dinero'}
            </p>
          </div>
          
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <RegisterForm onToggleMode={toggleMode} />
          )}

          <div className='mt-6 text-center'>
            <p className='text-white/60 text-sm'>
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
              <button 
                onClick={toggleMode}
                className='text-[#9DFAD7] hover:text-[#D4FFB5] font-semibold transition-colors'
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;