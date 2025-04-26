'use client';

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import PayButton from "./component/PayButton";

const allOptions = [
    {
        label: 'QRIS',
        options: [
            { code: "qris", id: "qris", name: "QRIS", icon: "/qris.png" }
        ],
    },
    {
        label: 'Virtual Account',
        options: [
            { code: "va", id: "bca",    name: "BCA VA",    icon: "https://images.tokopedia.net/img/payment/icons/bca.png"   },
            { code: "va", id: "mandiri",name: "Mandiri VA",icon: "https://images.tokopedia.net/img/payment/icons/mandiri.png" },
            { code: "va", id: "bri",    name: "BRI VA",    icon: "https://images.tokopedia.net/img/payment/icons/briva.png"   },
            { code: "va", id: "bni",    name: "BNI VA",    icon: "https://images.tokopedia.net/img/payment/icons/bni.png"     },
            { code: "va", id: "bsi",    name: "BSI VA",    icon: "https://images.tokopedia.net/img/payment/icons/bsi.png"     },
        ],
    },
];

export default function PaymentUI() {
    const [featureCount, setFeatureCount] = useState(1);
    const [selectedOption, setSelectedOption] = useState<{
        code: string; id: string; name: string; icon: string
    } | null>(null);
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    const pricePerFeature = 1_700_000;
    const totalPrice = featureCount * pricePerFeature;

    const toggleGroup = (label: string) =>
        setOpenGroup(openGroup === label ? null : label);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">

                {/* 1. Input Jumlah Fitur */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Input Jumlah Fitur</h2>
                    <input
                        type="number"
                        min={1}
                        value={featureCount}
                        onChange={e => {
                            const v = parseInt(e.target.value, 10) || 1;
                            setFeatureCount(Math.max(1, v));
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                    />
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg text-gray-900 font-semibold">
                        Total: Rp {totalPrice.toLocaleString("id-ID")}
                    </div>
                </div>

                {/* 2. Accordion Metode Pembayaran */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <h2 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">
                        Pilih Metode Pembayaran
                    </h2>
                    {allOptions.map(group => (
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
                {selectedOption && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <p className="text-gray-900">
                            Metode: <strong>{selectedOption.name}</strong><br/>
                            Tagihan: <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                        </p>
                        <div className="mt-4">
                            <PayButton selectedOption={selectedOption} totalAmount={totalPrice} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}