import dartmouthLogo from '../assets/dartmouth-logo.png';

export function DartmouthLogo({ className }: { className?: string }) {
  return (
    <img 
      src={dartmouthLogo} 
      alt="Dartmouth Logo" 
      className={`${className} object-contain`}
      style={{ aspectRatio: 'auto' }}
    />
  );
}