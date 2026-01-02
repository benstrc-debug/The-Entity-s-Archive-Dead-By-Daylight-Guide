
import React, { useState, useEffect, useMemo } from 'react';
import { PerkDetails, PerkCategory, GameStatus, Role } from './types';
import { INITIAL_PERKS, GAME_STATUSES } from './constants';
import { getPerkDeepDive } from './services/geminiService';

// --- Sub-components ---

const Header: React.FC = () => (
  <header className="border-b border-orange-900/50 bg-[#0a0a0a] p-8 flex flex-col items-center relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
      <div className="w-full h-full bg-[radial-gradient(circle,rgba(234,88,12,0.2)_0%,transparent_70%)]" />
    </div>
    
    <h1 className="text-4xl md:text-7xl font-cinzel text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.6)] uppercase tracking-[0.25em] text-center font-bold">
      Trial Optimization Protocol
    </h1>
    <div className="flex items-center gap-6 mt-4">
      <div className="h-px w-24 bg-gradient-to-r from-transparent to-orange-900" />
      <p className="text-bronze text-base text-[#d4af37] font-cinzel font-semibold italic uppercase tracking-[0.4em]">
        The Entity's Archive // Metadata Node 2025
      </p>
      <div className="h-px w-24 bg-gradient-to-l from-transparent to-orange-900" />
    </div>
  </header>
);

const ArchiveInstructions: React.FC = () => (
  <section className="max-w-4xl mx-auto w-full mb-12 animate-fadeIn px-4">
    <div className="bg-[#0d0d0d] border-2 border-orange-900/40 rounded-2xl p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-600 rounded-tl-xl opacity-50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-600 rounded-tr-xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-600 rounded-bl-xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-600 rounded-br-xl opacity-50" />
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-shrink-0 text-5xl md:text-6xl text-orange-900/30 font-cinzel opacity-40 select-none">
          INFO
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-cinzel text-orange-500 uppercase tracking-widest border-b border-orange-900/30 pb-2">
            Archive Access Instructions
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed italic">
            Welcome to the centralized node for Trial knowledge. This archive has been decanted from the Fog to provide total transparency into the metaphysical abilities of both Survivors and Killers. Use this terminal to optimize your performance and survive—or conquer—the Trials.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex gap-3">
              <span className="text-orange-600 font-bold">1.</span>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide leading-snug">
                Toggle the <span className="text-orange-300">Survivor/Killer</span> frequency using the primary role switch in the sidebar.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-orange-600 font-bold">2.</span>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide leading-snug">
                Filter by <span className="text-orange-300">Utility Category</span> or use the search lens to isolate specific Perk data.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-orange-600 font-bold">3.</span>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide leading-snug">
                Invoke <span className="text-orange-300">AI Clairvoyance</span> on the right panel to extract deep meta-synergies and frame data.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-orange-600 font-bold">4.</span>
              <p className="text-[11px] text-gray-500 uppercase tracking-wide leading-snug">
                Engage with <span className="text-orange-300">Trial Simulations</span> at the base of each perk to verify your readiness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RoleToggle: React.FC<{ activeRole: Role; onChange: (role: Role) => void }> = ({ activeRole, onChange }) => (
  <div className="flex w-full rounded-lg overflow-hidden border border-orange-900/30 mb-6 shadow-lg">
    <button
      onClick={() => onChange(Role.SURVIVOR)}
      className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all font-cinzel text-xs tracking-widest ${
        activeRole === Role.SURVIVOR 
          ? 'bg-blue-900/40 text-blue-400 border-b-2 border-blue-500' 
          : 'bg-[#111] text-gray-600 hover:bg-[#1a1a1a]'
      }`}
    >
      <span>🏃</span> SURVIVOR
    </button>
    <button
      onClick={() => onChange(Role.KILLER)}
      className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all font-cinzel text-xs tracking-widest ${
        activeRole === Role.KILLER 
          ? 'bg-red-900/40 text-red-400 border-b-2 border-red-500' 
          : 'bg-[#111] text-gray-600 hover:bg-[#1a1a1a]'
      }`}
    >
      <span>💀</span> KILLER
    </button>
  </div>
);

