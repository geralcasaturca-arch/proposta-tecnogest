import React, { useState, useRef } from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  file?: File;
}

interface DocumentUploadProps {
  files: UploadedDocument[];
  onFilesChange: (files: UploadedDocument[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  label?: string;
  description?: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 4,
  maxSizeMB = 5,
  label = 'Documentos de Identificação e Habilitações',
  description = 'Anexe a cópia do Bilhete de Identidade (BI), Certificado ou Fotos (PDF, PNG ou JPG até 5MB)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    setErrorMessage(null);
    let errorMsg: string | null = null;
    const newItems: UploadedDocument[] = [];

    const promises = Array.from(fileList).map(async (file) => {
      // Allow capturing exactly enough files to reach maxFiles
      if (files.length + newItems.length >= maxFiles) {
        if (!errorMsg) errorMsg = `Limite máximo de ${maxFiles} ficheiros atingido.`;
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        if (!errorMsg) errorMsg = `O ficheiro "${file.name}" excede o tamanho máximo de ${maxSizeMB}MB.`;
        return;
      }

      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');

      if (!isImage && !isPdf) {
        if (!errorMsg) errorMsg = `O formato do ficheiro "${file.name}" não é suportado. Use PDF, JPG ou PNG.`;
        return;
      }

      const docItem: UploadedDocument = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      };

      if (isImage) {
        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            docItem.previewUrl = e.target?.result as string;
            newItems.push(docItem);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      } else {
        newItems.push(docItem);
      }
    });

    await Promise.all(promises);

    if (errorMsg) {
      setErrorMessage(errorMsg);
    }

    if (newItems.length > 0) {
      onFilesChange([...files, ...newItems].slice(0, maxFiles));
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
        onChange={(e) => {
          if (e.target.files) {
            processFiles(e.target.files);
          }
        }}
        className="hidden"
      />

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? 'border-primary bg-primary/10 scale-[0.99]'
            : 'border-outline-variant hover:border-primary/70 bg-surface-container-low/40 hover:bg-surface-container-low'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-secondary-container/60 text-primary flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[32px]">
            {isDragging ? 'download_done' : 'cloud_upload'}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-primary">
            {isDragging ? 'Solte os ficheiros aqui' : 'Arraste os documentos ou clique para navegar'}
          </p>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-1 bg-primary hover:bg-primary-container text-on-primary text-xs font-bold px-4 py-2 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
          <span>Escolher Ficheiros ({files.length}/{maxFiles})</span>
        </button>
      </div>

      {/* Error Notification */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Documents List */}
      {files.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-on-surface">
              Documentos Anexados ({files.length}):
            </span>
            <button
              type="button"
              onClick={() => onFilesChange([])}
              className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
            >
              Limpar todos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {files.map((file) => {
              const isImage = file.type.startsWith('image/') || file.previewUrl;
              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2.5 bg-surface-container rounded-xl border border-outline-variant/60 shadow-2xs gap-2 overflow-hidden"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Thumbnail or PDF icon */}
                    {isImage && file.previewUrl ? (
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-outline-variant/40"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-primary truncate leading-tight">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(file.id)}
                    className="p-1.5 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Remover ficheiro"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
