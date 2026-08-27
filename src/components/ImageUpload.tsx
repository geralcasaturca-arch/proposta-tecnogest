import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  helperText?: string;
  categoryHint?: string;
}

const PRESET_COURSE_IMAGES = [
  {
    category: 'Tecnologia',
    title: 'Informática & Redes',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Tecnologia',
    title: 'Programação Web',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Técnico',
    title: 'Eletricidade & Manutenção',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Técnico',
    title: 'Frio & Climatização',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Gestão',
    title: 'Contabilidade & Gestão',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Gestão',
    title: 'Recursos Humanos',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Línguas',
    title: 'Inglês & Comunicação',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Saúde',
    title: 'Farmácia & Enfermagem',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'Beleza & Estética',
    title: 'Estética & Cuidados',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
];

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Imagem de Capa do Curso',
  helperText = 'Formatos suportados: PNG, JPG ou WEBP (máx. 5MB)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecione um ficheiro de imagem válido (.jpg, .png, .webp).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('O ficheiro é muito grande. O tamanho máximo permitido é 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
        setUrlInput(result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Erro ao ler a imagem. Tente novamente.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setErrorMsg(null);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-bold text-on-surface">
          {label} *
        </label>
        
        {/* Tabs for Upload Method */}
        <div className="inline-flex p-0.5 bg-surface-container rounded-lg border border-outline-variant/60">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">upload_file</span>
            <span>Carregar Ficheiro</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'presets'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">photo_library</span>
            <span>Galeria Oficial</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'url'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">link</span>
            <span>Link URL</span>
          </button>
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Preview Section if Image Selected */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-outline-variant bg-surface-container shadow-xs group">
          <div className="relative h-44 w-full bg-black/10 flex items-center justify-center overflow-hidden">
            <img
              src={value}
              alt="Pré-visualização da Capa"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {/* Top Overlay Badge */}
            <div className="absolute top-2 left-2 bg-primary/90 text-on-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">check_circle</span>
              <span>Imagem Carregada</span>
            </div>

            {/* Quick Actions Hover Overlay */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-white/90 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                Substituir
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Remover
              </button>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low flex items-center justify-between text-xs text-on-surface-variant border-t border-outline-variant/60">
            <span className="truncate max-w-[280px] font-mono text-[11px]">
              {value.startsWith('data:') ? 'Ficheiro local (Base64)' : value}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary font-bold hover:underline cursor-pointer text-xs"
            >
              Trocar ficheiro
            </button>
          </div>
        </div>
      ) : (
        /* Empty State / Upload Dropzone */
        <div>
          {activeTab === 'upload' && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[0.99]'
                  : 'border-outline-variant hover:border-primary/60 bg-surface-container-lowest hover:bg-surface-container-low'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-primary flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-[28px]">
                  {isDragging ? 'file_download' : 'add_photo_alternate'}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-primary">
                  {isDragging ? 'Solte a imagem aqui' : 'Clique para selecionar ou arraste uma imagem'}
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  {helperText}
                </p>
              </div>
              <span className="text-[10px] font-extrabold text-primary bg-surface-container px-3 py-1 rounded-full border border-outline-variant">
                Procurar no Computador / Telemóvel
              </span>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="p-3 bg-surface-container-lowest rounded-2xl border border-outline-variant space-y-2">
              <p className="text-[11px] text-on-surface-variant font-medium">
                Selecione uma imagem de alta resolução do catálogo padrão:
              </p>
              <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                {PRESET_COURSE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(img.url);
                      setUrlInput(img.url);
                    }}
                    className="group relative rounded-xl overflow-hidden aspect-video border border-outline-variant/60 hover:border-primary focus:ring-2 focus:ring-primary text-left cursor-pointer transition-all"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1.5 flex flex-col justify-end">
                      <span className="text-[9px] font-extrabold text-secondary-container leading-tight">
                        {img.category}
                      </span>
                      <span className="text-[8px] text-white font-medium truncate">
                        {img.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="p-3 bg-surface-container-lowest rounded-2xl border border-outline-variant space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-on-surface-variant">
                  Endereço URL da Imagem
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://exemplo.com/imagem-curso.jpg"
                    className="flex-1 px-3 py-2 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleUrlApply}
                    className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Feedback */}
      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-xl border border-red-200">
          <span className="material-symbols-outlined text-[16px]">error</span>
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
