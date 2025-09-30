import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Music2 } from 'lucide-react';
import spotifyLogo from '@/assets/spotify-logo.png';
import appleMusicLogo from '@/assets/apple-music-logo.png';
import deezerLogo from '@/assets/deezer-logo.png';
import { EmailCollectionDialog } from '@/components/EmailCollectionDialog';

interface Platform {
  name: string;
  logo: string;
  color: string;
  url: string;
}

export const PresaveButtons = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const platforms: Platform[] = [
    {
      name: 'Spotify',
      logo: spotifyLogo,
      color: 'bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30',
      url: 'https://accounts.spotify.com/pt-BR/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-email%252Cplaylist-modify-public%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fmusicpro.live%252Fcallback%26state%3DNzkwMDI3OTUxMzAxNg%3D%3D%26client_id%3De51a8800913345e592ce4a73ccc0eebb',
    },
    {
      name: 'Apple Music',
      logo: appleMusicLogo,
      color: 'bg-[#FA243C]/10 hover:bg-[#FA243C]/20 border border-[#FA243C]/30',
      url: 'https://authorize.music.apple.com/woa?a=eyJ0aGlyZFBhcnR5TmFtZSI6Im11c2ljcHJvLmxpdmUiLCJ0aGlyZFBhcnR5VG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklsY3lURWRCT0RnelIxQWlmUS5leUpwWVhRaU9qRTNOVGt5TkRnMU1UQXVNekV6TWpZMUxDSmxlSEFpT2pFM05Ua3lORGc0TVRBdU16RXpNalkxTENKcGMzTWlPaUpRTnpSVlIwWTJPVlJPSW4wLlVHUmVWTDl3T1lwalQwQVphZWtLTEV1QXZHZFNGeFd3dWxTTFRhS1phUFd5VXVkd3hNNERMX1hSTlRzZzJYcHJMb3hTWXY1UFU5cTNEVV81UnUtSDhBIn0%3D&referrer=https%3A%2F%2Fmusicpro.live%2Fs%2F7900279513016&app=music&p=subscribe',
    },
    {
      name: 'Deezer',
      logo: deezerLogo,
      color: 'bg-[#FF0092]/10 hover:bg-[#FF0092]/20 border border-[#FF0092]/30',
      url: 'https://connect.deezer.com/login.php?app_id=541242&redirect_type=refresh&redirect_link=https%3A%2F%2Fconnect.deezer.com%2Foauth%2Fauth.php%3Fperms%3Dbasic_access%252Cemail%252Coffline_access%252Cmanage_library%26format%3Dwindow%26app_id%3D541242%26redirect_uri%3Dhttps%253A%252F%252Fmusicpro.live%252Fdeezer-callback%252F7900279513016%26from_third_party_oauth%3Dtrue&nosignup=0&oauth_type=login&recaptcha-disabled=0',
    },
  ];

  const handlePresave = (platform: Platform) => {
    setSelectedPlatform(platform);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto animate-fade-in">
        {platforms.map((platform) => (
          <Button
            key={platform.name}
            onClick={() => handlePresave(platform)}
            className={`${platform.color} text-white font-semibold py-6 text-lg transition-all w-full`}
            size="lg"
          >
            <img src={platform.logo} alt={platform.name} className="w-6 h-6 mr-2 object-contain" />
            Pré-save no {platform.name}
          </Button>
        ))}
        
        <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground text-sm">
          <Music2 className="w-4 h-4" />
          <span>Disponível em todas as plataformas</span>
        </div>
      </div>

      {selectedPlatform && (
        <EmailCollectionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          platformName={selectedPlatform.name}
          platformUrl={selectedPlatform.url}
        />
      )}
    </>
  );
};
