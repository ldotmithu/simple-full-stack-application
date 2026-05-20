'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [form, setForm] = useState({ make: '', model: '', year: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const res = await fetch('http://localhost:3001/vehicles');
    const data = await res.json();
    setVehicles(data);
  };

  async function addVehicle(e: React.FormEvent) {
    e.preventDefault();

    await fetch('http://localhost:3001/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ make: form.make, model: form.model, year: Number(form.year) }),
    });

    setForm({ make: '', model: '', year: '' });
    fetchVehicles();
  }

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Vehicle Log</h1>

          <form onSubmit={addVehicle} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              placeholder="Make"
              value={form.make}
              onChange={(e) => setForm({ ...form, make: (e.target as HTMLInputElement).value })}
              className="col-span-1 md:col-span-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: (e.target as HTMLInputElement).value })}
              className="col-span-1 md:col-span-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: (e.target as HTMLInputElement).value })}
              className="col-span-1 md:col-span-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              className="md:col-span-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Add Vehicle
            </button>
          </form>

          <div>
            {vehicles.length === 0 ? (
              <p className="text-gray-600">No vehicles yet. Add one above.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicles.map((v: any) => (
                  <div key={v.id} className="p-3 border rounded-md bg-white shadow-sm">
                    <div className="text-lg font-medium">{v.make} {v.model}</div>
                    <div className="text-sm text-gray-600">Year: {v.year}</div>
                    {v.created_at && (
                      <div className="text-xs text-gray-400">Added: {new Date(v.created_at).toLocaleDateString()}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}