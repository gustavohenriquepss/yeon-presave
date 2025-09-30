import { CountdownTimer } from '@/components/CountdownTimer';
import { PresaveButtons } from '@/components/PresaveButtons';
import albumCover from '@/assets/FURACAO2000v4.jpg';

const Index = () => {
  // Data de lançamento: 11 de Outubro de 2025
  const releaseDate = new Date('2025-10-11T00:00:00');
  
  const formatReleaseDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            FURACÃO2000
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            por <span className="text-white font-semibold">MENINO GANK, HAJED, DATOMMY!</span>
          </p>
        </div>

        {/* Album Cover */}
        <div className="mb-8 sm:mb-12 animate-scale-in">
          <img
            src={albumCover}
            alt="Capa do Single"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Release Date */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-widest mb-2">
            Lançamento em
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {formatReleaseDate(releaseDate)}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10 sm:mb-12">
          <CountdownTimer releaseDate={releaseDate} />
        </div>

        {/* Pre-save Buttons */}
        <div className="w-full px-4 flex justify-center">
          <PresaveButtons />
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-muted-foreground animate-fade-in">
          <p>© 2025 YEON MUSIC. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
