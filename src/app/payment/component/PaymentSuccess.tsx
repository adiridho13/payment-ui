'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import api from '@/app/lib/api';
import {formatLocal} from "@/app/payment/utils/FormatLocal";

interface SuccessProps {
    referenceId: string;
    methodName: string;
    amount: number;
    onBackHome?: () => void;
    onViewInvoice?: () => void;
}

export function PaymentSuccess({
                                   referenceId,
                                   methodName,
                                   amount,
                                   onBackHome,
                                   onViewInvoice,
                               }: SuccessProps) {
    const [paidDate, setPaidDate] = useState<string>('');
    const [loading, setLoading]   = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        let cancelled = false;
        api.get(`${API_URL}/payment/status?referenceId=${referenceId}`)
            .then(r => {
                if (cancelled) return;
                if (r.data.paid && typeof r.data.paymentDate === 'string') {
                    setPaidDate(formatLocal(r.data.paymentDate));
                    console.log('date' + formatLocal(r.data.paymentDate));
                }
            })
            .catch(err => console.error('Failed to fetch status:', err))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [referenceId]);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto text-center">
                <p>Memuat informasi pembayaran…</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-6 max-w-md mx-auto">
            <div className="flex flex-col items-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h2 className="text-2xl font-semibold text-green-700">
                    Pembayaran Berhasil!
                </h2>
            </div>

            <div className="space-y-2 text-gray-800">
                <p><span className="font-medium">Reference ID:</span> {referenceId}</p>
                <p><span className="font-medium">Metode:</span> {methodName?.toUpperCase()}</p>
                <p>
                    <span className="font-medium">Jumlah:</span> Rp{' '}
                    {amount.toLocaleString('id-ID')}
                </p>
                <p>
                    <span className="font-medium">Tanggal:</span> {paidDate}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                {/*<button*/}
                {/*    onClick={() => onViewInvoice?.()}*/}
                {/*    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"*/}
                {/*>*/}
                {/*    Lihat Invoice*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        // now allowed because of allow-top-navigation*/}
                {/*        // window.top.location.href = 'http://localhost/facport';*/}
                {/*    }}*/}
                {/*    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"*/}
                {/*>*/}
                {/*    Kembali ke Beranda*/}
                {/*</button>*/}
            </div>
        </div>
    );
}
