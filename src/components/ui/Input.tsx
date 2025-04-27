import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-md border border-slate-300 py-2 px-3 text-slate-700 shadow-sm transition-colors 
        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} 
        ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;