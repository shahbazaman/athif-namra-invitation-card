"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%23c9a84c' stroke-width='0.6' opacity='0.13'%3E%3Cpolygon points='60,10 85,30 85,70 60,90 35,70 35,30'/%3E%3Cpolygon points='60,25 75,35 75,65 60,75 45,65 45,35'/%3E%3Cline x1='60' y1='10' x2='60' y2='0'/%3E%3Cline x1='85' y1='30' x2='120' y2='15'/%3E%3Cline x1='85' y1='70' x2='120' y2='85'/%3E%3Cline x1='60' y1='90' x2='60' y2='120'/%3E%3Cline x1='35' y1='70' x2='0' y2='85'/%3E%3Cline x1='35' y1='30' x2='0' y2='15'/%3E%3C/g%3E%3C/svg%3E")`

const Arch = ({ op = 0.2 }: { op?: number }) => (
  <svg viewBox="0 0 300 70" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', opacity: op }}>
    <path d="M10 70 L10 35 Q10 4 150 4 Q290 4 290 35 L290 70" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
    <path d="M26 70 L26 38 Q26 18 150 18 Q274 18 274 38 L274 70" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
    <line x1="10" y1="70" x2="290" y2="70" stroke="#c9a84c" strokeWidth="1.2" />
    <circle cx="150" cy="4" r="3.5" fill="#c9a84c" />
    {[40,70,100,130,150,170,200,230,260].map((x, i) => <circle key={i} cx={x} cy={70} r="1.8" fill="#c9a84c" />)}
  </svg>
)

const Corner = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', transform: `${flip ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim() }}>
    <g fill="none">
      <path d="M5 115 Q5 5 115 5" stroke="#c9a84c" strokeWidth="0.7" opacity="0.28" />
      <path d="M18 18 Q28 8 38 18 Q28 28 18 18Z" fill="#c9a84c" opacity="0.65" />
      <path d="M8 28 Q18 18 28 28 Q18 38 8 28Z"  fill="#c9a84c" opacity="0.42" />
      <path d="M28 8  Q38 18 28 28 Q18 18 28 8Z"  fill="#c9a84c" opacity="0.42" />
      <path d="M38 18 Q46 12 54 18 Q46 28 36 24 Q42 22 38 18Z" fill="#c9a84c" opacity="0.38" />
      <polygon points="18,18 20,14 22,18 26,18 23,21 24,25 18,23 12,25 13,21 10,18 14,18 16,14" fill="#c9a84c" opacity="0.28" />
      <path d="M38 18 Q50 30 44 60" stroke="#c9a84c" strokeWidth="0.9" opacity="0.38" fill="none" />
      <path d="M18 38 Q30 50 60 44" stroke="#c9a84c" strokeWidth="0.9" opacity="0.33" fill="none" />
      <path d="M14 54 Q20 48 26 54 Q20 60 14 54Z" fill="#c9a84c" opacity="0.38" />
      <path d="M8 60 Q14 54 20 60 Q14 66 8 60Z"   fill="#c9a84c" opacity="0.28" />
      <ellipse cx="30" cy="34" rx="7" ry="2.8" fill="#3a9070" opacity="0.38" transform="rotate(-48,30,34)" />
      <ellipse cx="36" cy="26" rx="6" ry="2.5" fill="#3a9070" opacity="0.3"  transform="rotate(-70,36,26)" />
      <circle cx="34" cy="14" r="1.8" fill="#e8c97a" opacity="0.6" />
      <circle cx="14" cy="34" r="1.8" fill="#e8c97a" opacity="0.55" />
      <circle cx="12" cy="54" r="1.3" fill="#e8c97a" opacity="0.45" />
    </g>
  </svg>
)

const Petals = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
    {Array.from({ length: 18 }).map((_, i) => {
      const colors = ['rgba(212,132,154,0.35)', 'rgba(201,168,76,0.2)', 'rgba(58,144,112,0.2)', 'rgba(176,80,112,0.25)']
      const s = 5 + i % 7
      return <div key={i} style={{ position: 'absolute', borderRadius: '50% 0 50% 0', width: s, height: s, background: colors[i % colors.length], left: `${(i * 5.7) % 100}%`, animation: `petalFall ${10 + i % 8}s ${i * 0.55}s linear infinite`, opacity: 0 }} />
    })}
  </div>
)

