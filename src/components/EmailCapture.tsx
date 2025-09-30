import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um e-mail válido');
      return;
    }

    setIsSubmitting(true);
    
    // Simulação de envio - aqui você conectaria com seu backend
    setTimeout(() => {
      toast.success('E-mail cadastrado com sucesso! 🎉');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 py-6 bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground font-semibold py-6 px-8 hover:bg-primary/90 transition-colors"
        >
          {isSubmitting ? 'Enviando...' : 'Notifique-me'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Receba atualizações exclusivas sobre o lançamento
      </p>
    </div>
  );
};
