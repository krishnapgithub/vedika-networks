import { useState } from "react";

const destinations = [
  ["India", "Heritage. Nature. Discovery.", 0],
  ["Thailand", "Islands. Culture. Serenity.", 25],
  ["Malaysia", "City lights. Tropical escapes.", 50],
  ["Dubai", "Desert calm. City brilliance.", 75],
  ["Europe", "Timeless cities. New stories.", 100],
  ["Singapore", "Garden city. Endless possibilities.", null],
];

export default function DestinationHero({ items = destinations, heading, kicker, introduction, label = "Discover our destinations", planningHref = "#prospera-contact", whatsappHref = "https://wa.me/919963854127?text=Hello%20Prospera%2C%20I%20would%20like%20to%20plan%20a%20holiday%20or%20event." }) {
  const [paused, setPaused] = useState(false);
  const moving = items.length > 5;
  const group = (duplicate = false) => <div className="dh-group" aria-hidden={duplicate || undefined}>
    {items.map(([name, caption, position, image]) => <div className="dh-panel" key={name} style={{backgroundImage: `url(${image || (position === null ? '/prospera-singapore.jpg' : '/prospera-destinations.jpg')})`, backgroundSize: image || position === null ? 'cover' : '500% 100%', backgroundPosition: image || position === null ? 'center' : `${position}% center`}}>
      <div className="dh-label"><h2>{name}</h2><p>{caption}</p></div>
    </div>)}
  </div>;
  return <section className={`dh ${heading ? 'dh-with-copy' : ''} ${moving ? 'dh-moving' : ''} ${paused ? 'dh-paused' : ''}`} aria-label={label} style={{'--destination-count': items.length}}>
    <div className={heading ? "dh-overlay" : "dh-controls"}>
    {heading && <div className="dh-overlay-copy"><span>{kicker}</span><h1>{heading}</h1><p>{introduction}</p></div>}
    <div className="dh-actions"><a className="dh-plan" href={planningHref}>Start planning</a><a className="dh-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp us</a></div>
    </div>
    <div className="dh-window"><div className="dh-track">{group()}{moving && group(true)}</div></div>
    {moving && <button className="dh-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play destination slideshow' : 'Pause destination slideshow'}>{paused ? 'Play' : 'Pause'}</button>}
    <style>{`
      .dh{position:relative;width:100%;padding:6px;box-sizing:border-box;border:1px solid #ffffffdf;border-radius:24px;background:linear-gradient(135deg,#ffffffcc,#eef4f8aa,#fff8e7cc);box-shadow:0 16px 40px #1831561f;--visible:5}.dh-window{overflow:hidden;border-radius:18px}.dh-track{display:flex;width:100%}.dh-moving .dh-track{width:calc(var(--destination-count) / var(--visible) * 200%);animation:dh-scroll 48s linear infinite}.dh-group{display:flex;flex:1;min-width:0}.dh-panel{position:relative;flex:1;min-width:0;height:clamp(310px,33vw,600px);display:flex;align-items:flex-end;padding:clamp(8px,1.2vw,20px);box-sizing:border-box;border-right:1px solid #ffffff55;background-repeat:no-repeat}.dh-panel::before{content:'';position:absolute;inset:45% 0 0;background:linear-gradient(transparent,#091a2c66)}.dh-label{position:relative;width:100%;padding:14px 12px;box-sizing:border-box;border:1px solid #ffffff5c;border-radius:12px;background:#0f22303d;backdrop-filter:blur(10px);color:#fff}.dh-label h2{margin:0 0 5px;font-size:clamp(19px,2vw,30px);font-weight:500;line-height:1.1;letter-spacing:-.025em}.dh-label p{margin:0;font-size:clamp(8px,.8vw,12px);line-height:1.5;color:#fff5dc}.dh-toggle{position:absolute;top:16px;right:16px;z-index:2;border:1px solid #ffffff88;border-radius:20px;padding:6px 12px;background:#10243b88;backdrop-filter:blur(8px);color:#fff;font:500 10px 'Poppins',sans-serif;cursor:pointer}.dh:hover .dh-track,.dh:focus-within .dh-track,.dh-paused .dh-track{animation-play-state:paused}.dh-toggle:focus-visible{outline:2px solid #ffe400;outline-offset:3px}@keyframes dh-scroll{to{transform:translateX(-50%)}}@media(max-width:768px){.dh{--visible:2}.dh-panel{height:330px}.dh-label p{font-size:9px}.dh-label{padding:12px 8px}}@media(prefers-reduced-motion:reduce){.dh-moving .dh-track{animation:none;width:calc(var(--destination-count) / var(--visible) * 100%)}.dh-moving .dh-group[aria-hidden=true]{display:none}.dh-window{overflow-x:auto}.dh-toggle{display:none}}
      .dh-actions{position:absolute;left:20px;top:18px;z-index:3;display:flex;gap:10px}.dh-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 18px;border-radius:10px;text-decoration:none;font:600 12px "Poppins",sans-serif;box-shadow:0 4px 16px #10243b22}.dh-plan{background:#172b70;color:#fff}.dh-whatsapp{background:rgba(255,255,255,.95);color:#172b70;border:1px solid #fff;backdrop-filter:blur(10px)}.dh-actions a:focus-visible{outline:3px solid #ffe400;outline-offset:3px}@media(max-width:600px){.dh-actions{left:14px;top:14px;gap:6px}.dh-actions a{min-height:38px;padding-inline:10px;font-size:10px}.dh-toggle{top:17px;right:13px;padding:6px 8px;font-size:9px}}
      .dh-overlay{position:absolute;z-index:3;top:54px;left:24px;right:24px;display:flex;align-items:center;gap:24px;padding:24px 28px;border:1px solid #ffffffb3;border-radius:18px;background:rgba(255,255,255,.18);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);box-shadow:none}.dh-overlay-copy{max-width:760px;flex:1;min-width:0}.dh-overlay-copy>span{color:#997013;font-size:9px;font-weight:700;letter-spacing:.15em}.dh-overlay-copy h1{margin:8px 0 10px;color:#132052;font-size:clamp(24px,2.7vw,40px);line-height:1.12;letter-spacing:-.035em}.dh-overlay-copy p{margin:0;color:#fff;background:rgba(10,24,48,.72);padding:10px 12px;border-radius:8px;text-shadow:0 1px 2px rgba(0,0,0,.3);font-size:12px;line-height:1.65}.dh-overlay .dh-actions{position:static;flex-shrink:0;flex-wrap:wrap}.dh-with-copy .dh-panel{height:clamp(460px,36vw,620px)}@media(max-width:1000px){.dh-overlay{align-items:flex-start;flex-direction:column;gap:16px;top:50px;padding:20px}.dh-with-copy .dh-panel{height:540px}}@media(max-width:600px){.dh-overlay{left:14px;right:14px;padding:18px;gap:14px}.dh-overlay-copy h1{font-size:25px}.dh-overlay-copy p{font-size:11px}.dh-with-copy .dh-panel{height:610px}.dh-overlay .dh-actions{width:100%}.dh-overlay .dh-actions a{flex:1}}
    `}</style>
  </section>;
}
