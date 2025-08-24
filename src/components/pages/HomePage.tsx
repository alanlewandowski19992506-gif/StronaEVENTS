import React, { useState } from 'react';
import { Camera, ArrowRight, Shield, Calendar, MapPin, Users, Star, Heart, Zap, Award, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { EventCard } from '../events/EventCard';
import { EventDetail } from '../events/EventDetail';
import { Event } from '../../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full mb-8 shadow-2xl animate-pulse">
              <Sparkles className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent">
              Flow High
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Odkryj świat niezapomnianych przygód i poznaj niesamowitych ludzi. 
            Każdy event to nowa historia, każde spotkanie to nowa przyjaźń.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => onNavigate('events')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Odkryj Eventy
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate('register')}
              className="bg-transparent border-2 border-purple-300 text-purple-200 hover:bg-purple-300 hover:text-purple-900 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
            >
              Dołącz do Nas
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-300 text-sm md:text-base">Eventów</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-purple-300 text-sm md:text-base">Uczestników</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-purple-300 text-sm md:text-base">Miast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-purple-300 text-sm md:text-base">Ocena</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Dlaczego <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Flow High</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jesteśmy więcej niż platformą eventową - jesteśmy społecznością, która łączy ludzi przez wspólne pasje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Różnorodne Eventy</h3>
              <p className="text-gray-600 leading-relaxed">
                Od silent disco po spływy kajakowe - znajdź event idealny dla siebie. Każdy weekend to nowa przygoda!
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-pink-100">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Wspaniała Społeczność</h3>
              <p className="text-gray-600 leading-relaxed">
                Poznaj ludzi o podobnych zainteresowaniach. Nasze eventy to miejsce, gdzie rodzą się prawdziwe przyjaźnie.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cała Polska</h3>
              <p className="text-gray-600 leading-relaxed">
                Organizujemy eventy w ponad 50 miastach w Polsce. Bez względu na to gdzie jesteś, znajdziesz coś dla siebie.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Najwyższa Jakość</h3>
              <p className="text-gray-600 leading-relaxed">
                Każdy event jest starannie zaplanowany i przeprowadzony. Dbamy o każdy detal, abyś miał niezapomniane wrażenia.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Łatwa Rezerwacja</h3>
              <p className="text-gray-600 leading-relaxed">
                Zarezerwuj miejsce w kilka kliknięć. Nasza platforma jest intuicyjna i przyjazna użytkownikowi.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-red-100">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pasja w Każdym Detalu</h3>
              <p className="text-gray-600 leading-relaxed">
                Robimy to z miłości do ludzi i przygód. Każdy event to kawałek naszego serca, który dzielimy z Tobą.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Award className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Co Mówią o Nas Uczestnicy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Przeczytaj opinie tysięcy zadowolonych uczestników naszych eventów
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Anna K.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "Silent disco w Krakowie było niesamowite! Poznałam wspaniałych ludzi i bawiłam się jak nigdy wcześniej. Już nie mogę doczekać się kolejnego eventu!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Michał P.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "Spływ kajakowy był przygodą życia! Organizacja na najwyższym poziomie, a atmosfera niepowtarzalna. Polecam każdemu!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  K
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Kasia W.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "Flow High to więcej niż eventy - to społeczność! Dzięki nim poznałam swoich najlepszych przyjaciół. Każdy event to nowa przygoda!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Users className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nasza Ekipa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poznaj ludzi, którzy tworzą magię Flow High i dbają o każdy detal Waszych przygód
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kamil */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-105 transition-transform duration-300">
                  K
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kamil</h3>
              <p className="text-purple-600 font-semibold mb-3">Założyciel & CEO</p>
              <p className="text-gray-600 leading-relaxed">
                Wizjoner Flow High, który zamienia marzenia o niezapomnianych eventach w rzeczywistość. Pasjonat przygód i budowania społeczności.
              </p>
            </div>

            {/* Adrian */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-105 transition-transform duration-300">
                  A
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Adrian</h3>
              <p className="text-blue-600 font-semibold mb-3">Head of Operations</p>
              <p className="text-gray-600 leading-relaxed">
                Mistrz logistyki i organizacji. Dzięki niemu każdy event przebiega bez zakłóceń, a uczestnicy mogą skupić się na zabawie.
              </p>
            </div>

            {/* Filip */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-105 transition-transform duration-300">
                  F
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Filip</h3>
              <p className="text-green-600 font-semibold mb-3">Creative Director</p>
              <p className="text-gray-600 leading-relaxed">
                Kreatywny umysł zespołu, który wymyśla najbardziej innowacyjne i ekscytujące koncepty eventów. Artysta w duszy.
              </p>
            </div>

            {/* Paweł */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-105 transition-transform duration-300">
                  P
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Paweł</h3>
              <p className="text-orange-600 font-semibold mb-3">Community Manager</p>
              <p className="text-gray-600 leading-relaxed">
                Serce społeczności Flow High. Buduje relacje z uczestnikami i dba o to, żeby każdy czuł się częścią naszej rodziny.
              </p>
            </div>
          </div>

          {/* Team Values */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nasze Wartości</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="font-semibold text-gray-800">Pasja</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  <span className="font-semibold text-gray-800">Społeczność</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <span className="font-semibold text-gray-800">Innowacja</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onBook={() => {
            // Handle booking logic
            console.log('Booking event:', selectedEvent.title);
          }}
        />
      )}
    </div>
  );
};