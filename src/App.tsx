import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ReadinessScore } from './components/ReadinessScore';
import { SmartChecklist, getChecklistItems } from './components/SmartChecklist';
import { ArrivalGuide } from './components/ArrivalGuide';
import { DocumentVault } from './components/DocumentVault';
import { TaxiNetwork } from './components/TaxiNetwork';
import { EmergencyHelp } from './components/EmergencyHelp';
import { QuickLinks } from './components/QuickLinks';
import { Sidebar } from './components/Sidebar';
import { useLocalStorage } from './hooks/useLocalStorage';

interface ChecklistState {
  visa: boolean;
  yellowFever: boolean;
  insurance: boolean;
}

interface DocumentItem {
  id: string;
  name: string;
  type: 'passport' | 'insurance';
  size: number;
  uploadedAt: string;
}

function App() {
  const [checklist, setChecklist] = useLocalStorage<ChecklistState>('zanzibar-checklist', {
    visa: false,
    yellowFever: false,
    insurance: false,
  });

  const [documents, setDocuments] = useLocalStorage<DocumentItem[]>('zanzibar-documents', []);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    const completed = [checklist.visa, checklist.yellowFever, checklist.insurance].filter(
      Boolean
    ).length;
    const score = Math.round((completed / 3) * 100);
    setReadinessScore(score);
  }, [checklist]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id as keyof ChecklistState],
    }));
  };

  const handleDocumentUpload = (file: File, type: 'passport' | 'insurance') => {
    const existingDoc = documents.find((d) => d.type === type);
    if (existingDoc) {
      setDocuments((prev) => prev.filter((d) => d.id !== existingDoc.id));
    }

    const newDoc: DocumentItem = {
      id: crypto.randomUUID(),
      name: file.name,
      type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    setDocuments((prev) => [...prev, newDoc]);
  };

  const handleDocumentRemove = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const checklistItems = getChecklistItems(
    checklist.visa,
    checklist.yellowFever,
    checklist.insurance
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10">
        <header className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Zanzibar Travel OS</h1>
                <p className="text-sm text-white/70">Your complete arrival companion</p>
              </div>
              <button
                onClick={() => setEmergencyOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all animate-pulse"
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="hidden sm:inline">Emergency Help</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Arrival Readiness</h2>
                  <div className="mb-6 flex justify-center md:sticky md:top-24">
                    <ReadinessScore score={readinessScore} />
                  </div>
                  <SmartChecklist items={checklistItems} onToggle={toggleChecklistItem} />
                  <div className="mt-6">
                    <DocumentVault
                      documents={documents}
                      onUpload={handleDocumentUpload}
                      onRemove={handleDocumentRemove}
                    />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                  <ArrivalGuide />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <TaxiNetwork />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>
          </div>
        </main>

        <QuickLinks />
      </div>

      <EmergencyHelp isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </div>
  );
}

export default App;
