import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido').trim().toLowerCase(),
});

export const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted, email:', email);
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      console.log('Validation failed:', validation.error.errors[0].message);
      toast.error(validation.error.errors[0].message);
      return;
    }

    console.log('Validation passed, attempting to save...');
    setIsSubmitting(true);
    
    try {
      console.log('Supabase client:', supabase);
      const { data, error } = await supabase
        .from('email_subscriptions')
        .insert({ email: validation.data.email })
        .select();

      console.log('Insert response:', { data, error });

      if (error) {
        // Handle duplicate email error
        if (error.code === '23505') {
          console.log('Duplicate email detected');
          toast.error('Este e-mail já está cadastrado!');
        } else {
          console.error('Error saving email:', error);
          toast.error('Erro ao cadastrar e-mail. Tente novamente.');
        }
        return;
      }

      console.log('Email saved successfully!');
      toast.success('E-mail cadastrado com sucesso! 🎉');
      setEmail('');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Erro ao cadastrar e-mail. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
