import { useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  ["MICE, Conferences & Corporate Meetings", "Meetings, incentives, conferences and exhibitions with focused planning, venues, production and guest coordination."],
  ["Team Building & Incentives", "Purposeful experiences that energize teams and reward performance."],
  ["Corporate Parties & Gala Dinners", "Memorable celebrations, handled beautifully from start to finish."],
  ["Exhibitions & Product Launches", "Brand-ready spaces and confident on-ground execution."],
  ["Events & Gifting", "Thoughtful gifting, welcome kits and branded keepsakes."],
  ["Private Occasions", "Warm, carefully coordinated celebrations for important moments."],
];

export default function Events() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingFavicon = document.querySelector("link[rel~='icon']");
    const previousFavicon = existingFavicon?.getAttribute("href");
    let favicon = existingFavicon;
    let faviconCreated = false;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
      faviconCreated = true;
    }
    const oldHtmlOverflow = document.documentElement.style.overflow;
    const oldBodyOverflow = document.body.style.overflow;
    const oldBodyPosition = document.body.style.position;
    document.title = "Corporate Events | Prospera Holidays & Events";
    favicon.href = "/prospera-logo-transparent.png";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "scroll";
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.position = "static";
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(fontLink);
    return () => {
      document.title = previousTitle;
      if (faviconCreated) {
        favicon.remove();
      } else if (favicon && previousFavicon) {
        favicon.href = previousFavicon;
      }
      document.documentElement.style.overflow = oldHtmlOverflow;
      document.body.style.overflow = oldBodyOverflow;
      document.body.style.position = oldBodyPosition;
      fontLink.remove();
    };
  }, []);
  return (
    <main className="pe">
      <header className="pe-nav">
        <Link className="pe-logo" to="/prospera" aria-label="Prospera home"><img src="/prospera-logo-transparent.png" alt="Prospera" /></Link>
        <nav aria-label="Prospera menu">
          <Link to="/prospera">Home</Link><span>|</span>
          <Link to="/prospera/holidays">Holidays</Link><span>|</span>
          <Link className="active" to="/prospera/events">Events</Link><span>|</span>
          <Link to="/prospera/gifting">Gifting</Link><span>|</span>
          <Link to="/prospera/mice">MICE</Link><span>|</span>
          <Link to="/prospera#prospera-about">About Us</Link><span>|</span>
          <Link to="/prospera#prospera-contact">Contact Us</Link>
        </nav>
        <a className="pe-nav-cta" href="#contact">Plan with us →</a>
      </header>
      <section className="pe-hero">
        <div className="pe-hero-copy">
          <p className="pe-tag">PROSPERA EVENTS</p>
          <h1>Events, thoughtfully brought to life.</h1>
          <p className="pe-lead">From focused conferences to energetic team outings and memorable gala evenings, we manage every detail with care.</p>
        </div>
        <div className="pe-actions">
          <a className="pe-btn" href="#contact">Start planning</a>
          <a className="pe-btn pe-btn-secondary" href="https://wa.me/919963854127?text=Hello%20Prospera%2C%20I%27m%20interested%20in%20planning%20an%20event.%20Please%20share%20more%20details." target="_blank" rel="noreferrer">WhatsApp us</a>
        </div>
      </section>
      <figure className="pe-showcase"><img src="/prospera-events-showcase.png" alt="Prospera meetings, team building, gala dinners, gifting and exhibitions" /></figure>
      <section className="pe-section" id="services">
        <div className="pe-heading"><div><p className="pe-tag">WHAT WE CREATE</p><h2>Everything your event needs, in one place.</h2></div><p>Strategy, venues, travel, production, hospitality and gifting—coordinated as one seamless experience.</p></div>
        <div className="pe-grid">{services.map(([title, copy], i) => <article key={title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="pe-contact" id="contact">
        <div><p className="pe-tag">LET'S CREATE SOMETHING MEMORABLE</p><h2>Ready to plan your next event?</h2><p>Talk to Prospera for a tailored event plan and clear next steps.</p></div>
        <div><a className="pe-btn" href="https://wa.me/919963854127" target="_blank" rel="noreferrer">Chat on WhatsApp</a><a href="mailto:aravind.prospera@gmail.com">aravind.prospera@gmail.com</a><a href="tel:+919963854127">+91 99638 54127</a><span>GST: 36AENPK9956J1ZN</span></div>
      </section>
      <footer><Link to="/prospera">← Prospera home</Link><span>Memories. Moments. Made with Care.</span></footer>
      <style>{`
        .pe,.pe button,.pe input,.pe textarea,.pe select{font-family:'Poppins',Arial,Helvetica,sans-serif!important}.pe h1,.pe h2,.pe h3{font-family:'Poppins',Arial,Helvetica,sans-serif;font-weight:700}.pe p{font-family:'Poppins',Arial,Helvetica,sans-serif}.pe-btn,.pe-nav a{font-family:'Poppins',Arial,sans-serif}
        html,body{min-height:100%;overflow-y:auto!important}.pe{width:100%;overflow:visible!important}.pe-nav{height:90px;padding:8px clamp(24px,4vw,58px);display:grid;grid-template-columns:86px minmax(0,1fr) auto;align-items:center;gap:20px;border-bottom:1px solid #e7eaf1;background:#fff;position:sticky;top:0;z-index:10}.pe-logo img{display:block;width:64px;height:64px;object-fit:contain}.pe-nav nav{display:flex;align-items:center;justify-content:center;gap:18px;white-space:nowrap}.pe-nav nav a{color:var(--pe-blue);font-weight:750}.pe-nav nav a.active{color:#b58500}.pe-nav nav>span{color:#e2ad00}.pe-nav-cta{padding:12px 17px;border-radius:8px;background:var(--pe-blue);color:#fff!important;font-weight:800}
        @media(max-width:1000px){.pe-nav{grid-template-columns:68px minmax(0,1fr)}.pe-nav-cta{display:none}.pe-nav nav{justify-content:flex-start;overflow-x:auto;padding:8px 0}}
        @media(max-width:540px){.pe-nav{height:auto;min-height:116px;padding:8px 16px;grid-template-columns:56px minmax(0,1fr);align-content:center}.pe-logo img{width:50px;height:50px}.pe-nav nav{grid-column:1/-1;gap:18px;font-size:.82rem;padding:5px 0 8px}.pe-nav nav>span{display:none}}
        :root{--pe-blue:#102868;--pe-gold:#f6c400;--pe-muted:#637087}*{box-sizing:border-box}.pe{min-height:100vh;color:#18223b;background:#fff;font-family:Inter,system-ui,sans-serif}.pe a{text-decoration:none}.pe-back{display:inline-block;margin-bottom:42px;color:var(--pe-blue);font-weight:800}.pe-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:8px;background:var(--pe-blue);color:#fff!important;font-weight:800;box-shadow:0 8px 20px #10286820}.pe-hero{padding:clamp(40px,6vw,75px) clamp(24px,7vw,110px) 48px;background:linear-gradient(135deg,#f5f8ff,#fff 58%,#fff8d3)}.pe-tag{margin:0 0 14px;color:#a97b00;font-size:.78rem;font-weight:900;letter-spacing:.16em}.pe h1{max-width:1050px;margin:0;color:var(--pe-blue);font-size:clamp(2.5rem,5vw,4.7rem);line-height:1.02;letter-spacing:-.05em}.pe-lead{max-width:720px;color:#526079;font-size:clamp(1.05rem,1.5vw,1.25rem);line-height:1.7;margin:25px 0 0}.pe-actions{margin-top:30px}.pe-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:40px}.pe-chips span{padding:10px 15px;border:1px solid #dce3f1;border-radius:999px;background:#fff;font-size:.88rem;font-weight:700}.pe-showcase{margin:34px clamp(18px,4vw,64px) 0}.pe-showcase img{display:block;width:100%;border-radius:20px;box-shadow:0 24px 60px #15285b22}.pe-section{padding:80px clamp(24px,7vw,110px)}.pe-heading{display:grid;grid-template-columns:1.2fr .8fr;align-items:end;gap:50px;margin-bottom:42px}.pe h2{margin:0;color:var(--pe-blue);font-size:clamp(2rem,3.5vw,3.35rem);line-height:1.1}.pe-heading>p,.pe-grid p{color:var(--pe-muted);line-height:1.65}.pe-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.pe-grid article{min-height:210px;padding:28px;border:1px solid #dfe5f0;border-top:4px solid var(--pe-gold);border-radius:14px;box-shadow:0 12px 35px #11255c0a}.pe-grid article>b{color:#bd9100}.pe-grid h3{margin:24px 0 9px;color:var(--pe-blue);font-size:1.2rem}.pe-grid p{margin:0}.pe-contact{margin:0 clamp(18px,4vw,64px) 40px;padding:48px clamp(24px,5vw,68px);display:flex;justify-content:space-between;align-items:center;gap:40px;border:1px solid #f0d66f;border-radius:20px;background:#fff8d9}.pe-contact h2{font-size:clamp(2rem,3vw,3rem)}.pe-contact>div:last-child{display:flex;flex-direction:column;align-items:flex-start;gap:10px;flex-shrink:0}.pe-contact>div:last-child>a:not(.pe-btn),.pe footer a{color:var(--pe-blue);font-weight:750}.pe footer{display:flex;justify-content:space-between;padding:26px clamp(24px,5vw,72px);border-top:1px solid #e4e8f0;color:#6c7588;font-weight:650}
        @media(max-width:850px){.pe-heading{grid-template-columns:1fr;gap:25px}.pe-grid{grid-template-columns:repeat(2,1fr)}.pe-section{padding:65px 24px}.pe-contact{align-items:flex-start;flex-direction:column}}
        @media(max-width:540px){.pe-hero{padding:30px 20px 38px}.pe-back{margin-bottom:34px}.pe h1{font-size:2.4rem}.pe-chips{margin-top:30px}.pe-chips span{font-size:.76rem}.pe-showcase{margin:18px 10px 0}.pe-showcase img{border-radius:12px}.pe-heading{display:block}.pe-heading>p{margin-top:18px}.pe-grid{grid-template-columns:1fr}.pe-grid article{min-height:0}.pe-contact{margin:0 10px 18px;padding:36px 21px}.pe-contact>div:last-child,.pe-contact .pe-btn{width:100%}.pe footer{flex-direction:column;gap:10px;font-size:.84rem}}
        .pe-nav{width:auto;height:78px;min-height:78px;margin:8px 28px 0;padding:8px 14px;grid-template-columns:80px minmax(0,1fr) auto;gap:12px;border:1px solid rgba(26,42,108,.08);border-radius:18px;background:rgba(255,255,255,.92);box-shadow:0 12px 35px rgba(26,42,108,.08);backdrop-filter:blur(14px)}.pe-logo img{width:60px;height:auto}.pe-nav nav{gap:0}.pe-nav nav a{padding:8px 15px;font-size:12px}.pe-nav nav>span{margin:0 2px}.pe-nav-cta{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 18px;border-radius:10px;font-size:12px;background:linear-gradient(135deg,#13245f,#2344a0);box-shadow:0 10px 22px rgba(26,42,108,.2)}
        @media(max-width:1000px){.pe-nav{grid-template-columns:68px minmax(0,1fr);margin-inline:16px}.pe-nav-cta{display:none}.pe-nav nav{gap:0}.pe-nav nav a{padding:8px 12px}}
        @media(max-width:540px){.pe-nav{min-height:112px;height:auto;margin:6px 8px 0;padding:8px 10px;grid-template-columns:56px minmax(0,1fr)}.pe-nav nav{gap:0}.pe-nav nav a{padding:7px 12px}}
        .pe-hero{margin:8px 28px 0;padding:48px 46px;display:flex;align-items:center;justify-content:space-between;gap:40px;border:1px solid rgba(26,42,108,.09);border-radius:22px;background:#fff;box-shadow:0 18px 50px rgba(26,42,108,.08)}.pe-hero-copy{max-width:1120px}.pe h1{font-size:clamp(2.2rem,3.45vw,4rem);line-height:1.08}.pe-lead{max-width:1120px;margin-top:14px}.pe-actions{display:flex;flex-shrink:0;gap:14px;margin-top:0}.pe-btn-secondary{color:var(--pe-blue)!important;background:#fff;border:1px solid #ced7e8;box-shadow:none}
        @media(max-width:1000px){.pe-hero{margin-inline:16px;padding:38px 32px;align-items:flex-start;flex-direction:column}.pe-actions{width:100%}}
        @media(max-width:540px){.pe-hero{margin:6px 8px 0;padding:30px 22px}.pe-actions{flex-direction:column}.pe-actions .pe-btn{width:100%}}
        .pe-hero{gap:32px;padding:32px 38px;border-radius:20px;background:rgba(255,255,255,.92);box-shadow:0 16px 40px rgba(26,42,108,.08)}.pe-hero-copy{max-width:760px}.pe-hero .pe-tag{margin:0;color:#b78300;font-size:10px;font-weight:800;letter-spacing:.16em}.pe-hero h1{max-width:720px;margin:7px 0 8px;font-size:clamp(25px,3vw,44px);font-weight:700;line-height:1.08;letter-spacing:-.035em}.pe-hero .pe-lead{max-width:760px;margin:0;color:#58627e;font-size:13px;line-height:1.65}.pe-hero .pe-actions{gap:10px}.pe-hero .pe-btn{min-height:42px;padding:0 18px;border-radius:10px;font-size:12px;font-weight:700}
        @media(max-width:1000px){.pe-hero{padding:32px 38px}}
        @media(max-width:540px){.pe-hero{padding:28px 22px}.pe-hero h1{font-size:clamp(25px,9vw,36px)}}
        .pe-nav nav a{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:7px 10px;color:#132052;font-family:'Poppins',Arial,sans-serif;font-size:12px;font-weight:600;line-height:1.2;white-space:nowrap}.pe-nav nav>span{margin:0 4px;color:#f5c518;font-size:15px;font-weight:500}.pe-nav nav a.active{color:#132052;font-weight:600}.pe-nav nav a::after{content:'';position:absolute;left:50%;bottom:-1px;width:0;height:3px;border-radius:999px;background:#f5c518;opacity:0;transform:translateX(-50%) translateY(5px);transition:width .28s ease,opacity .28s ease,transform .28s ease;box-shadow:0 3px 8px rgba(245,197,24,.55)}.pe-nav nav a:hover::after,.pe-nav nav a:focus-visible::after,.pe-nav nav a.active::after{width:72%;opacity:1;transform:translateX(-50%) translateY(0)}
        @media(max-width:768px){.pe-nav nav a{padding:6px 8px;font-size:11px}.pe-nav nav>span{margin:0 4px}}
        @media(max-width:480px){.pe-nav nav a{padding:5px 7px;font-size:10px}}
      `}</style>
    </main>
  );
}
