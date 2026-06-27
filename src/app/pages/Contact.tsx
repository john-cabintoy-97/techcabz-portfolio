
// components/Contact.tsx
import { CONTACT_INFO } from '@/app/constants/contact';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="section-label">Contact</p>
          <h2 id="contact-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Let&apos;s build something together
          </h2>
          <p className="text-muted-foreground text-lg">
            I&apos;m currently open to freelance projects and full-time opportunities.
          </p>
          
          <div className="flex flex-col items-center gap-4 pt-4">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center gap-2 text-xl font-medium text-foreground hover:text-[#F97316] transition-colors"
              aria-label={`Email me at ${CONTACT_INFO.email}`}
            >
              {CONTACT_INFO.email}
            </a>
            
          <CopyEmailButton email={CONTACT_INFO.email} />
          </div>
        </div>
      </div>
    </section>
  );
}