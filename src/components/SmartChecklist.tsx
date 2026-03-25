import { CheckCircle2, Circle, FileText, Shield, Plane } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  icon: React.ReactNode;
  description: string;
}

interface SmartChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}

export function SmartChecklist({ items, onToggle }: SmartChecklistProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onToggle(item.id)}
          className={`w-full p-4 rounded-xl transition-all ${
            item.completed
              ? 'bg-emerald-500/20 border-2 border-emerald-400'
              : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <Circle className="w-6 h-6 text-white/60" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/80">{item.icon}</span>
                <h3 className="font-semibold text-white">{item.label}</h3>
              </div>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function getChecklistItems(
  visaCompleted: boolean,
  yellowFeverCompleted: boolean,
  insuranceCompleted: boolean
): ChecklistItem[] {
  return [
    {
      id: 'visa',
      label: 'Visa Approved',
      completed: visaCompleted,
      icon: <Plane className="w-5 h-5" />,
      description: 'e-Visa or visa on arrival confirmation',
    },
    {
      id: 'yellowFever',
      label: 'Yellow Fever Certificate',
      completed: yellowFeverCompleted,
      icon: <Shield className="w-5 h-5" />,
      description: 'Required if arriving from endemic countries',
    },
    {
      id: 'insurance',
      label: 'Travel Insurance',
      completed: insuranceCompleted,
      icon: <FileText className="w-5 h-5" />,
      description: 'Valid coverage for your entire stay',
    },
  ];
}
