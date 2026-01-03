export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-10 mt-20 flex items-center justify-center fade-up">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur rounded-2xl p-8 shadow-sm">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-[#5E4C3A] text-center mb-2">
          Get in Touch 🤍
        </h1>
        <div className="">
          <p className="text-center text-[#7A6755]">
            For orders & quick replies, DM us on Instagram.
          </p>
          <p className="text-center text-[#7A6755] mb-10">
            Visit our Instagram profile and tap Message.
          </p>
        </div>

        {/* Instagram CTA */}
        <a
          href="https://instagram.com/urbanbeads"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full mb-10 
             rounded-full bg-[#7A6755] text-white py-3 
             hover:bg-[#5E4C3A] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.75 2h8.5C19.99 2 22 4.01 22 6.25v11.5C22 19.99 19.99 22 17.75 22h-11.5C4.01 22 2 19.99 2 17.75v-11.5C2 4.01 4.01 2 6.25 2h1.5zm4.25 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.25a2.75 2.75 0 110-5.5 2.75 2.75 0 010 5.5zm4.88-7.63a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0z" />
          </svg>

          <span className="font-medium">Message us on Instagram</span>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-[#7A6755]/40" />
          <span className="text-[#7A6755] text-sm">or</span>
          <div className="flex-1 h-px bg-[#7A6755]/40" />
        </div>

        <p className="text-center text-[#7A6755] mb-5">
          For other queries, email us below.
        </p>

        {/* Contact Form */}
        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-full px-5 py-3 border border-[#7A6755] bg-transparent outline-none"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="w-full rounded-full px-5 py-3 border border-[#7A6755] bg-transparent outline-none"
          />

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Your message"
            className="w-full rounded-2xl px-5 py-3 border border-[#7A6755] bg-transparent outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#7A6755] text-white py-3 hover:bg-[#5E4C3A] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
