import { Link } from "react-router-dom";

const services = [
  {
    title: "Holidays",
    eyebrow: "Journeys made personal",
    text: "We design thoughtful holidays for families, couples, groups and corporate travellers—from relaxed Indian getaways to carefully planned international experiences.",
    to: "/prospera/holidays",
  },
  {
    title: "Events",
    eyebrow: "Moments brought to life",
    text: "From corporate meetings and team experiences to celebrations, gala dinners and product launches, we coordinate every detail with care.",
    to: "/prospera/events",
  },
  {
    title: "Gifting",
    eyebrow: "Thoughtfully selected",
    text: "We curate meaningful personal and corporate gifts, welcome kits and branded keepsakes that make every occasion feel considered.",
    to: "/prospera/gifting",
  },
  {
    title: "MICE",
    eyebrow: "Business experiences",
    text: "We bring meetings, incentives, conferences and exhibitions together through dependable planning, travel coordination, venues and on-ground support.",
    to: "/prospera/mice",
  },
];

export default function About() {
  return (
    <main className="pa">
      <section className="pa-intro">
        <span>ABOUT PROSPERA</span>
        <h1>Thoughtful planning for journeys, occasions and business experiences.</h1>
        <p>Prospera Holidays & Events brings travel, celebrations, gifting and corporate experiences together through one dependable team. We listen first, understand what matters, and turn every plan into a clear, personal and memorable experience.</p>
      </section>

      <section className="pa-services" aria-labelledby="pa-services-title">
        <div className="pa-heading">
          <span>WHAT WE DO</span>
          <h2 id="pa-services-title">One partner for every meaningful moment.</h2>
        </div>
        <div className="pa-grid">
          {services.map((service) => (
            <article key={service.title}>
              <small>{service.eyebrow}</small>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link to={service.to}>Explore {service.title} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pa-promise">
        <div>
          <span>THE PROSPERA PROMISE</span>
          <h2>Memories. Moments. Made with Care.</h2>
        </div>
        <div className="pa-points">
          <p><strong>Personal attention</strong>Plans shaped around your people, purpose and budget.</p>
          <p><strong>End-to-end care</strong>One point of contact from the first conversation through final coordination.</p>
          <p><strong>Dependable execution</strong>Clear choices, trusted partners and thoughtful support at every step.</p>
        </div>
      </section>

      <section className="pa-contact">
        <div><span>LET'S PLAN TOGETHER</span><h2>Tell us what you have in mind.</h2></div>
        <div>
          <a className="pa-button" href="https://wa.me/919963854127?text=Hello%20Prospera%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noreferrer">WhatsApp us</a>
          <a href="mailto:aravind.prospera@gmail.com">aravind.prospera@gmail.com</a>
          <a href="tel:+919963854127">+91 99638 54127</a>
          <small>GST: 36AENPK9956J1ZN</small>
        </div>
      </section>

      <style>{`
        .pa{padding:8px 28px 24px;color:#132052;font-family:'Poppins',Arial,sans-serif}.pa-intro,.pa-contact{padding:clamp(32px,5vw,64px);border:1px solid rgba(26,42,108,.09);border-radius:20px;background:rgba(255,255,255,.94);box-shadow:0 16px 40px rgba(26,42,108,.08)}.pa-intro>span,.pa-heading>span,.pa-promise>div>span,.pa-contact span,.pa-grid small{color:#b78300;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.pa-intro h1{max-width:1050px;margin:9px 0 15px;font-size:clamp(30px,4vw,58px);line-height:1.08;letter-spacing:-.04em}.pa-intro p{max-width:940px;margin:0;color:#58627e;font-size:14px;line-height:1.75}.pa-services{padding:72px 38px}.pa-heading{text-align:center}.pa-heading h2{margin:7px 0 34px;font-size:clamp(25px,3vw,42px);line-height:1.15}.pa-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.pa-grid article{min-height:270px;padding:28px 22px;border:1px solid rgba(26,42,108,.12);border-top:4px solid #f5c518;border-radius:16px;background:#fff;box-shadow:0 12px 30px rgba(26,42,108,.06)}.pa-grid h3{margin:18px 0 8px;font-size:20px}.pa-grid p{margin:0;color:#58627e;font-size:12px;line-height:1.65}.pa-grid a{display:inline-block;margin-top:18px;color:#1a2a6c;font-size:11px;font-weight:800;text-decoration:none}.pa-promise{padding:48px;display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;border-radius:22px;color:#fff;background:linear-gradient(135deg,#101d50,#1a2f78 68%,#284ca5);box-shadow:0 20px 50px rgba(16,29,80,.2)}.pa-promise h2{margin:8px 0 0;font-size:clamp(26px,3vw,40px);line-height:1.2}.pa-points{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.pa-points p{margin:0;padding:20px;border:1px solid rgba(255,255,255,.13);border-radius:15px;color:rgba(255,255,255,.75);font-size:11px;line-height:1.55;background:rgba(255,255,255,.07)}.pa-points strong{display:block;margin-bottom:8px;color:#fff;font-size:13px}.pa-contact{margin-top:18px;padding:28px 34px;display:flex;align-items:center;justify-content:space-between;gap:30px;background:linear-gradient(135deg,#f2f5ff,#fff9e9)}.pa-contact h2{margin:5px 0 0;font-size:26px}.pa-contact>div:last-child{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.pa-contact a:not(.pa-button){color:#132052;font-size:10px;font-weight:600;text-decoration:none}.pa-contact small{font-size:9px}.pa-button{min-height:42px;padding:0 18px;display:inline-flex;align-items:center;border-radius:10px;color:#fff;background:linear-gradient(135deg,#13245f,#2344a0);font-size:12px;font-weight:700;text-decoration:none}
        @media(max-width:1000px){.pa-grid{grid-template-columns:repeat(2,1fr)}.pa-promise{grid-template-columns:1fr;gap:30px}.pa-contact{align-items:flex-start;flex-direction:column}}
        @media(max-width:600px){.pa{padding:6px 8px 16px}.pa-intro{padding:30px 22px}.pa-intro p{font-size:13px}.pa-services{padding:52px 14px}.pa-grid{grid-template-columns:1fr}.pa-grid article{min-height:auto}.pa-promise{padding:32px 22px}.pa-points{grid-template-columns:1fr}.pa-contact{padding:26px 20px}.pa-contact>div:last-child{align-items:flex-start;flex-direction:column}.pa-button{width:100%;justify-content:center}}
      `}</style>
    </main>
  );
}
