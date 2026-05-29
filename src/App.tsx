import { useState } from 'react';
import { Camera, Sparkles, Layers, Smile, Menu, X, ArrowRight } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white font-sans antialiased selection:bg-pink-500 selection:text-white overflow-x-hidden">

      {/* --- BARRE DE NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500 animate-pulse" />
              <span className="font-black text-xl tracking-wider bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
                TOONIFY.AI
              </span>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#style" className="hover:text-pink-400 transition-colors">Le Style</a>
              <a href="#features" className="hover:text-pink-400 transition-colors">Fonctionnalités</a>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 py-2 rounded-full text-white font-semibold shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-0.5">
                Essayer Gratuitement
              </button>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Déroulant Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-purple-500/20 px-4 pt-2 pb-4 space-y-2">
            <a href="#style" className="block py-2 text-slate-300 hover:text-pink-400" onClick={() => setIsMenuOpen(false)}>Le Style</a>
            <a href="#features" className="block py-2 text-slate-300 hover:text-pink-400" onClick={() => setIsMenuOpen(false)}>Fonctionnalités</a>
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-xl font-semibold">
              Essayer Gratuitement
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 z-10">

        {/* Colonne Gauche : Textes et Actions */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Nouveau Style : Trending Anime Art
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
            Transformez vos photos en <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
              Anime Énergique & Comique
            </span>
          </h1>

          <p className="text-lg text-slate-300 font-normal leading-relaxed">
            Donnez vie à vos portraits avec un style cartoon ultra-expressif. Des lignes affirmées, des couleurs vibrantes et saturées, des perspectives exagérées et un univers totalement stylisé pour un rendu unique et dynamique.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 hover:opacity-95 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-pink-500/20 transition-all transform hover:-translate-y-1 group">
              Transformer une Photo
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#style" className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl text-lg font-semibold border border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all">
              Voir les exemples
            </a>
          </div>
        </div>

        {/* Colonne Droite : Visuel / Simulation d'Espace Distordu */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-none aspect-square lg:aspect-auto lg:h-[450px] flex items-center justify-center">
          {/* Halos lumineux décoratifs en arrière-plan */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl -z-10" />

          {/* Conteneur de démonstration avec distorsion de perspective */}
          <div className="relative w-full h-full border border-purple-500/30 rounded-3xl bg-slate-900/60 p-4 backdrop-blur-sm shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-gradient-to-tr from-purple-800 to-pink-600 rounded-2xl flex flex-col justify-between p-6 overflow-hidden relative group">
              {/* Effet graphique d'arrière-plan type "Rayons de soleil" */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/40 via-transparent to-transparent opacity-60 pointer-events-none skew-x-12 scale-150" />

              <div className="flex justify-between items-start z-10">
                <span className="bg-slate-950/80 text-amber-400 text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest border border-amber-400/30">
                  STYLE ACTIF
                </span>
                <Camera className="h-6 w-6 text-white drop-shadow" />
              </div>

              {/* Box centrale simulant le style d'anatomie exagérée / cartoon */}
              <div className="my-auto text-center z-10 space-y-2 transform -skew-y-3">
                <div className="text-6xl filter drop-shadow-md animate-bounce">🤪</div>
                <div className="font-black text-2xl tracking-tight text-white uppercase bg-slate-950 px-4 py-1 inline-block rounded border-2 border-pink-500">
                  Lignes nettes & Shading plat
                </div>
              </div>

              <div className="text-xs text-purple-200 font-medium tracking-wide bg-slate-950/40 p-2 rounded-lg backdrop-blur-sm z-10">
                ⚡ Proportions exagérées & Perspective distordue
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECTION DES CARACTÉRISTIQUES ARTISTIQUES --- */}
      <section id="style" className="bg-slate-950/60 py-20 border-t border-purple-500/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Directives Artistiques Appliquées
            </h2>
            <p className="text-slate-400">
              Notre algorithme respecte scrupuleusement les codes graphiques du <span className="text-pink-400 font-semibold">Trending Anime Art</span> pour créer un rendu unique.
            </p>
          </div>

          {/* Grille responsive des spécifications demandées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-pink-500/40 transition-all">
              <Layers className="h-8 w-8 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Line-work & Cel Shading</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Des lignes nettes et confiantes avec de légères variations d'épaisseur. Ombrage minimaliste utilisant des formes d'ombres plates (Flat Shadows).
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all">
              <Sparkles className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Lumières & Couleurs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Utilisation de teintes hautement saturées et éclatantes, associées à un éclairage graphique propre et contrasté pour un rendu percutant.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all">
              <Smile className="h-8 w-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Expressions Exagérées</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Proportions de personnages cartoonish et anatomie étirée (stretched). Traits faciaux simplifiés permettant une palette d'émotions immense.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all">
              <Camera className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Espace Distordu</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                L'environnement est transformé en un espace légèrement voilé avec une distorsion ludique de la perspective et des objets simplifiés.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
