'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import PayButton from './component/PayButton';

interface Item {
    id: string;
    name: string;
    price: number;
}

const paymentGroups = [
    {
        label: 'QRIS',
        options: [
            { code: 'qris', id: 'qris', name: 'QRIS', icon: '/qris.png' }
        ],
    },
    {
        label: 'Virtual Account',
        options: [
            { code: 'va', id: 'bca',    name: 'BCA',    icon: 'https://images.tokopedia.net/img/payment/icons/bca.png' },
            { code: 'va', id: 'mandiri',name: 'Mandiri',icon: 'https://images.tokopedia.net/img/payment/icons/mandiri.png' },
            { code: 'va', id: 'bri',    name: 'BRI',    icon: 'https://images.tokopedia.net/img/payment/icons/briva.png' },
            { code: 'va', id: 'bni',    name: 'BNI',    icon: 'https://images.tokopedia.net/img/payment/icons/bni.png' },
            { code: 'va', id: 'bsi',    name: 'BSI',    icon: 'https://images.tokopedia.net/img/payment/icons/bsi.png' },
        ],
    },
];

export default function PaymentUI() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedOption, setSelectedOption] = useState<{
        code: string; id: string; name: string; icon: string;
    } | null>(null);
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // load selected items from ModuleCheckout
    useEffect(() => {
        const raw = localStorage.getItem('selectedItems') || '[]';
        try {
            setItems(JSON.parse(raw));
        } catch {
            setItems([]);
        }
    }, []);

    const totalPrice = items.reduce((sum, it) => sum + it.price, 0);
    const isPayDisabled = items.length === 0 || !selectedOption;

    const toggleGroup = (label: string) =>
        setOpenGroup(openGroup === label ? null : label);

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
            <div className="w-full max-w-md space-y-8">

                {/* 1. Daftar Fitur yang Dipilih */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Fitur</h2>
                    {items.length === 0 ? (
                        <p className="text-gray-600">Belum ada fitur terpilih.</p>
                    ) : (
                        <ul className="space-y-2">
                            {items.map((it) => (
                                <li key={it.id} className="flex justify-between">
                                    <span className="text-gray-800">{it.name}</span>
                                    <span className="text-gray-900 font-semibold">
                    Rp {it.price.toLocaleString('id-ID')}
                  </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg text-gray-900 font-semibold">
                        Total Tagihan: Rp {totalPrice.toLocaleString('id-ID')}
                    </div>
                </div>

                {/* 2. Accordion Metode Pembayaran */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">
                        Pilih Metode Pembayaran
                    </h2>
                    {paymentGroups.map(group => (
                        <div key={group.label} className="border-b border-gray-200 last:border-0">
                            <button
                                onClick={() => toggleGroup(group.label)}
                                className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
                            >
                                <span className="font-medium text-gray-900">{group.label}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                        openGroup === group.label ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openGroup === group.label && (
                                <div className="bg-white p-4 space-y-3">
                                    {group.options.map(opt => (
                                        <label
                                            key={opt.id}
                                            className={`flex items-center gap-4 border border-gray-300 rounded-lg p-3 cursor-pointer transition
                        ${selectedOption?.id === opt.id
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'hover:border-gray-400'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="accent-blue-600"
                                                disabled={isProcessing}
                                                checked={selectedOption?.id === opt.id}
                                                onChange={() => setSelectedOption(opt)}
                                            />
                                            <Image src={opt.icon} alt={opt.name} width={28} height={28} />
                                            <span className="font-medium text-gray-900">{opt.name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 3. Ringkasan & PayButton */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <p className="text-gray-900 mb-2">
                        Metode: <strong>{selectedOption?.name || '-'}</strong>
                    </p>
                    <p className="text-gray-900 mb-4">
                        Tagihan: <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
                    </p>
                    <PayButton
                        selectedOption={selectedOption!}
                        totalAmount={totalPrice}
                        disabled={isPayDisabled}
                        onStart={setIsProcessing}
                    />
                </div>

            </div>
        </div>
    );
}
