import { Button } from "./button";
import emptyStateImage from "../../assets/images/empyt-state.png";

interface EmptyStateProps {
  onButtonClick: () => void;
  title: string;
  description: string;
  buttonText: string;
}

export function EmptyState({ 
  onButtonClick,
  title,
  description,
  buttonText
}: EmptyStateProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8"
      style={{
        border: '1px solid #D9D9D9',
        borderRadius: '20px',
        maxWidth: 'fit-content',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.09)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      {/* Container da imagem com dimensões fixas */}
      <div 
        className="mb-8" 
        style={{
          width: '477px',
          height: '320px',
          borderRadius: '6px',
          overflow: 'hidden'
        }}
      >
        <img 
          src={emptyStateImage} 
          alt="Estado vazio" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Título (agora usando a prop) */}
      <div 
        className="mb-3"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#103A57',
          textAlign: 'center'
        }}
      >
        {title}
      </div>
      
      {/* Descrição (agora usando a prop) */}
      <div 
        className="mb-8"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#103A57',
          textAlign: 'center'
        }}
      >
        {description}
      </div>
      
      {/* Botão (agora usando a prop buttonText) */}
      <div style={{ width: '416.444px' }}>
        <Button 
          onClick={onButtonClick}
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '10.21px',
            padding: '13.61px 27.22px',
            gap: '17.01px',
            backgroundColor: '#103A57',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '23.82px',
            lineHeight: '40.83px',
            letterSpacing: '0%',
            color: '#FFFFFF',
            cursor: 'pointer'
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}