import { Car, Star, MessageCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type VerifiedDriver } from '../lib/supabase';

export function TaxiNetwork() {
  const [drivers, setDrivers] = useState<VerifiedDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('verified_drivers')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error loading drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (number: string, driverName: string) => {
    const message = encodeURIComponent(
      `Hello ${driverName}, I need a ride from Zanzibar Airport. Are you available?`
    );
    window.open(`https://wa.me/${number.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Verified Drivers</h3>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
          <Star className="w-3 h-3 fill-current" />
          <span>Pre-vetted</span>
        </div>
      </div>
      <div className="space-y-3">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-cyan-400/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{driver.name}</h4>
                <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                  <Car className="w-4 h-4" />
                  <span>{driver.vehicle_type}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{driver.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/60">
                    <Users className="w-4 h-4" />
                    <span>{driver.total_trips} trips</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-cyan-300 mb-1">{driver.price_range}</div>
              </div>
            </div>
            <button
              onClick={() => handleWhatsApp(driver.whatsapp_number, driver.name)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Call on WhatsApp</span>
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/50 text-center mt-4">
        All drivers are background-checked and rated by travelers
      </p>
    </div>
  );
}
