export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 md:flex-row">
        <p>© {new Date().getFullYear()} MERNStore. All rights reserved.</p>
        <p className="text-xs text-gray-400">
          Built with React, Vite, Tailwind, MongoDB, Stripe & Cloudinary.
        </p>
      </div>
    </footer>
  );
}