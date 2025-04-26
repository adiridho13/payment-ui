'use client';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRGenerator({value}: { value: string, size?: number }) {
    return (
        <div>
            <QRCodeCanvas value={value} size={256} />
        </div>
    );
}
