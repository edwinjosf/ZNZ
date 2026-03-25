import { X, Phone, AlertCircle, Building2, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type EmergencyContact } from '../lib/supabase';

interface EmergencyHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyHelp({ isOpen, onClose }: EmergencyHelpProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadContacts();
    }
  }, [isOpen]);

  const loadContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('is_active', true)
        .order('category');

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error loading emergency contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'police':
        return <AlertCircle className="w-5 h-5" />;
      case 'hospital':
        return <Hospital className="w-5 h-5" />;
      case 'embassy':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Phone className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'police':
        return 'from-blue-500 to-blue-600';
      case 'hospital':
        return 'from-red-500 to-red-600';
      case 'embassy':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.category]) {
      acc[contact.category] = [];
    }
    acc[contact.category].push(contact);
    return acc;
  }, {} as Record<string, EmergencyContact[]>);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-red-500/30">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Emergency Contacts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedContacts).map(([category, categoryContacts]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-white mb-3 capitalize flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{contact.name}</h4>
                            {contact.description && (
                              <p className="text-sm text-white/60">{contact.description}</p>
                            )}
                          </div>
                        </div>
                        <a
                          href={`tel:${contact.phone_number}`}
                          className={`w-full bg-gradient-to-r ${getCategoryColor(
                            contact.category
                          )} text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all mt-3`}
                        >
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone_number}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
