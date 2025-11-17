export function DartmouthLogo({ className }: { className?: string }) {
  return (
    <img 
      src="/src/assets/dartmouth-logo.png" 
      alt="Dartmouth Logo" 
      className={`${className} object-contain`}
      style={{ aspectRatio: 'auto' }}
    />
  );
}