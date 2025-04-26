'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaymentInfo } from '@/app/payment/types/PaymentInfo';
import { formatCurrency } from '@/app/payment/utils/CurrencyFormat';
import { formatCountdown } from '@/app/payment/utils/ConvertTime';
import { Loader } from 'lucide-react';
import QRGenerator from "@/app/payment/component/QrGenerator";

interface PayButtonProps {
    selectedOption: { code: string; id: string };
    totalAmount: number;
}

export default function PayButton({ selectedOption, totalAmount }: PayButtonProps) {
    const [loading, setLoading] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isPaid, setIsPaid] = useState(false);

    const handlePay = async () => {
        if (!selectedOption) {
            alert('Pilih metode pembayaran terlebih dahulu.');
            return;
        }
        setLoading(true);
        try {
            const referenceId = `ORDER-${Date.now()}`;
            const { data } = await axios.post('http://localhost:3000/payment/pay', {
                name: 'Adi Ridho',
                phone: '08123456789',
                email: 'adi@example.com',
                amount: totalAmount,
                comments: 'test payment',
                paymentMethod: selectedOption.code,
                paymentChannel: selectedOption.id,
                notifyUrl: 'http://localhost:3000/payment/callback-url',
                referenceId,
            });
            setPaymentInfo(data.Data);
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat pembayaran.');
        } finally {
            setLoading(false);
        }
    };

    // Countdown
    useEffect(() => {
        if (!paymentInfo?.Expired) return;
        const expireTs = new Date(paymentInfo.Expired).getTime();
        const iv = setInterval(() => {
            const diff = expireTs - Date.now();
            if (diff <= 0) {
                setTimeLeft('00:00:00');
                clearInterval(iv);
            } else {
                setTimeLeft(formatCountdown(diff));
            }
        }, 1000);
        return () => clearInterval(iv);
    }, [paymentInfo]);

    // Poll status
    useEffect(() => {
        if (!paymentInfo?.ReferenceId) return;
        const iv = setInterval(async () => {
            try {
                const r = await axios.get(
                    `http://localhost:3000/payment/status?referenceId=${paymentInfo.ReferenceId}`
                );
                if (r.data?.paid) {
                    setIsPaid(true);
                    clearInterval(iv);
                }
            } catch (e) {
                console.error('Polling error:', e);
            }
        }, 5000);
        return () => clearInterval(iv);
    }, [paymentInfo]);

    return (
        <div className="space-y-4">
            {/* ===== PAY / BACK BUTTON ===== */}
            {!paymentInfo ? (
                <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700
                     text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading && <Loader className="w-5 h-5 animate-spin" />}
                    {loading ? 'Memproses...' : 'Bayar Sekarang'}
                </button>
            ) : (
                <button
                    onClick={() => setPaymentInfo(null)}
                    className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
                >
                    Kembali
                </button>
            )}

            {/* ===== PAYMENT INSTRUCTIONS ===== */}
            {paymentInfo && (
                <div className="p-4 border rounded-xl bg-gray-50 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Instruksi Pembayaran</h2>

                    {selectedOption.code === 'va' && (
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Bank:</strong> {paymentInfo.Channel}</p>
                            <p><strong>Nomor VA:</strong> <code>{paymentInfo.PaymentNo}</code></p>
                            <p><strong>Total:</strong> {formatCurrency(paymentInfo.Total)}</p>
                            <p><strong>Biaya:</strong> {formatCurrency(paymentInfo.Fee)}</p>
                            <p><strong>Kedaluwarsa:</strong> {paymentInfo.Expired}</p>
                            <p><strong>Sisa Waktu:</strong> {timeLeft}</p>
                        </div>
                    )}

                    {selectedOption.code === 'qris' && (
                        <div className="flex flex-col items-center space-y-3">
                            <QRGenerator value={paymentInfo.QrString} />
                            <p className="text-sm text-gray-600">
                                Sisa waktu pembayaran: <strong>{timeLeft}</strong>
                            </p>
                        </div>
                    )}

                    {isPaid && (
                        <div className="mt-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md text-sm text-center">
                            🎉 Pembayaran berhasil diterima!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
