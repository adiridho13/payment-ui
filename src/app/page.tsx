"use client"
import api from "@/app/lib/api";
import {useState} from "react";
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import axios, {AxiosError, AxiosResponse} from "axios";

export default function Home() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post('/auth/login', {
                username,
                password
            },{
                withCredentials: true
            })

            // Cek status HTTP, axios tidak punya `res.ok`
            if (res.status == 200) {
                setIsAuthenticated(true)
                alert('login')
                router.push('/payment')
            } else {
                alert(res.data.message || 'Login gagal')
            }
        } catch (err) {
            // Tangani error axios
            if (err instanceof AxiosError) {
                alert(err.response?.data?.message || 'Login gagal')
            } else {
                alert('Login gagal: ' + (err as Error).message)
            }
        }
    }

    // jika belum login → tampil form
    if (!isAuthenticated) {
        return (
            <main className="p-6 max-w-sm mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Masuk
                    </button>
                </form>
            </main>
        )
    }

    // jika sudah login → tampil link ke payment
    return (
        <main className="p-6">
            <h1 className="text-xl font-bold">Selamat Datang, {username}!</h1>
            <Link
                href="/payment"
                className="text-blue-600 underline block mt-4">
                Pergi ke halaman pembayaran
            </Link>
        </main>
    )
}
