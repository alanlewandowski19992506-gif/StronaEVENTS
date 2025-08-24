import HomePage from './components/pages/HomePage';
{/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Camera className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent">
              Galeria Wspomnień
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Zobaczcie najlepsze chwile z naszych eventów i poczujcie magię, którą tworzymy razem
            </p>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {/* Silent Disco Photos */}
            <div className="break-inside-avoid bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎧</div>
                    <div className="text-2xl font-bold">Silent Disco</div>
                    <div className="text-purple-200">Magiczna noc w centrum</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Silent Disco Summer</h3>
                <p className="text-purple-200 text-sm">200+ uczestników tańczyło pod gwiazdami</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-blue-800/30 to-cyan-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-7xl mb-4">🚣</div>
                    <div className="text-2xl font-bold">Spływ Kajakowy</div>
                    <div className="text-blue-200">Po malowniczej Wiśle</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Przygoda na Wodzie</h3>
                <p className="text-blue-200 text-sm">Niezapomniane chwile w otoczeniu przyrody</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-indigo-800/30 to-purple-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 group">
              <div className="aspect-[3/2] bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎬</div>
                    <div className="text-2xl font-bold">Kino Plenerowe</div>
                    <div className="text-indigo-200">Pod rozgwieżdżonym niebem</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Kino pod Gwiazdami</h3>
                <p className="text-indigo-200 text-sm">Romantyczne seanse w Parku Jordana</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-cyan-800/30 to-blue-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
              <div className="aspect-[4/5] bg-gradient-to-br from-cyan-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-7xl mb-4">⛸️</div>
                    <div className="text-2xl font-bold">Łyżwiarstwo</div>
                    <div className="text-cyan-200">Romantyczne wieczory</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Ice Dreams</h3>
                <p className="text-cyan-200 text-sm">Magiczne chwile na lodowej tafli</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-pink-800/30 to-purple-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 group">
              <div className="aspect-[3/3] bg-gradient-to-br from-pink-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="text-2xl font-bold">Behind the Scenes</div>
                    <div className="text-pink-200">Kulisy organizacji</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Nasza Ekipa w Akcji</h3>
                <p className="text-pink-200 text-sm">Zobacz jak powstają nasze eventy</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
              <div className="aspect-[2/3] bg-gradient-to-br from-green-600 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-7xl mb-4">🌿</div>
                    <div className="text-2xl font-bold">Eco Events</div>
                    <div className="text-green-200">Przyjazne środowisku</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Zielone Inicjatywy</h3>
                <p className="text-green-200 text-sm">Dbamy o planetę podczas naszych eventów</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-yellow-800/30 to-orange-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group">
              <div className="aspect-[4/3] bg-gradient-to-br from-yellow-600 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-2xl font-bold">Nagrody i Wyróżnienia</div>
                    <div className="text-yellow-200">Za najlepsze eventy</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Osiągnięcia</h3>
                <p className="text-yellow-200 text-sm">Nasze sukcesy w branży eventowej</p>
              </div>
            </div>

            <div className="break-inside-avoid bg-gradient-to-br from-red-800/30 to-pink-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group">
              <div className="aspect-[3/4] bg-gradient-to-br from-red-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-7xl mb-4">❤️</div>
                    <div className="text-2xl font-bold">Community</div>
                    <div className="text-red-200">Nasza społeczność</div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">Flow High Family</h3>
                <p className="text-red-200 text-sm">Razem tworzymy niezapomniane wspomnienia</p>
              </div>
            </div>
          </div>

          {/* Call to Action for Gallery */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6 shadow-2xl">
              <Camera className="w-10 h-10" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Chcesz zobaczyć więcej?
            </h3>
            <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
              Śledź nas na social mediach, aby być na bieżąco z najnowszymi zdjęciami i filmami z naszych eventów!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-400 hover:to-purple-500 font-semibold px-6 py-3 shadow-lg">
                📸 Instagram
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 font-semibold px-6 py-3 shadow-lg">
                📘 Facebook
              </Button>
              <Button className="bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500 font-semibold px-6 py-3 shadow-lg">
                🎥 TikTok
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-purple-200" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gotowy na Niezapomniane Przygody?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Dołącz do tysięcy zadowolonych uczestników i odkryj świat wyjątkowych wydarzeń
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('events')}
              className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 text-lg shadow-lg"
            >
              Przeglądaj Eventy
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate('register')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 font-semibold px-8 py-4 text-lg"
            >
              Załóż Konto
            </Button>
          </div>
        </div>
      </section>
export default HomePage;