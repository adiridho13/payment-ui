'use client';

import { useRouter } from 'next/navigation';
import {useFormStore} from "@/app/payment/stores/userFormStore";

export default function PaymentForm() {
    const router = useRouter();
    const { username, email, phone, notes, setFormData } = useFormStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            username,
            email,
            phone,
            notes,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // You can log or validate here
        console.log('Form data:', { username, email, phone, notes });

        // ✅ Navigate to module-checkout
        router.push('/payment/component/module-checkout');
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Payment Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
                <div>
                    <label className="block font-semibold">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Notes</label>
                    <textarea
                        name="notes"
                        value={notes}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-bold"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
