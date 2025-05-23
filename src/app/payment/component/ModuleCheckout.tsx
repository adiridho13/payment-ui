'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
    id: string;
    name: string;
    price: number;
}

interface ModuleData {
    module: string;
    items: Item[];
}

export default function ModuleCheckout(){
    const router = useRouter();
    const [modules, setModules] = useState<ModuleData[]>([]);
    const [selectedItems, setSelectedItems] = useState<Record<string, Item>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/mock/items.json')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then((data) => setModules(data.data))
            .catch((err) => setError(`Gagal memuat fitur: ${err.message}`))
            .finally(() => setLoading(false));
    }, []);

    const toggleItem = (item: Item) => {
        setSelectedItems(prev => {
            const next = { ...prev };
            if (next[item.id]) {
                delete next[item.id];
            } else {
                next[item.id] = item;
            }
            return next;
        });
    };


    const items = Object.values(selectedItems);
    const total = items.reduce((sum, it) => sum + it.price, 0);

    const handleCheckout = () => {
        if (items.length === 0) {
            alert('Pilih setidaknya satu fitur.');
            return;
        }
        // simpan pilihan ke localStorage agar bisa dibaca di PaymentUI
        localStorage.setItem('selectedItems', JSON.stringify(items));
        router.push('/payment');
    };

    if (loading) {
        return <div className="text-center py-10 font-sans">Memuat fitur...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600 font-sans">{error}</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">Pilih Fitur</h1>

            {modules.map((mod) => (
                <section key={mod.module} className="mb-6 bg-white rounded-lg shadow-lg">
                    <h2 className="px-4 py-2 text-xl font-bold text-blue-800 bg-gray-100 border-b">
                        {mod.module}
                    </h2>
                    <ul className="p-4 space-y-3">
                        {mod.items.map((item) => (
                            <li key={item.id} className="flex items-center justify-between">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedItems[item.id]}
                                        onChange={() => toggleItem(item)}
                                        className="h-6 w-6 text-blue-600 focus:ring-2 focus:ring-blue-300"
                                    />
                                    <span className="text-gray-800 text-base font-medium">
                    {item.name}
                  </span>
                                </label>
                                <span className="text-gray-900 font-semibold">
                  Rp {item.price.toLocaleString()}
                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner">
                <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
                    <p className="text-xl font-bold text-gray-900">
                        Total ({items.length}):{' '}
                        <span className="text-blue-700">Rp {total.toLocaleString()}</span>
                    </p>
                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                            items.length > 0
                                ? 'bg-blue-700 hover:bg-blue-800'
                                : 'bg-blue-300 cursor-not-allowed'
                        }`}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </main>
    );
}
