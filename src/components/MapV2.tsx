import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Simple, client-only token storage for demo. For production, store in Supabase Edge Function secrets.
const STORAGE_KEY = 'mapbox_public_token';

const Map: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>('');
  const [editingToken, setEditingToken] = useState<string>('');
  const [ready, setReady] = useState(false);

  // Load token from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(STORAGE_KEY) || '';
    setToken(saved);
    setEditingToken(saved);
  }, []);

  // Initialize map when token available
  useEffect(() => {
    if (!containerRef.current) return;
    if (!token) return;

    try {
      mapboxgl.accessToken = token;
      mapRef.current = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 2.1,
        center: [-95, 38],
        pitch: 40,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');
      mapRef.current.scrollZoom.disable();

      mapRef.current.on('style.load', () => {
        mapRef.current?.setFog({
          color: 'rgb(255,255,255)',
          'high-color': 'rgb(210, 210, 235)',
          'horizon-blend': 0.2,
        } as any);
        setReady(true);
      });
    } catch (e) {
      console.error('[Map] init error', e);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, [token]);

  const saveToken = () => {
    localStorage.setItem(STORAGE_KEY, editingToken.trim());
    setToken(editingToken.trim());
  };

  return (
    <section aria-label="Interactive coverage map" className="relative">
      <div className="relative w-full h-[420px] md:h-[560px] rounded-xl overflow-hidden bg-yrealty-blue/20">
        <div ref={containerRef} className="absolute inset-0" />

        {!token && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white/95 backdrop-blur p-6 shadow-md">
              <h3 className="text-xl font-semibold text-yrealty-navy mb-2">Mapbox token required</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enter your Mapbox public token to enable the interactive map. You can create/find it in your Mapbox dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="pk.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={editingToken}
                  onChange={(e) => setEditingToken(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveToken} variant="default">
                  Save token
                </Button>
              </div>
            </div>
          </div>
        )}

        {token && !ready && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-lg bg-white/90 px-4 py-2 text-sm text-gray-700 shadow">Loading map…</div>
          </div>
        )}

        {/* Decorative gradient overlay for subtle depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Tip: For production, store your Mapbox public token in Supabase Edge Function secrets and load it securely.
      </p>
    </section>
  );
};

export default Map;
