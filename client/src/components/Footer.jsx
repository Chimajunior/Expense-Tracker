export default function Footer() {
    return (
      <footer className="border-t border-brand-gray py-4 text-sm text-slate-600 mt-auto bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="order-2 sm:order-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="order-1 sm:order-2">
            Designed & Developed by{" "}
            <span className="text-brand-red font-semibold">ChimTech</span>
          </p>
        </div>
      </footer>
    );
  }
  