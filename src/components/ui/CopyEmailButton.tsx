'use client'; // This directive is required

export function CopyEmailButton({ email }: { email: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-sm text-muted hover:text-foreground transition-colors"
    >
      (Click to copy email)
    </button>
  );
}