import { ReactNode } from 'react';

interface ShinyButtonProps {
  onClick: () => void;
  children: ReactNode;
  style?: React.CSSProperties & {
    '--primary'?: string;
  };
}

const ShinyButton = ({ onClick, children, style }: ShinyButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {children}
    </button>
  );
}

export default ShinyButton;