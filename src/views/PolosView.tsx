import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Polo } from '../types';
import { SEOHead } from '../components/SEOHead';
import { PageHeader } from '../components/PageHeader';
import { SafeImage } from '../components/ui/SafeImage';

export const PolosView: React.FC = () => {
  const { polos, navigateToEnroll, siteSettings } = useApp();
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Todos');

  const distinctMunicipalities = Array.from(new Set(polos.map(p => p.municipality)));
  const municipalities = ['Todos', ...distinctMunicipalities];

  const filteredPolos = selectedMunicipality === 'Todos'
    ? polos
    : polos.filter(p => p.municipality === selectedMunicipality || p.municipality.includes(selectedMunicipality));

  return (
    <div className="w-full bg-background py-8 md:py-12">
      <SEOHead
        title={`Polos e Instalações Industriais em Luanda | ${siteSettings.brandShortName || 'Técnogest'}`}
        description={`Conheça os polos e pátios de manobras da Técnogest em Luanda: Sede Valódia (Edifício da Comunicação Social, 10º Andar), Polo Viana (Pátio de Manobras e Oficina) e Polo Boavista (Porto).`}
        keywords={[
          'polos tecnogest luanda',
          'sede bairro valodia tecnogest',
          'patio manobras viana rigger',
          'polo boavista porto luanda',
          'contactos tecnogest angola'
        ]}
        canonicalUrl="https://tecnogest.ao/polos"
      />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8">
        {/* Header */}
        <PageHeader
          title="Polos de Formação & Pátios de Manobra"
          description="Instalações climatizadas, pátios de treino para Rigger e Gruas, e gabinetes de assessoria para o Plano Portugal em Luanda."
          icon="apartment"
        />

        {/* Municipality filter chips */}
        <div className="flex flex-wrap justify-start sm:justify-center gap-2">
          {municipalities.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMunicipality(m)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMunicipality === m
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Polos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPolos.map((polo) => (
            <div
              key={polo.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-surface-container-high">
                  <SafeImage
                    src={polo.image}
                    alt={polo.name}
                    category="polo"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2558]/90 via-[#0A2558]/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-[#00D2FF] text-[#0A2558] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 inline-block">
                      {polo.municipality}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white m-0">
                      {polo.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-xs text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      location_on
                    </span>
                    <p className="leading-relaxed font-medium">{polo.address}</p>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-2.5 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                      schedule
                    </span>
                    <span>{polo.schedule}</span>
                  </div>

                  {/* Facilities tags */}
                  {polo.facilities && polo.facilities.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        Infraestrutura & Recursos:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {polo.facilities.map((fac, i) => (
                          <span
                            key={i}
                            className="bg-surface-container text-on-surface text-[11px] px-2.5 py-1 rounded-md border border-outline-variant/30 font-medium"
                          >
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Courses */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5">
                      Cursos em Destaque no Polo:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {polo.featuredCourses.map((fc, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary font-bold text-[11px] px-2 py-0.5 rounded"
                        >
                          {fc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => navigateToEnroll(undefined, polo.id)}
                  className="flex-1 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  <span>Inscrever Neste Polo</span>
                </button>
                <a
                  href={`https://wa.me/${polo.whatsapp.replace(/[^0-9]/g, '')}?text=Olá,%20gostaria%20de%20informações%20sobre%20o%20${encodeURIComponent(polo.name)}%20da%20Técnogest`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5A] text-white p-3 rounded-xl transition-colors flex items-center justify-center shadow-xs"
                  title="Falar no WhatsApp"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
