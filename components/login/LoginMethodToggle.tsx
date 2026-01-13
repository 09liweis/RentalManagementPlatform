interface LoginMethodToggleProps {
  showCodeLogin: boolean;
  onToggle: () => void;
}

export default function LoginMethodToggle({ showCodeLogin, onToggle }: LoginMethodToggleProps) {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        {showCodeLogin ? '← Back to password login' : 'Login with code instead'}
      </button>
    </div>
  );
}
