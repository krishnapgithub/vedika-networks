import DestinationHero from "./DestinationHero";
export default function ProsperaServicePage({ kicker, title, introduction, highlights, services, enquiry, whatsappText, showServiceStrip = false, showImageHero = false }) {
  const whatsappUrl = "https://wa.me/919963854127?text=" + encodeURIComponent(whatsappText);
  return (
    <main className="psp">
      {showImageHero && <div className="psp-holiday-hero"><DestinationHero heading={title} kicker={kicker} introduction={introduction} planningHref="#service-contact" whatsappHref={whatsappUrl} label="Explore our holiday experiences" items={services.map(([name, description, image], index) => [name, ["Discover the beauty of India.", "Explore beyond borders.", "Time together, beautifully planned.", "Escapes made for two.", "Shared journeys. Lasting memories.", "Your journey, your way."][index], null, image])} /></div>}
      {!showImageHero && <section className="psp-hero">
        <div>
          <span>{kicker}</span>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </div>
        <div className="psp-actions">
          <a className="psp-primary" href="#service-contact">Start planning</a>
          <a className="psp-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us</a>
        </div>
      </section>}
      
      {!showServiceStrip && (
        <section className="psp-highlights" aria-label="Service highlights">
          {highlights.map((item) => <span key={item}>{item}</span>)}
        </section>
      )}
      
      <section className="psp-services">
        <div className="psp-heading"><span>WHAT WE OFFER</span><h2>Thoughtfully planned around your needs.</h2></div>
        <div className="psp-grid">
          {services.map(([name, description, image], index) => {
            const cardNumber = String(index + 1).padStart(2, "0");
            return image ? (
              <article className="psp-image-card" key={name}>
                <div className="psp-card-visual">
                  <img src={image} alt="" width="1536" height="1024" loading="lazy" decoding="async" />
                  <b>{cardNumber}</b>
                  <h3 className="psp-card-image-title">{name}</h3>
                </div>
                <div className="psp-card-copy">
                  <p>{description}</p>
                </div>
              </article>
            ) : (
              <article key={name}>
                <b>{cardNumber}</b>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>
      </section>
      
      <section className="psp-contact" id="service-contact">
        <div>
          <span>LET'S PLAN TOGETHER</span>
          <h2>{enquiry}</h2>
          <p>Talk to Prospera for thoughtful recommendations and clear next steps.</p>
        </div>
        <div>
          <a className="psp-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          <a href="mailto:aravind.prospera@gmail.com">aravind.prospera@gmail.com</a>
          <a href="tel:+919963854127">+91 99638 54127</a>
          <small>GST: 36AENPK9956J1ZN</small>
        </div>
      </section>
      
      <style>{`
        .psp{padding:8px 28px 24px;color:#132052;font-family:'Poppins',Arial,sans-serif}.psp-hero{padding:32px 38px;display:flex;align-items:center;justify-content:space-between;gap:32px;border:1px solid rgba(26,42,108,.09);border-radius:20px;background:rgba(255,255,255,.94);box-shadow:0 16px 40px rgba(26,42,108,.08)}.psp-hero>div:first-child{max-width:760px}.psp-hero span,.psp-heading span,.psp-contact span{color:#b78300;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.psp-hero h1{max-width:720px;margin:7px 0 8px;font-size:clamp(25px,3vw,44px);line-height:1.08;letter-spacing:-.035em}.psp-hero p{max-width:760px;margin:0;color:#58627e;font-size:13px;line-height:1.65}.psp-actions{display:flex;flex:0 0 auto;gap:10px}.psp-primary,.psp-secondary{min-height:42px;padding:0 18px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none}.psp-primary{color:#fff;background:linear-gradient(135deg,#13245f,#2344a0);box-shadow:0 10px 22px rgba(26,42,108,.2)}.psp-secondary{color:#13245f;border:1px solid rgba(26,42,108,.2);background:#fff}.psp-highlights{margin-top:8px;padding:22px 30px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;border-radius:18px;color:#fff;background:linear-gradient(135deg,#101d50,#1a2f78 68%,#284ca5)}.psp-highlights span{text-align:center;font-size:12px;font-weight:650}.psp-services{padding:65px 38px}.psp-heading h2{margin:7px 0 32px;font-size:clamp(25px,3vw,40px);line-height:1.15}
        
        /* Updated Grid system using auto-fit to evenly balance odd-numbered items */
        .psp-grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px}
        
        .psp-grid article{min-height:220px;padding:28px 22px 22px;border:1px solid rgba(26,42,108,.12);border-top:4px solid #f5c518;border-radius:15px;background:#fff;box-shadow:0 12px 30px rgba(26,42,108,.06);transition:transform .25s ease,box-shadow .25s ease}.psp-grid article:hover{transform:translateY(-5px);box-shadow:0 18px 36px rgba(26,42,108,.12)}.psp-grid b{color:#b78300;font-size:10px;letter-spacing:.1em}.psp-grid h3{margin:15px 0 6px;font-size:18px;line-height:1.2}.psp-grid p{margin:0;color:#555;font-size:11px;line-height:1.4}.psp-contact{min-height:120px;padding:22px 30px;display:flex;align-items:center;justify-content:space-between;gap:24px;border:1px solid rgba(26,42,108,.09);border-radius:14px;background:linear-gradient(135deg,#f2f5ff,#fff9e9);box-shadow:0 4px 12px rgba(26,42,108,.05)}.psp-contact h2{margin:5px 0 0;font-size:24px;line-height:1.15}.psp-contact p{margin:6px 0 0;color:#555;font-size:11px}.psp-contact>div:last-child{display:flex;align-items:flex-start;flex-direction:column;gap:4px}.psp-contact>div:last-child .psp-primary{min-height:38px;margin-bottom:3px;padding:0 15px;font-size:11px}.psp-contact>div:last-child>a:not(.psp-primary),.psp-contact small{color:#132052;font-size:9px;font-weight:600;text-decoration:none}
        @media(max-width:850px){.psp-hero,.psp-contact{align-items:flex-start;flex-direction:column}.psp-actions{width:100%}}
        @media(max-width:560px){.psp{padding:6px 8px 16px}.psp-hero{padding:28px 22px}.psp-actions{flex-direction:column}.psp-actions a{width:100%}.psp-highlights{grid-template-columns:1fr;padding:20px}.psp-services{padding:50px 10px}.psp-grid{grid-template-columns:1fr}.psp-grid article{min-height:auto}.psp-contact{padding:22px 18px}.psp-contact>div:last-child,.psp-contact .psp-primary{width:100%}}
        .psp-grid article.psp-image-card{padding:0;min-height:0;overflow:hidden;border:1px solid #e5e8e9;border-radius:18px;background:#fff;box-shadow:0 8px 28px rgba(26,42,108,.055)}.psp-card-visual{position:relative;overflow:hidden;aspect-ratio:3/2;background:#f4f3ec}.psp-card-visual img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.psp-image-card:hover .psp-card-visual img{transform:scale(1.025)}.psp-card-visual>b{position:absolute;left:16px;top:14px;display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(255,255,255,.75);border-radius:50%;background:rgba(255,255,255,.92);color:#937224;font-size:10px;font-weight:600;backdrop-filter:blur(8px);z-index:1}
        
        /* Fixed: Labels moved beneath the media box into the copy wrapper */
        .psp-card-copy{padding:22px 24px 26px;border-top:2px solid #e9ce84}.psp-card-copy h3{margin:0 0 9px;color:#132052;font-size:19px;letter-spacing:-.025em;font-weight:600;line-height:1.2}.psp-card-copy p{color:#657080;font-size:12px;line-height:1.65}@media(prefers-reduced-motion:reduce){.psp-card-visual img{transition:none}.psp-image-card:hover .psp-card-visual img{transform:none}}
        .psp-holiday-hero{margin-bottom:0}.psp-holiday-hero + .psp-services{padding-top:20px}.psp-holiday-hero + .psp-services .psp-heading h2{margin-bottom:22px}.psp-holiday-hero .dh-label h2{font-size:clamp(16px,1.5vw,23px)}.psp-card-visual .psp-card-image-title{position:absolute;z-index:1;left:22px;right:22px;bottom:19px;margin:0;color:white;font-size:24px;font-weight:600;line-height:1.15;text-shadow:0 2px 8px #0005}.psp-card-visual::after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,#0a1837c7);pointer-events:none}
        .psp-holiday-hero .dh-label h2 { font-size: clamp(16px, 1.5vw, 22px); }
        @media (min-width: 1001px) {
          .psp-holiday-hero .dh-with-copy .dh-panel { height: 386px; }
        }
        @media (max-width: 1000px) and (min-width: 601px) {
          .psp-holiday-hero .dh-with-copy .dh-panel { height: 460px; }
        }
        @media (max-width: 600px) {
          .psp-holiday-hero .dh-with-copy .dh-panel { height: 540px; }
        }
        @media (max-width: 600px) {
          .psp-holiday-hero .dh-with-copy .dh-panel { height: 420px; }
          .psp-holiday-hero .dh-overlay { top: 42px; padding: 14px; gap: 10px; }
          .psp-holiday-hero .dh-overlay-copy h1 { font-size: 22px; margin: 6px 0 8px; }
          .psp-holiday-hero .dh-overlay-copy p { font-size: 10px; line-height: 1.5; padding: 8px 10px; }
        }
          #service-contact{scroll-margin-top:150px}
    `}</style>
    </main>
  );
}
