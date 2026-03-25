import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Document {
  id: string;
  name: string;
  type: 'passport' | 'insurance';
  size: number;
  uploadedAt: string;
}

interface DocumentVaultProps {
  documents: Document[];
  onUpload: (file: File, type: 'passport' | 'insurance') => void;
  onRemove: (id: string) => void;
}

export function DocumentVault({ documents, onUpload, onRemove }: DocumentVaultProps) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent, type: 'passport' | 'insurance') => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file, type);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'insurance') => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, type);
    }
  };

  const passportDoc = documents.find((d) => d.type === 'passport');
  const insuranceDoc = documents.find((d) => d.type === 'insurance');

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const UploadZone = ({ type, doc }: { type: 'passport' | 'insurance'; doc?: Document }) => (
    <div
      onDrop={(e) => handleDrop(e, type)}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(type);
      }}
      onDragLeave={() => setDragOver(null)}
      className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
        dragOver === type
          ? 'border-cyan-400 bg-cyan-400/10'
          : doc
          ? 'border-emerald-400 bg-emerald-400/10'
          : 'border-white/30 bg-white/5 hover:border-white/50'
      }`}
    >
      {doc ? (
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-white truncate">{doc.name}</p>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
              <p className="text-xs text-white/60">{formatFileSize(doc.size)}</p>
            </div>
          </div>
          <button
            onClick={() => onRemove(doc.id)}
            className="p-1 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileInput(e, type)}
          />
          <div className="flex flex-col items-center text-center py-2">
            <Upload className="w-8 h-8 text-white/60 mb-2" />
            <p className="text-sm font-medium text-white mb-1">
              {type === 'passport' ? 'Upload Passport' : 'Upload Insurance'}
            </p>
            <p className="text-xs text-white/50">PDF only, max 5MB</p>
          </div>
        </label>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4">Document Vault</h3>
      <UploadZone type="passport" doc={passportDoc} />
      <UploadZone type="insurance" doc={insuranceDoc} />
      <p className="text-xs text-white/50 text-center mt-4">
        Documents are stored locally and synced to your account
      </p>
    </div>
  );
}