const GoldLine = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', margin: '28px auto' }}>
    <div style={{ flex: 1, maxWidth: 100, height: 1, background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.7))' }} />
    <span style={{ color: '#c9a84c', fontSize: 13, opacity: 0.8 }}>✦</span>
    <div style={{ flex: 1, maxWidth: 100, height: 1, background: 'linear-gradient(to left,transparent,rgba(201,168,76,0.7))' }} />
  </div>
)

const InfoRow = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(17px,3.2vw,22px)', color: '#e8c97a', letterSpacing: 1, lineHeight: 1.5 }}>{value}</div>
    {sub && <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 2, color: 'rgba(232,201,122,0.55)', marginTop: 4 }}>{sub}</div>}
  </div>
)

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0d3b2e; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #081f18; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); border-radius: 2px; }
  @keyframes petalFall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    5%   { opacity: 0.5; }
    90%  { opacity: 0.25; }
    100% { transform: translateY(100vh) rotate(380deg); opacity: 0; }
  }
  @keyframes floatUp {
    0%   { transform: translateY(100vh); opacity: 0; }
    10%  { opacity: 0.5; }
    100% { transform: translateY(-40px); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulseRing {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
    50%      { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
  }
  @keyframes bounceY {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(9px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

// ── Envelope ──────────────────────────────────────────────────────────────────
const EnvelopeScreen = ({ onOpen }: { onOpen: () => void }) => {
  const [opening, setOpening] = useState(false)
  const go = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1300) }

  return (
    <motion.div key="env" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.7 } }}
      onClick={go}
      style={{ position: 'fixed', inset: 0, cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center,#1a5c44 0%,#0d3b2e 60%,#081f18 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: PATTERN, backgroundSize: '120px 120px' }} />
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', borderRadius: '50%', width: 3 + i % 4, height: 3 + i % 4, background: `rgba(201,168,76,${0.12 + (i % 4) * 0.07})`, left: `${(i * 7.1) % 100}%`, animation: `floatUp ${7 + i % 5}s ${i * 0.45}s linear infinite` }} />
      ))}
      <Petals />

      <motion.div initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ position: 'relative', width: 'clamp(260px,78vw,340px)', zIndex: 2 }}>
        <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', filter: 'drop-shadow(0 18px 50px rgba(8,31,24,0.8))' }}>
          <defs>
            <linearGradient id="eB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2d7a5f"/><stop offset="100%" stopColor="#1a5c44"/></linearGradient>
            <linearGradient id="eF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a9070"/><stop offset="100%" stopColor="#2d7a5f"/></linearGradient>
          </defs>
          <rect x="0" y="30" width="320" height="190" rx="5" fill="url(#eB)" />
          <line x1="24" y1="58" x2="296" y2="58" stroke="#c9a84c" strokeWidth="0.6" opacity="0.4" />
          <line x1="24" y1="62" x2="296" y2="62" stroke="#c9a84c" strokeWidth="0.3" opacity="0.22" />
          <polygon points="0,30 160,130 0,220"    fill="#1a5c44" opacity="0.6" />
          <polygon points="320,30 160,130 320,220" fill="#0d3b2e" opacity="0.55" />
          <polygon points="0,220 320,220 160,130"  fill="#2d7a5f" opacity="0.7" />
          <text x="160" y="188" fontFamily="Georgia,serif" fontSize="15" fill="#c9a84c" textAnchor="middle" opacity="0.65">A ♥ N</text>
          <motion.polygon points="0,30 320,30 160,130" fill="url(#eF)"
            style={{ transformOrigin: '160px 30px' }}
            animate={opening ? { rotateX: -175 } : { rotateX: 0 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }} />
          <line x1="0" y1="30" x2="320" y2="30" stroke="#c9a84c" strokeWidth="0.7" opacity="0.5" />
          <polygon points="155,28 160,22 165,28 160,34" fill="#c9a84c" opacity="0.5" />
        </svg>

        <motion.div animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.1 }}
          style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle,#b05070,#6b1f35)', boxShadow: '0 4px 20px rgba(107,31,53,0.7)', animation: 'pulseRing 2s infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#f5dfa0' }}>
          ♥
        </motion.div>

        <AnimatePresence>
          {opening && (
            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -80, opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }}
              style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '76%', background: 'linear-gradient(135deg,#1a5c44,#0d3b2e)', border: '1px solid rgba(201,168,76,0.35)', padding: '16px 20px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', pointerEvents: 'none' }}>
              <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 20, color: '#e8c97a' }}>You are invited</div>
              <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 16, color: '#d4849a', marginTop: 4 }}>Athif & Namra</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{ marginTop: 44, zIndex: 2, fontFamily: 'Montserrat,sans-serif', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(232,201,122,0.75)' }}>
        {opening ? 'Opening…' : 'Tap to open your invitation'}
      </motion.p>
    </motion.div>
  )
}

