import goldDirhamsLogo from '@assets/dirhamslogogold_1755816342447.webp';
import blackDirhamsLogo from '@assets/dirhamslogoblack_1755816342447.webp';
import greenDirhamsLogo from '@assets/dirhamslogogreen_1755816342447.webp';
import darkGreenDirhamsLogo from '@assets/dirhamslogodarkgreen_1755858323401.webp';
import darkerGreenDirhamsLogo from '@assets/dirhamslogodarkergreen_1755859855359.webp';

interface DirhamLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'black' | 'green' | 'darkgreen' | 'darkergreen';
}

const DirhamLogo: React.FC<DirhamLogoProps> = ({ className = '', size = 'sm', variant = 'black' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-5 h-5'; // Increased from w-3 h-3
      case 'sm':
        return 'w-6 h-6'; // Increased from w-4 h-4
      case 'md':
        return 'w-8 h-8'; // Increased from w-5 h-5
      case 'lg':
        return 'w-10 h-10'; // Increased from w-6 h-6
      case 'xl':
        return 'w-12 h-12'; // Increased from w-8 h-8
      default:
        return 'w-6 h-6'; // Increased from w-4 h-4
    }
  };

  const logoSrc = variant === 'black' ? blackDirhamsLogo : 
                   variant === 'green' ? greenDirhamsLogo : 
                   variant === 'darkgreen' ? darkGreenDirhamsLogo : 
                   variant === 'darkergreen' ? darkerGreenDirhamsLogo : goldDirhamsLogo;

  return (
    <img 
      src={logoSrc} 
      alt="AED" 
      className={`inline-block ${getSizeClasses()} ${className}`}
      style={{ 
        verticalAlign: 'middle'
      }}
    />
  );
};

export default DirhamLogo;