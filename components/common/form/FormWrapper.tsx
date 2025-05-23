export default function FormWrapper({children, onSubmit}:any) {
  return (
    <form onSubmit={onSubmit} className="auth-form bg-white/95 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-100 rounded-full opacity-70"></div>
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-100 rounded-full opacity-70"></div>
      {children}
    </form>
  )
}