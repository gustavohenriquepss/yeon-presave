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
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

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

  const emailSchema = z.object({
    email: z
      .string()
      .email('Por favor, insira um e-mail válido')
      .trim()
      .toLowerCase()
      .max(255),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert({ email: validation.data.email });

      if (error) {
        if ((error as any).code === '23505') {
          toast.error('Este e-mail já está cadastrado!');
        } else {
          console.error('Erro ao salvar e-mail:', error);
          toast.error('Erro ao cadastrar e-mail. Tente novamente.');
        }
        return;
      }

      toast.success('E-mail cadastrado com sucesso! Redirecionando...');
      setEmail('');
      onOpenChange(false);
      window.open(platformUrl, '_blank');
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast.error('Erro ao cadastrar e-mail. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Receba notificações do lançamento
          </DialogTitle>
          <DialogDescription>
            Insira seu e-mail para ser notificado sobre o lançamento no {platformName}.
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
