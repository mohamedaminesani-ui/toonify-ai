import { useRef, useState, type ChangeEvent } from 'react';
import { ArrowRight, Camera, Download, Loader2, Menu, Sparkles, Upload, X } from 'lucide-react';

type Status = 'idle' | 'ready' | 'loading' | 'done' | 'error';

async function readApiResult(response: Response): Promise<string> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (contentType.includes('image/')) {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  const data = await response.json();
  const output = data.imageUrl ?? data.url ?? data.image ?? data.result ?? data.output;

  if (Array.isArray(output) && typeof output[0] === 'string') {
    return output[0];
  }

  if (typeof output === 'string') {
    if (output.startsWith('data:image/')) return output;
    if (output.startsWith('http')) return output;
    return `data:image/png;base64,${output}`;
  }

  throw new Error('API response format not supported');
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('Choisis une photo, ajoute ton API, puis lance la transformation.');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setMessage('Merci de choisir un fichier image valide.');
      return;
    }

    setSelectedFile(file);
    setOriginalPreview(URL.createObjectURL(file));
    setResultImage(null);
    setStatus('ready');
    setMessage('Photo chargée. Ajoute ton API puis clique sur Transformer.');
    event.target.value = '';
  };

  const handleTransform = async () => {
    if (!selectedFile) {
      setStatus('error');
      setMessage('Choisis d’abord une photo.');
      return;
    }

    if (!apiUrl.trim()) {
      setStatus('error');
      setMessage('Ajoute l’URL de ton API avant de lancer la transformation.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('Transformation en cours avec ton API...');

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('prompt', 'trending anime art style, clean line-work, saturated colors, cel shading, energetic cartoon style');

      const response = await fetch(apiUrl.trim(), {
        method: 'POST',
        body: formData,
      });

      const image = await readApiResult(response);
      setResultImage(image);
      setStatus('done');
      setMessage('Transformation terminée. Tu peux télécharger le résultat.');
    } catch {
      setStatus('error');
      setMessage('Erreur API. Vérifie l’URL, le format attendu par ton API et les autorisations CORS.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white font-sans antialiased overflow-x-hidden">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">TOONIFY.AI</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#transform" className="hover:text-pink-400 transition-colors">Transformer</a>
              <a href="#api" className="hover:text-pink-400 transition-colors">API</a>
              <button onClick={openFilePicker} className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-full text-white font-semibold shadow-lg shadow-pink-500/25">
                Choisir une photo
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 hover:text-white" aria-label="Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-purple-500/20 px-4 pt-2 pb-4 space-y-2">
            <a href="#transform" className="block py-2 text-slate-300 hover:text-pink-400" onClick={() => setIsMenuOpen(false)}>Transformer</a>
            <a href="#api" className="block py-2 text-slate-300 hover:text-pink-400" onClick={() => setIsMenuOpen(false)}>API</a>
            <button onClick={openFilePicker} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-xl font-semibold">Choisir une photo</button>
          </div>
        )}
      </nav>

      <header className="pt-32 pb-12 md:pt-44 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Version connectable à ton API
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Transforme tes photos en
            <span className="block bg-gradient-to-r from-pink-500 via-purple-400 to-amber-400 bg-clip-text text-transparent">anime stylisé</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Cette page n’est plus seulement une interface : elle peut envoyer une photo vers ton API, récupérer le résultat et afficher l’image générée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={openFilePicker} className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-pink-500/20">
              Importer une photo <Upload className="h-5 w-5" />
            </button>
            <a href="#transform" className="text-center px-8 py-4 rounded-2xl text-lg font-semibold border border-slate-700 hover:border-purple-500 hover:bg-purple-500/10">
              Voir le transformateur
            </a>
          </div>
        </div>

        <div className="relative rounded-3xl border border-purple-500/30 bg-slate-900/70 p-4 shadow-2xl shadow-purple-950/40 min-h-[420px] flex items-center justify-center overflow-hidden">
          {resultImage ? (
            <img src={resultImage} alt="Résultat Toonify" className="w-full h-full object-contain rounded-2xl" />
          ) : (
            <div className="text-center space-y-4">
              <Camera className="h-20 w-20 mx-auto text-pink-400" />
              <p className="text-xl font-black">Aucun résultat pour le moment</p>
              <p className="text-slate-400">Importe une photo et connecte ton API.</p>
            </div>
          )}
        </div>
      </header>

      <section id="transform" className="py-16 border-t border-purple-500/10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black">Transformateur photo</h2>
            <p className="text-slate-400">API attendue : requête POST avec un champ FormData nommé <span className="text-pink-300 font-semibold">image</span>.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 min-h-[360px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Photo originale</h3>
                <button onClick={openFilePicker} className="text-sm font-semibold text-pink-300 hover:text-pink-200">Changer</button>
              </div>
              <div className="flex-1 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-center overflow-hidden">
                {originalPreview ? (
                  <img src={originalPreview} alt="Photo originale" className="w-full h-full object-contain" />
                ) : (
                  <button onClick={openFilePicker} className="px-6 py-4 text-center text-slate-300 hover:text-white transition-colors">Clique ici pour choisir une photo</button>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-purple-500/30 bg-slate-900/70 p-4 min-h-[360px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Résultat API</h3>
                {resultImage && (
                  <a href={resultImage} download="toonify-result.png" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200">
                    <Download className="h-4 w-4" /> Télécharger
                  </a>
                )}
              </div>
              <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/60 flex items-center justify-center overflow-hidden">
                {status === 'loading' && <div className="flex items-center gap-2 text-slate-300"><Loader2 className="h-5 w-5 animate-spin" /> Transformation...</div>}
                {status === 'error' && <p className="text-red-300 text-center px-4">{message}</p>}
                {resultImage && <img src={resultImage} alt="Résultat généré" className="w-full h-full object-contain" />}
                {status !== 'loading' && !resultImage && status !== 'error' && <p className="text-slate-400 text-center px-4">Le résultat apparaîtra ici.</p>}
              </div>
            </div>
          </div>

          <div id="api" className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <label className="block text-sm font-semibold text-slate-200">URL de ton API</label>
            <input
              value={apiUrl}
              onChange={(event) => setApiUrl(event.target.value)}
              placeholder="https://ton-api.com/toonify"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
            />
            <p className="text-sm text-slate-400">Ne mets pas une clé API secrète dans cette page publique. L’API doit accepter les appels depuis GitHub Pages.</p>
            <button onClick={handleTransform} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 px-8 py-4 rounded-2xl text-lg font-bold">
              Transformer avec mon API <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-sm text-slate-300">Statut : {message}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
