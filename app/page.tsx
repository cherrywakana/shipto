'use client'

import Header from '@/components/Header'

/* ---------------------------------------------------------- */
/*  Static data                                                */
/* ---------------------------------------------------------- */

const features = [
  {
    number: '01',
    title: 'Zero Friction',
    body: 'From first click to final output — every interaction is stripped to its essential form. Nothing decorative. Nothing wasted.',
  },
  {
    number: '02',
    title: 'Built to Last',
    body: "Engineered on a foundation that scales with you. Whether you're a solo creator or an enterprise team, the core never bends.",
  },
  {
    number: '03',
    title: 'Radically Honest',
    body: "No dark patterns. No engagement tricks. Forma does exactly what it says and tells you when it doesn't.",
  },
  {
    number: '04',
    title: 'Open by Default',
    body: "Your data, your exports, your integrations. We don't build walls — we build bridges to the tools you already love.",
  },
]

const plans = [
  {
    name: 'Free',
    price: '¥0',
    period: '/ month',
    description: 'For individuals exploring the product.',
    perks: ['Up to 3 projects', 'Core features', 'Community support'],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '¥2,980',
    period: '/ month',
    description: 'For makers who ship.',
    perks: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'API access'],
    cta: 'Get Pro',
    highlight: true,
  },
  {
    name: 'Team',
    price: '¥9,800',
    period: '/ month',
    description: 'For teams that move fast.',
    perks: ['Everything in Pro', 'Collaboration tools', 'SSO / SAML', 'SLA guarantee'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

/* ---------------------------------------------------------- */
/*  Page                                                       */
/* ---------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ---- Hero ---- */}
        <section
          id="product"
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(7rem, 15vw, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative line */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: '40vw',
              height: '1px',
              backgroundColor: 'var(--gray-100)',
              transformOrigin: 'right',
              animation: 'drawLine 1.2s var(--ease-out) 0.4s both',
            }}
          />

          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gray-500)',
              marginBottom: '1.5rem',
            }}
          >
            Introducing Forma 2.0
          </p>

          <h1
            className="fade-up fade-up-delay-1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: 'var(--black)',
              maxWidth: '14ch',
              marginBottom: '2rem',
            }}
          >
            Design is{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gray-500)' }}>
              the product.
            </em>
          </h1>

          <p
            className="fade-up fade-up-delay-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              fontWeight: 300,
              color: 'var(--gray-700)',
              maxWidth: '44ch',
              lineHeight: 1.75,
              marginBottom: '3rem',
            }}
          >
            Forma strips away the noise so your ideas can breathe.
            A minimal tool for people who take craft seriously.
          </p>

          <div
            className="fade-up fade-up-delay-3"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="#pricing"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--white)',
                backgroundColor: 'var(--black)',
                padding: '0.9rem 2rem',
                border: '1px solid var(--black)',
                display: 'inline-block',
                transition: 'background-color 0.25s, color 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'var(--white)'
                el.style.color = 'var(--black)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'var(--black)'
                el.style.color = 'var(--white)'
              }}
            >
              Start free
            </a>
            <a
              href="#features"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--black)',
                padding: '0.9rem 2rem',
                border: '1px solid var(--gray-300)',
                display: 'inline-block',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--black)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-300)'
              }}
            >
              Learn more ↓
            </a>
          </div>

          {/* Floating badge */}
          <div
            className="fade-up fade-up-delay-4"
            style={{
              position: 'absolute',
              bottom: 'clamp(2rem, 5vw, 4rem)',
              right: 'clamp(1.5rem, 5vw, 4rem)',
              textAlign: 'right',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gray-500)',
              }}
            >
              Trusted by
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                lineHeight: 1,
                color: 'var(--black)',
              }}
            >
              12,000+
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gray-500)',
              }}
            >
              creators worldwide
            </p>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--gray-100)' }} />

        {/* ---- Features ---- */}
        <section
          id="features"
          style={{
            padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--black)',
              }}
            >
              What makes<br />Forma different.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: 'var(--gray-500)',
                maxWidth: '36ch',
                lineHeight: 1.75,
                paddingTop: '0.5rem',
              }}
            >
              Four principles that guide every decision we make —
              from interaction design to backend architecture.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              borderTop: '1px solid var(--gray-100)',
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.number}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  borderRight: '1px solid var(--gray-100)',
                  borderBottom: '1px solid var(--gray-100)',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gray-100)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gray-300)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {f.number}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    letterSpacing: '-0.02em',
                    color: 'var(--black)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--gray-700)',
                    lineHeight: 1.75,
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--gray-100)' }} />

        {/* ---- Marquee strip ---- */}
        <div
          style={{
            overflow: 'hidden',
            borderBottom: '1px solid var(--gray-100)',
            padding: '1rem 0',
            backgroundColor: 'var(--black)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '4rem',
              animation: 'marquee 20s linear infinite',
              whiteSpace: 'nowrap',
              width: 'max-content',
            }}
          >
            {Array(8).fill(['Clarity', 'Simplicity', 'Honesty', 'Craft']).flat().map((word, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  color: i % 2 === 0 ? 'var(--white)' : 'var(--gray-700)',
                  letterSpacing: '-0.02em',
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* ---- Pricing ---- */}
        <section
          id="pricing"
          style={{
            padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gray-500)',
              marginBottom: '1rem',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--black)',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
            }}
          >
            Simple, honest pricing.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1px',
              backgroundColor: 'var(--gray-100)',
              border: '1px solid var(--gray-100)',
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  backgroundColor: plan.highlight ? 'var(--black)' : 'var(--white)',
                  color: plan.highlight ? 'var(--white)' : 'var(--black)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: plan.highlight ? 'var(--gray-300)' : 'var(--gray-500)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {plan.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: plan.highlight ? 'var(--gray-300)' : 'var(--gray-500)',
                      }}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 300,
                      color: plan.highlight ? 'var(--gray-300)' : 'var(--gray-700)',
                      marginTop: '0.5rem',
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {plan.perks.map((perk) => (
                    <li
                      key={perk}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 300,
                        color: plan.highlight ? 'var(--gray-100)' : 'var(--gray-700)',
                        display: 'flex',
                        gap: '0.6rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ color: plan.highlight ? 'var(--gray-300)' : 'var(--gray-500)', flexShrink: 0 }}>—</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  style={{
                    marginTop: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '0.85rem 1.5rem',
                    border: `1px solid ${plan.highlight ? 'var(--gray-700)' : 'var(--gray-300)'}`,
                    color: plan.highlight ? 'var(--white)' : 'var(--black)',
                    backgroundColor: 'transparent',
                    display: 'block',
                    transition: 'background-color 0.25s, color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = plan.highlight ? 'var(--white)' : 'var(--black)'
                    el.style.color = plan.highlight ? 'var(--black)' : 'var(--white)'
                    el.style.borderColor = plan.highlight ? 'var(--white)' : 'var(--black)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'transparent'
                    el.style.color = plan.highlight ? 'var(--white)' : 'var(--black)'
                    el.style.borderColor = plan.highlight ? 'var(--gray-700)' : 'var(--gray-300)'
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--gray-100)' }} />

        {/* ---- Footer ---- */}
        <footer
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '-0.03em',
              color: 'var(--black)',
            }}
          >
            Forma
          </span>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              color: 'var(--gray-500)',
            }}
          >
            © {new Date().getFullYear()} Forma Inc. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}
