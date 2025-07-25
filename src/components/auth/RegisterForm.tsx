import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const CountryCodeSelector = ({ 
  value, 
  onChange, 
  disabled 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  disabled?: boolean;
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className='px-3 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white focus:outline-none focus:border-[#9DFAD7] transition-colors'
    >
      <option value='+57'>🇨🇴 +57</option>
      <option value='+1'>🇺🇸 +1</option>
      <option value='+52'>🇲🇽 +52</option>
      <option value='+34'>🇪🇸 +34</option>
      <option value='+54'>🇦🇷 +54</option>
    </select>
  );
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+57');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!nombre.trim()) {
      setError("El nombre completo es requerido");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    if (!telefono || telefono.length < 7) {
      setError("Por favor ingresa un número de teléfono válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    const fullPhone = countryCode + telefono;
    const { error } = await signUp(email, password, nombre, fullPhone);

    if (error) {
      if (error.message.includes("User already registered")) {
        setError("Ya existe una cuenta con este email");
      } else if (error.message.includes("Password should be at least 6 characters")) {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError(error.message);
      }
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSuccess("Cuenta creada exitosamente. Revisa tu email para confirmarla");
      toast({
        title: "¡Registro exitoso!",
        description: "Revisa tu email para confirmar tu cuenta",
      });
    }

    setLoading(false);
  };

  return (
    <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
            <p className='text-red-400 text-sm'>{error}</p>
          </div>
        )}

        {success && (
          <div className='bg-green-500/10 border border-green-500/20 rounded-lg p-3'>
            <p className='text-green-400 text-sm'>{success}</p>
          </div>
        )}

        <div className='space-y-4'>
          <div>
            <label 
              htmlFor='nombre' 
              className='block text-white font-medium mb-2'
            >
              Nombre completo
            </label>
            <input
              type='text'
              id='nombre'
              required
              disabled={loading}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#9DFAD7] transition-colors'
              placeholder='Tu nombre completo'
            />
          </div>

          <div>
            <label 
              htmlFor='email' 
              className='block text-white font-medium mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#9DFAD7] transition-colors'
              placeholder='tu@email.com'
            />
          </div>

          <div>
            <label 
              htmlFor='telefono' 
              className='block text-white font-medium mb-2'
            >
              Número de teléfono
            </label>
            <div className='flex'>
              <CountryCodeSelector
                value={countryCode}
                onChange={setCountryCode}
                disabled={loading}
              />
              <input
                type='tel'
                id='telefono'
                required
                disabled={loading}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className='flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-lg text-white placeholder-white/50 focus:outline-none focus:border-[#9DFAD7] transition-colors border-l-0'
                placeholder='300 123 4567'
                pattern='[0-9\s\-]+'
                title='Solo números, espacios y guiones'
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor='password' 
              className='block text-white font-medium mb-2'
            >
              Contraseña
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#9DFAD7] transition-colors pr-12'
                placeholder='Mínimo 6 caracteres'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label 
              htmlFor='confirmPassword' 
              className='block text-white font-medium mb-2'
            >
              Confirmar contraseña
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#9DFAD7] transition-colors pr-12'
                placeholder='Confirma tu contraseña'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors'
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className='flex items-start'>
          <input
            type='checkbox'
            id='terms'
            required
            disabled={loading}
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className='w-4 h-4 text-[#9DFAD7] bg-white/5 border-white/10 rounded focus:ring-[#9DFAD7] focus:ring-2 mt-1'
          />
          <label htmlFor='terms' className='ml-2 text-white/80 text-sm'>
            Acepto los{' '}
            <span className='text-[#9DFAD7] hover:text-[#D4FFB5] transition-colors underline cursor-pointer'>
              términos y condiciones
            </span>
            {' '}y la{' '}
            <span className='text-[#9DFAD7] hover:text-[#D4FFB5] transition-colors underline cursor-pointer'>
              política de privacidad
            </span>
          </label>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-gradient-to-r from-[#9DFAD7] to-[#D4FFB5] text-[#0D1D35] font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#9DFAD7]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
        >
          {loading ? 'Registrando...' : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
};