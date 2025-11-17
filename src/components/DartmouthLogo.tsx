export function DartmouthLogo({ className }: { className?: string }) {
  return (
    <img 
      src="/dartmouth-logo.png" 
      alt="Dartmouth Logo" 
      className={`${className} object-contain`}
      style={{ aspectRatio: 'auto' }}
    />
  );
}