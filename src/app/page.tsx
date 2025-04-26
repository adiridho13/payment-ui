import Link from "next/link";

export default function Home() {
    return (
        <main className="p-6">
            <h1 className="text-xl font-bold">Selamat Datang</h1>
            <Link href="/payment" className="text-blue-600 underline block mt-4">
                Pergi ke halaman pembayaran
            </Link>
        </main>
    );
}
