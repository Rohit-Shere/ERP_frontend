export default function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-500',
    ghost: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
