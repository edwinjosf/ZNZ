import { Hotel, Shield, ExternalLink } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Hotel className="w-6 h-6 text-amber-400" />
          <h3 className="font-semibold text-white">Featured Hotels</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer">
            <h4 className="font-medium text-white mb-1">Park Hyatt Zanzibar</h4>
            <p className="text-xs text-white/70 mb-2">Stone Town Waterfront</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-300">From $280/night</span>
              <ExternalLink className="w-4 h-4 text-white/60" />
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer">
            <h4 className="font-medium text-white mb-1">Zuri Zanzibar</h4>
            <p className="text-xs text-white/70 mb-2">Kendwa Beach Resort</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-300">From $350/night</span>
              <ExternalLink className="w-4 h-4 text-white/60" />
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-all cursor-pointer">
            <h4 className="font-medium text-white mb-1">Emerson Spice</h4>
            <p className="text-xs text-white/70 mb-2">Historic Stone Town</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-300">From $150/night</span>
              <ExternalLink className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="font-semibold text-white">Travel Insurance</h3>
        </div>
        <p className="text-sm text-white/80 mb-4">
          Protect your trip with comprehensive coverage from $5/day
        </p>
        <ul className="space-y-2 mb-4 text-sm text-white/70">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            Medical emergencies
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            Trip cancellation
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            Lost luggage
          </li>
        </ul>
        <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg">
          <span>Get Quote</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
