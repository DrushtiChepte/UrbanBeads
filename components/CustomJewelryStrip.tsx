import Link from "next/link";

export default function CustomJewelryStrip() {
  return (
    <section className="mt-10 overflow-hidden rounded-[2rem] border border-brown/10 bg-linear-to-r from-[#efe2d3] via-[#f6ecdf] to-[#e8d8c4] px-6 py-5 text-brown shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-brown/60  font-secondary">
            Custom orders
          </p>
          <h2 className="mt-2 font-primary text-2xl md:text-3xl font-semibold">
            Customized jewelry available
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-brown/75">
            Want a personalized bracelet, phone charm, or gift set? We create
            pieces in your colors, style, and vibe.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white transition hover:bg-brown/90"
        >
          Request a custom piece
        </Link>
      </div>
    </section>
  );
}
