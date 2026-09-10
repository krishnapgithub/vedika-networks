export default function Contact() {
  return (
    <main className="pc">
      <section className="pc-card">
        <div className="pc-heading">
          <span>CONTACT US</span>
          <h1>Prospera Holidays & Events</h1>
          <p>We’re here to help you plan your next holiday, event, gifting requirement or MICE experience.</p>
        </div>
        <div className="pc-details">
          <a href="mailto:aravind.prospera@gmail.com"><small>Email</small><strong>aravind.prospera@gmail.com</strong></a>
          <a href="tel:+919963854127"><small>Phone</small><strong>+91 99638 54127</strong></a>
          <div><small>Address</small><strong>Flat No. 502, Sai Durga Residency,<br />Karmanghat, Hyderabad - 97</strong></div>
          <div><small>GST</small><strong>36AENPK9956J1ZN</strong></div>
          <div><small>Legal Proprietor</small><strong>Aravind Babu K</strong></div>
        </div>
        <a className="pc-whatsapp" href="https://wa.me/919963854127?text=Hello%20Prospera%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noreferrer">Chat on WhatsApp</a>
      </section>
      <style>{`
        .pc{min-height:calc(100vh - 94px);padding:8px 28px 28px;display:grid;place-items:center;color:#132052;font-family:'Poppins',Arial,sans-serif}.pc-card{width:min(920px,100%);padding:48px;border:1px solid rgba(26,42,108,.1);border-radius:22px;background:linear-gradient(135deg,#f2f5ff,#fff 55%,#fff9e9);box-shadow:0 18px 48px rgba(26,42,108,.1)}.pc-heading>span{color:#b78300;font-size:10px;font-weight:800;letter-spacing:.16em}.pc-heading h1{margin:7px 0 10px;font-size:clamp(28px,4vw,46px);line-height:1.1}.pc-heading p{max-width:680px;margin:0;color:#58627e;font-size:13px;line-height:1.65}.pc-details{margin:36px 0 30px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.pc-details>a,.pc-details>div{padding:18px;border:1px solid rgba(26,42,108,.1);border-radius:13px;background:rgba(255,255,255,.8);text-decoration:none}.pc-details small,.pc-details strong{display:block}.pc-details small{margin-bottom:6px;color:#9a7600;font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.pc-details strong{color:#132052;font-size:12px;line-height:1.55}.pc-whatsapp{min-height:44px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;border-radius:10px;color:#fff;background:linear-gradient(135deg,#25d366,#19bd59);box-shadow:0 8px 20px rgba(37,211,102,.22);font-size:12px;font-weight:700;text-decoration:none}
        @media(max-width:600px){.pc{padding:6px 8px 18px;place-items:start stretch}.pc-card{padding:30px 22px}.pc-details{grid-template-columns:1fr;margin:28px 0 24px}.pc-whatsapp{width:100%}}
        .pc{min-height:0;padding:12px 28px;box-sizing:border-box}
        .pc-card{padding:24px 32px;box-sizing:border-box}
        .pc-heading h1{font-size:clamp(26px,3vw,36px);margin:6px 0 8px}
        .pc-details{margin:20px 0 16px;gap:10px}
        .pc-details>a,.pc-details>div{padding:12px 16px;min-width:0}
        .pc-details strong{overflow-wrap:anywhere}
        .pc-details small{margin-bottom:4px}
        .pc-whatsapp{min-height:38px}
        @media(min-width:769px){.pc{min-height:calc(100dvh - 166px);place-items:center}}
        @media(max-width:600px){.pc{padding:8px}.pc-card{padding:16px}.pc-heading h1{font-size:24px}.pc-heading p{font-size:11px}.pc-details{grid-template-columns:repeat(2,minmax(0,1fr));margin:14px 0;gap:8px}.pc-details>a,.pc-details>div{padding:9px}.pc-details strong{font-size:10px}.pc-details small{font-size:8px}.pc-details>div:nth-child(3){grid-column:1/-1}}
      `}</style>
    </main>
  );
}
