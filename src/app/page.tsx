import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-wider mb-2">
        FNG <span className="text-amber-400">BEAUTY</span>
      </h1>
      <p className="text-slate-400 max-w-md mb-8">
        Plateforme officielle de vente et de gestion — FNG Holdings.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/admin/dashboard" 
          className="bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-amber-300 transition"
        >
          Accéder au Dashboard Admin
        </Link>
      </div>
    </main>
  );
}