// ── Main Card ─────────────────────────────────────────────────────────────────
const Card = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
    style={{ background: 'radial-gradient(ellipse at 50% 0%,#1a5c44 0%,#0d3b2e 55%,#081f18 100%)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

    {/* Full-page pattern */}
    <div style={{ position: 'fixed', inset: 0, backgroundImage: PATTERN, backgroundSize: '120px 120px', pointerEvents: 'none', zIndex: 0 }} />
    {/* Radial glow center */}
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 50% 30%,rgba(201,168,76,0.055) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

    <Petals />

    {/* Corner ornaments — fixed so visible throughout */}
    {[
      { style: { top: 0, left: 0 },    flip: false, flipY: false },
      { style: { top: 0, right: 0 },   flip: true,  flipY: false },
      { style: { bottom: 0, left: 0 }, flip: false, flipY: true  },
      { style: { bottom: 0, right: 0 },flip: true,  flipY: true  },
    ].map((c, i) => (
      <div key={i} style={{ position: 'fixed', width: 'clamp(80px,14vw,130px)', height: 'clamp(80px,14vw,130px)', opacity: 0.75, zIndex: 2, ...c.style }}>
        <Corner flip={c.flip} flipY={c.flipY} />
      </div>
    ))}

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(60px,10vw,100px) clamp(28px,6vw,80px) clamp(70px,10vw,110px)' }}>

      {/* Top arch */}
      <div style={{ width: '100%', maxWidth: 420, marginBottom: 8 }}>
        <Arch op={0.3} />
      </div>

      {/* Bismillah */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
        style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 'clamp(20px,4.5vw,30px)', color: '#e8c97a', opacity: 0.9, letterSpacing: 3, marginBottom: 20 }}>
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </motion.div>

      {/* Together with */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.9 }}
        style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 'clamp(8px,1.6vw,10px)', letterSpacing: 6, color: 'rgba(232,201,122,0.65)', textTransform: 'uppercase', marginBottom: 6 }}>
        Together with their families
      </motion.div>

      {/* Thin gold vertical bar */}
      <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}
        style={{ width: 1, height: 44, background: 'linear-gradient(to bottom,transparent,#c9a84c,transparent)', margin: '14px auto' }} />

      {/* Names */}
      <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65, duration: 1 }}>
        {['Athif', 'Namra'].map((name, i) => (
          <React.Fragment key={name}>
            {i === 1 && (
              <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 'clamp(30px,6vw,52px)', color: '#d4849a', margin: '2px 0' }}>&amp;</div>
            )}
            <div style={{
              fontFamily: '"Great Vibes",cursive',
              fontSize: 'clamp(60px,14vw,110px)',
              lineHeight: 1,
              background: 'linear-gradient(90deg,#c9a84c 0%,#f5dfa0 40%,#c9a84c 70%,#e8c97a 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3.5s linear infinite',
            }}>{name}</div>
          </React.Fragment>
        ))}
      </motion.div>

      {/* Wedding Invitation tag */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
        style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 'clamp(8px,1.6vw,10px)', letterSpacing: 8, color: 'rgba(232,201,122,0.45)', textTransform: 'uppercase', marginTop: 16 }}>
        Wedding Invitation
      </motion.div>

      <GoldLine />

      {/* ── Details block ── */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}
        style={{ width: '100%', maxWidth: 380 }}>

        {/* Gold border card */}
        <div style={{ border: '1px solid rgba(201,168,76,0.28)', padding: 'clamp(28px,5vw,44px) clamp(20px,4vw,40px)', position: 'relative', background: 'rgba(13,59,46,0.35)', backdropFilter: 'blur(6px)' }}>

          {/* Corner brackets */}
          {[
            { top: 0, left: 0,  borderWidth: '1px 0 0 1px' },
            { top: 0, right: 0, borderWidth: '1px 1px 0 0' },
            { bottom: 0, left: 0,  borderWidth: '0 0 1px 1px' },
            { bottom: 0, right: 0, borderWidth: '0 1px 1px 0' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 18, height: 18, borderColor: 'rgba(201,168,76,0.55)', borderStyle: 'solid', ...s }} />
          ))}

          {/* Couple names + parents */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 'clamp(30px,6vw,42px)', color: '#e8c97a', lineHeight: 1.1 }}>Athif</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(232,201,122,0.55)', letterSpacing: 1, marginTop: 4 }}>
              Son of Mr. Aziz &amp; Mrs. Soudha
            </div>
          </div>

          <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 'clamp(22px,4vw,32px)', color: '#d4849a', margin: '10px 0' }}>&amp;</div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 'clamp(30px,6vw,42px)', color: '#e8c97a', lineHeight: 1.1 }}>Namra</div>
            <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(232,201,122,0.55)', letterSpacing: 1, marginTop: 4 }}>
              Daughter of Mr. &amp; Mrs. Saleem
            </div>
          </div>

          {/* Thin separator */}
          <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)', marginBottom: 24 }} />

          {/* Date */}
          <InfoRow label="Date" value="Saturday, 6th June 2026" />

          <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)', margin: '18px auto' }} />

          {/* Time */}
          <InfoRow label="Time" value="12:00 PM Onwards" />

          <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)', margin: '18px auto' }} />

          {/* Venue */}
          <InfoRow label="Venue" value="Malabar Avenue" sub="Ramanattukara, Calicut, Kerala" />

          {/* Thin separator */}
          <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)', margin: '24px 0' }} />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Open in Maps',   href: 'https://maps.app.goo.gl/ZmPFAxwHUQCPZqT78' },
              { label: 'Get Directions', href: 'https://www.google.com/maps/dir/?api=1&destination=Malabar+Avenue+Ramanattukara+Calicut+Kerala' },
            ].map(b => (
              <motion.a key={b.label} href={b.href} target="_blank" rel="noreferrer"
                style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#e8c97a', textDecoration: 'none', padding: '11px 22px', border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', display: 'inline-block' }}
                whileHover={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.7)' }}
                whileTap={{ scale: 0.97 }}>
                {b.label}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <GoldLine />

      {/* Blessing quote */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.9 }}
        style={{ maxWidth: 340, fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 'clamp(14px,2.5vw,17px)', color: 'rgba(232,201,122,0.65)', lineHeight: 2, marginBottom: 8 }}>
        "We joyfully request the honour of your presence<br />
        as we begin this blessed journey together."
      </motion.div>

      {/* Contact */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
        {[
          { icon: '📞', label: 'Call', href: 'tel:+916282142322' },
          { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/916282142322?text=Hi!%20I%20received%20your%20wedding%20invitation.' },
        ].map(c => (
          <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,201,122,0.65)', textDecoration: 'none', padding: '10px 20px', border: '1px solid rgba(201,168,76,0.25)' }}
            whileHover={{ borderColor: 'rgba(201,168,76,0.55)', color: '#e8c97a' }}>
            <span>{c.icon}</span><span>{c.label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer dua */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.9 }}
        style={{ marginTop: 44 }}>
        {/* Bottom arch */}
        <div style={{ width: '100%', maxWidth: 300, margin: '0 auto 16px', transform: 'scaleY(-1)', opacity: 0.22 }}>
          <Arch op={1} />
        </div>
        <div style={{ fontFamily: '"Great Vibes",cursive', fontSize: 'clamp(24px,5vw,34px)', color: 'rgba(232,201,122,0.5)' }}>
          With love &amp; blessings
        </div>
        <div style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(201,168,76,0.3)', marginTop: 10, letterSpacing: 2 }}>
          بارك الله لكما وبارك عليكما
        </div>
        {/* Three rose diamonds */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, background: '#b05070', transform: 'rotate(45deg)', opacity: 0.5, borderRadius: 1 }} />)}
        </div>
      </motion.div>

    </div>
  </motion.div>
)

// ── Root ──────────────────────────────────────────────────────────────────────
export default function MinimalWeddingCard() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <style>{FONTS}</style>
      <AnimatePresence mode="wait">
        {!open
          ? <EnvelopeScreen key="env" onOpen={() => setOpen(true)} />
          : <Card key="card" />
        }
      </AnimatePresence>
    </>
  )
}