const CategoryBadge: React.FC<{ category: PerkCategory | 'All'; active: boolean; onClick: () => void }> = ({ category, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-sm border transition-all duration-300 font-bold uppercase text-[9px] tracking-wider ${
      active 
        ? 'bg-orange-700 border-orange-400 text-white shadow-[0_0_10px_rgba(234,88,12,0.2)]' 
        : 'bg-[#1a1a1a] border-gray-800 text-gray-500 hover:border-orange-800 hover:text-orange-500'
    }`}
  >
    {category}
  </button>
);

const PerkCard: React.FC<{ perk: PerkDetails; selected: boolean; onClick: () => void }> = ({ perk, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`group relative p-3 bg-[#111] border-l-4 cursor-pointer transition-all hover:bg-[#1a1a1a] mb-2 ${
      selected ? 'border-orange-600 bg-[#1a1300]' : 'border-gray-800 hover:border-orange-900'
    }`}
  >
    <div className="flex justify-between items-start mb-1">
      <h3 className={`text-sm font-cinzel ${selected ? 'text-orange-400' : 'text-orange-100'} group-hover:text-orange-500 transition-colors`}>
        {perk.name}
      </h3>
      <div className="w-4 h-4 rounded-full border border-gray-700 flex items-center justify-center text-[8px] text-gray-500">
        {perk.role === Role.SURVIVOR ? 'S' : 'K'}
      </div>
    </div>
    <div className="flex flex-col gap-0.5">
      <div className="flex gap-2 items-center">
        <span className="text-[8px] text-gray-600 uppercase tracking-tighter">{perk.category}</span>
        <span className="text-[8px] text-orange-900">•</span>
        <span className="text-[8px] text-orange-500 italic font-bold tracking-tighter">{perk.source}</span>
      </div>
      <span className="text-[8px] text-gray-700 uppercase tracking-tighter line-clamp-1">{perk.description}</span>
    </div>
    {selected && <div className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 text-sm">▶</div>}
  </div>
);

const PerkQuiz: React.FC<{ perk: PerkDetails }> = ({ perk }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
  }, [perk.id]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentQuestion(prev => (prev + 1) % perk.quiz.length);
  };

  const q = perk.quiz[currentQuestion];
  if (!q) return null;

  return (
    <div className="mt-8 bg-[#1a1313] border border-red-900/30 p-6 rounded-lg shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-600 text-xl">⚔️</span>
        <h4 className="text-lg font-cinzel text-red-500 uppercase tracking-widest underline decoration-red-900 decoration-2 underline-offset-8">Trial Simulation</h4>
      </div>
      <p className="text-gray-200 mb-6 font-medium italic text-base leading-relaxed">"{q.question}"</p>
      
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded border transition-all text-sm ${
              showResult
                ? i === q.correctIndex
                  ? 'bg-green-900/40 border-green-500 text-green-200 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]'
                  : i === selectedOption
                  ? 'bg-red-900/40 border-red-500 text-red-200 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]'
                  : 'bg-gray-900 border-gray-800 text-gray-500 opacity-50'
                : 'bg-[#222] border-gray-800 text-gray-300 hover:border-orange-500 hover:bg-[#2a2a2a]'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{opt}</span>
              {showResult && i === q.correctIndex && <span className="text-green-400 font-bold ml-2">VICTORY</span>}
              {showResult && i === selectedOption && i !== q.correctIndex && <span className="text-red-400 font-bold ml-2">SACRIFICED</span>}
            </div>
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-4 animate-fadeIn">
          <div className="p-4 bg-black/60 border-l-4 border-orange-500 rounded">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-bold text-orange-500 uppercase mr-2">EVIDENCE:</span>
              {q.explanation}
            </p>
          </div>
          {perk.quiz.length > 1 && (
            <button
              onClick={nextQuestion}
              className="mt-4 px-6 py-2 bg-orange-800 hover:bg-orange-700 text-white rounded font-bold transition-colors uppercase text-[10px] tracking-widest"
            >
              Next Trial Scenario
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.SURVIVOR);
  const [selectedCategory, setSelectedCategory] = useState<PerkCategory | 'All'>('All');
  const [selectedPerkId, setSelectedPerkId] = useState<string>(INITIAL_PERKS[0].id);
  const [isLoadingDeepDive, setIsLoadingDeepDive] = useState(false);
  const [customDeepDives, setCustomDeepDives] = useState<Record<string, Partial<PerkDetails>>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPerks = useMemo(() => {
    return INITIAL_PERKS.filter(p => {
      const roleMatch = p.role === selectedRole;
      const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return roleMatch && catMatch && searchMatch;
    });
  }, [selectedRole, selectedCategory, searchQuery]);

  useEffect(() => {
    if (filteredPerks.length > 0 && !filteredPerks.some(p => p.id === selectedPerkId)) {
      setSelectedPerkId(filteredPerks[0].id);
    }
  }, [selectedRole, filteredPerks]);

  const activePerk = useMemo(() => {
    const base = INITIAL_PERKS.find(p => p.id === selectedPerkId) || INITIAL_PERKS[0];
    const deepDive = customDeepDives[selectedPerkId] || {};
    return { ...base, ...deepDive };
  }, [selectedPerkId, customDeepDives]);

  const handleDeepDive = async () => {
    if (customDeepDives[selectedPerkId]) return;
    setIsLoadingDeepDive(true);
    try {
      const data = await getPerkDeepDive(activePerk.name);
      setCustomDeepDives(prev => ({ ...prev, [selectedPerkId]: data }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDeepDive(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col selection:bg-orange-600/30">
      <Header />
      
      <main className="flex-1 flex flex-col p-4 md:p-8 max-w-[1600px] mx-auto w-full overflow-hidden">
        {/* New Instructions Section */}
        <ArchiveInstructions />

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 h-full lg:max-h-[85vh]">
            <div className="bg-[#0a0a0a] border border-orange-900/30 p-4 rounded-lg flex flex-col h-full shadow-2xl">
              <RoleToggle activeRole={selectedRole} onChange={setSelectedRole} />
              
              <div className="relative mb-4">
                <input 
                  type="text"
                  placeholder={`Search ${selectedRole} perks...`}
                  className="w-full bg-[#111] border border-gray-800 p-3 rounded text-sm text-orange-200 focus:outline-none focus:border-orange-600 pl-10 placeholder:text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">🔍</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['All', ...Object.values(PerkCategory)].map(cat => (
                  <CategoryBadge 
                    key={cat} 
                    category={cat as PerkCategory} 
                    active={selectedCategory === cat} 
                    onClick={() => setSelectedCategory(cat as any)}
                  />
                ))}
              </div>

              <div className="space-y-1 overflow-y-auto pr-2 flex-1 custom-scrollbar min-h-[300px]">
                {filteredPerks.map(perk => (
                  <PerkCard 
                    key={perk.id} 
                    perk={perk} 
                    selected={selectedPerkId === perk.id}
                    onClick={() => setSelectedPerkId(perk.id)}
                  />
                ))}
                {filteredPerks.length === 0 && (
                  <div className="flex flex-col items-center py-12 text-gray-800 opacity-50">
                    <span className="text-5xl mb-4">🌀</span>
                    <p className="text-xs text-center font-cinzel italic tracking-widest">The Archive is empty for this query.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-orange-900/30 p-4 rounded-lg hidden lg:block">
              <h4 className="text-[#d4af37] font-cinzel text-xs border-b border-orange-900/50 pb-2 mb-3 uppercase tracking-widest text-center">
                Ailment Encyclopedia
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {GAME_STATUSES.slice(0, 8).map((status) => (
                  <div key={status.name} className="flex items-start gap-2 p-2 bg-black/40 rounded border border-white/5 hover:border-orange-900/30 transition-colors">
                    <span className="text-base" title={status.name}>{status.icon}</span>
                    <div>
                      <p className="text-[8px] font-bold text-orange-500 uppercase tracking-tighter">{status.name}</p>
                      <p className="text-[7px] text-gray-600 leading-none mt-0.5">{status.effect}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#0a0a0a] border border-orange-900/20 rounded-xl overflow-hidden shadow-2xl flex flex-col h-fit lg:max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="relative h-48 md:h-80 overflow-hidden flex-shrink-0">
              <img 
                src={`https://picsum.photos/seed/dbd-art-${activePerk.id}/1600/900`} 
                className="w-full h-full object-cover opacity-10 grayscale sepia-50 contrast-150 transition-all duration-1000 scale-105"
                alt="Visualizing the Fog"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
              
              <div className="absolute bottom-10 left-10">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1a1a1a] to-[#050505] border-4 border-orange-700/80 rotate-45 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(234,88,12,0.5)] group">
                    <span className="text-5xl -rotate-45 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">
                      {activePerk.role === Role.SURVIVOR ? '🕯️' : '🩸'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-5xl md:text-6xl font-cinzel text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg">
                      {activePerk.name}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <span className="text-orange-400 font-bold text-[10px] bg-orange-950/40 px-4 py-1.5 border border-orange-800/40 uppercase tracking-[0.2em] rounded-sm">
                        {activePerk.category} Utility
                      </span>
                      <span className="text-bronze font-bold text-[10px] bg-black/60 px-4 py-1.5 border border-[#d4af37]/20 uppercase tracking-[0.2em] rounded-sm text-[#d4af37]">
                        {activePerk.rarity}
                      </span>
                      <span className="text-white font-bold text-[10px] bg-red-900/40 px-4 py-1.5 border border-red-700/40 uppercase tracking-[0.2em] rounded-sm shadow-inner">
                        Origin: {activePerk.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Main Column */}
                <div className="xl:col-span-2 space-y-12">
                  <section>
                    <h4 className="text-[#d4af37] font-cinzel text-xl mb-6 uppercase border-b border-orange-900/40 pb-3 flex items-center gap-4">
                      <span className="text-2xl text-orange-800">01.</span> THE ARCHIVE TRANSCRIPT
                    </h4>
                    <div className="relative group">
                      <div className="absolute -left-8 top-0 bottom-0 w-1.5 bg-orange-600 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.8)] transition-all group-hover:w-2" />
                      <div className="bg-[#111] p-8 rounded-r-xl border border-white/5 shadow-2xl backdrop-blur-sm">
                        <p className="text-gray-100 text-xl leading-relaxed italic first-letter:text-4xl first-letter:font-cinzel first-letter:text-orange-500 first-letter:mr-1">
                          {activePerk.description}
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-sm text-orange-500/80 font-cinzel">
                          <span className="text-lg">🗝️</span>
                          <span>UNLOCKED VIA: {activePerk.source.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-orange-500 font-cinzel text-xl mb-6 uppercase flex items-center gap-4">
                      <span className="text-2xl text-orange-800">02.</span> ANATOMY OF THE PERK
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activePerk.hiddenMechanics?.map((mech, i) => (
                        <div key={i} className="flex items-start gap-4 text-sm text-gray-400 bg-black/60 p-5 rounded-lg border border-gray-800/40 hover:border-orange-500/40 hover:bg-orange-950/5 transition-all">
                          <span className="text-orange-600 font-bold text-lg">•</span>
                          <span className="leading-relaxed">{mech}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-orange-500 font-cinzel text-xl mb-6 uppercase flex items-center gap-4">
                      <span className="text-2xl text-orange-800">03.</span> EXECUTION PROTOCOL
                    </h4>
                    <div className="space-y-4">
                      {activePerk.usageSteps?.map((step, i) => (
                        <div key={i} className="flex gap-6 items-center bg-[#0d0d0d] p-6 rounded-xl border border-white/5 group hover:bg-[#111] transition-all">
                          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-900 to-red-950 border-2 border-orange-600 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(234,88,12,0.4)] group-hover:scale-110 transition-transform">
                            {i + 1}
                          </span>
                          <p className="text-base text-gray-300 font-medium tracking-tight leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  {activePerk.quiz && activePerk.quiz.length > 0 && (
                    <PerkQuiz perk={activePerk as PerkDetails} />
                  )}
                </div>

                {/* Info Sidebar Column */}
                <div className="space-y-8">
                  <div className="p-8 bg-gradient-to-br from-orange-950/20 to-black border border-orange-900/30 rounded-2xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 text-6xl opacity-5 rotate-12 group-hover:rotate-45 transition-transform">🏆</div>
                    <h5 className="text-[#d4af37] font-cinzel text-sm uppercase mb-4 tracking-widest flex items-center gap-3">
                      <span className="h-0.5 w-6 bg-[#d4af37]/40" /> PEAK SCENARIO
                    </h5>
                    <p className="text-sm text-orange-100/80 leading-relaxed italic">
                      "{activePerk.bestCaseScenario}"
                    </p>
                  </div>

                  <div className="p-8 bg-gradient-to-br from-red-950/10 to-black border border-red-900/20 rounded-2xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 text-6xl opacity-5 rotate-12 group-hover:rotate-45 transition-transform">🗝️</div>
                    <h5 className="text-red-600 font-cinzel text-sm uppercase mb-4 tracking-widest flex items-center gap-3">
                      <span className="h-0.5 w-6 bg-red-900/40" /> PRO-INSIGHTS
                    </h5>
                    <p className="text-xs text-gray-400 leading-loose border-l border-red-900/40 pl-4 py-2">
                      {activePerk.untoldTips}
                    </p>
                  </div>

                  {!customDeepDives[selectedPerkId] && (
                    <button
                      onClick={handleDeepDive}
                      disabled={isLoadingDeepDive}
                      className="w-full py-6 bg-black border-2 border-dashed border-orange-900/40 hover:border-orange-600/60 text-orange-900 hover:text-orange-500 transition-all font-cinzel text-xs flex flex-col items-center justify-center gap-3 rounded-2xl group shadow-lg"
                    >
                      {isLoadingDeepDive ? (
                        <>
                          <span className="animate-spin text-4xl mb-2 text-orange-500">🌀</span>
                          <span className="animate-pulse tracking-[0.4em]">DECRYPTING...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl group-hover:scale-125 transition-all group-hover:rotate-12">👁️</span>
                          <span className="tracking-[0.2em] font-bold">INVOKE AI CLAIRVOYANCE</span>
                          <span className="text-[9px] text-gray-700 uppercase italic">Expose deep meta-synergies</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className="pt-12 text-center space-y-8">
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent to-orange-900/30" />
                      <span className="text-gray-800 text-3xl shrink-0">💀</span>
                      <div className="h-px w-full bg-gradient-to-l from-transparent to-orange-900/30" />
                    </div>
                    <div className="space-y-2 opacity-30 group">
                        <p className="text-[10px] text-orange-950 uppercase tracking-[0.5em] font-bold group-hover:text-orange-700 transition-colors">
                          Death is not an escape.
                        </p>
                        <p className="text-[8px] text-orange-950 uppercase italic tracking-widest">
                          The Entity is always watching.
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-10 text-center bg-black border-t border-white/5 mt-auto">
        <div className="flex justify-center gap-12 mb-6 text-gray-800 text-2xl opacity-20">
          <span className="hover:scale-110 transition-transform hover:opacity-100 cursor-default">⚙️</span>
          <span className="hover:scale-110 transition-transform hover:opacity-100 cursor-default">🔪</span>
          <span className="hover:scale-110 transition-transform hover:opacity-100 cursor-default">🔦</span>
          <span className="hover:scale-110 transition-transform hover:opacity-100 cursor-default">🎒</span>
        </div>
        <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-orange-900/20 to-transparent mb-6" />
        <p className="text-orange-900/40 text-[10px] uppercase tracking-[0.4em] mb-3 font-cinzel">
          Archive Protocol 2025.10.X-ENTITY
        </p>
        <p className="text-gray-900 text-[9px] uppercase tracking-widest leading-loose">
          EST. 2016 // DESIGNED BY THE FOG RESEARCH DEPARTMENT // AUTHORIZED ACCESS ONLY // DATA SUBJECT TO REALITY SHIFTING
        </p>
      </footer>
    </div>
  );
};

export default App;
