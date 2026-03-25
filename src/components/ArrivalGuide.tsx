import { Plane, FileCheck, Luggage, DoorOpen } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tip: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Immigration',
    description: 'Present passport and arrival card',
    icon: <Plane className="w-6 h-6" />,
    tip: 'Have your return ticket ready to show',
  },
  {
    id: 2,
    title: 'Visa Desk',
    description: 'Pay $50 USD for visa on arrival if needed',
    icon: <FileCheck className="w-6 h-6" />,
    tip: 'Cash or card accepted. e-Visa holders skip this',
  },
  {
    id: 3,
    title: 'Luggage Claim',
    description: 'Collect your checked baggage',
    icon: <Luggage className="w-6 h-6" />,
    tip: 'Carousel numbers displayed on screens',
  },
  {
    id: 4,
    title: 'Exit & Transport',
    description: 'Head to taxi stand or arrange pickup',
    icon: <DoorOpen className="w-6 h-6" />,
    tip: 'Official taxi counter is to your right after exit',
  },
];

export function ArrivalGuide() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Airport Navigation</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-gradient-to-b from-cyan-400 to-blue-500 mt-2" />
              )}
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                <span className="text-xs font-medium text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded-full">
                  Step {step.id}
                </span>
              </div>
              <p className="text-white/80 mb-2">{step.description}</p>
              <div className="text-sm text-cyan-200 bg-cyan-900/20 px-3 py-2 rounded-lg">
                💡 {step.tip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
