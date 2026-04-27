'use client'

interface NewsletterFormProps {
  id?: string
  dark?: boolean
}

export default function NewsletterForm({ id = 'newsletter-email', dark = false }: NewsletterFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label="Newsletter signup"
    >
      <label htmlFor={id} className="sr-only">Email address</label>
      <input
        id={id}
        type="email"
        placeholder="Your email address"
        required
        className={`flex-1 px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
          dark
            ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-brand-blue/50'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-brand-blue/30 focus:border-brand-blue'
        }`}
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
