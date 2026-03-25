import { ExternalLink, Plane, Shield, FileText } from 'lucide-react';

const links = [
  {
    id: 'visa',
    label: 'Official e-Visa',
    url: 'https://eservices.immigration.go.tz/visa/',
    icon: <Plane className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'health',
    label: 'Health Requirements',
    url: 'https://www.who.int/countries/tza/',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'insurance',
    label: 'Travel Insurance',
    url: 'https://www.worldnomads.com/',
    icon: <FileText className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600',
  },
];

export function QuickLinks() {
  return (
    <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md border-t border-white/10 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-semibold text-white/80 mb-4 text-center">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-r ${link.color} hover:shadow-lg hover:scale-105 transition-all rounded-lg p-4 flex items-center justify-between group`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">{link.icon}</div>
                <span className="font-medium text-white">{link.label}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
