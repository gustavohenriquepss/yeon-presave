import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

interface EmailCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformName: string;
  platformUrl: string;
}

export const EmailCollectionDialog = ({
  open,
  onOpenChange,
  platformName,
  platformUrl,
}: EmailCollectionDialogProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um e-mail válido');
      return;
    }

    setIsSubmitting(true);

    // Mock submission - will be replaced with Supabase later
    setTimeout(() => {
      console.log('Email collected:', { email, platform: platformName });
      toast.success('E-mail cadastrado com sucesso! Redirecionando...');
      setEmail('');
      setIsSubmitting(false);
      onOpenChange(false);
      
      // Open the platform URL after successful "submission"
      window.open(platformUrl, '_blank');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Receba notificações do lançamento
          </DialogTitle>
          <DialogDescription>
            Insira seu e-mail para ser notificado quando o álbum for lançado no {platformName}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Ao continuar, você concorda em receber novidades, lançamentos e conteúdos exclusivos por e-mail.
          </p>

          <Button
            type="submit"
            variant="accent"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : `Continuar para ${platformName}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
