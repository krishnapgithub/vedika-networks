

import React, { useState, useEffect } from 'react';

// Place this right inside your main BentoGrid component code 
const MarketDataCard = () => {
    // 🚀 React State Variables to hold live floating values
    const [usdInr, setUsdInr] = useState(94.34); // Accurate fallback baseline value
    const [isLoading, setIsLoading] = useState(true);

    // 📡 Fetch live data directly from the public exchange rate feed
    useEffect(() => {
        async function fetchLiveRates() {
            try {
                // Public open-access API requiring zero developer authentication keys
                const response = await fetch('https://frankfurter.dev');
                const data = await response.json();

                if (data && data.rates && data.rates.INR) {
                    // Extract the live decimal floating rate point value 
                    const floatingRate = data.rates.INR;
                    setUsdInr(parseFloat(floatingRate).toFixed(2));
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Could not fetch floating currency data stream:", error);
                setIsLoading(false); // Fallback to baseline gracefully if network cuts
            }
        }
        fetchLiveRates();
    }, []);

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Black Scrolling Ticker Header */}
            <div className="card-image-box ticker-box">
                <div className="tradingview-widget-container">
                    <div id="ticker-fallback">
                        <marquee scrollamount="4">
                            <strong>NIFTY 50:</strong> 24,013.10 <span style={{ color: '#ef4444' }}>▼ -0.64%</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <strong>SENSEX:</strong> 76,802.90 <span style={{ color: '#ef4444' }}>▼ -0.58%</span>
                        </marquee>
                    </div>
                </div>
            </div>

            {/* Restructured Content Box */}
            <div className="card-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

                {/* Row 1: Header and Portal Action */}
                <div className="market-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 className="card-heading" style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Live Market Data</h3>
                    <a
                        href="https://tradingview.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="market-portal-link"
                        style={{ fontSize: '0.72rem', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}
                    >
                        View Live Panel ↗
                    </a>
                </div>

                {/* Row 2: Sector Performance Grid */}
                <div className="market-sector-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: '#64748b' }}>Nifty Bank</span>
                        <span style={{ fontWeight: '600', color: '#ef4444' }}>-0.38% ▼</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: '#64748b' }}>Nifty IT</span>
                        <span style={{ fontWeight: '600', color: '#ef4444' }}>-5.75% ▼</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: '#64748b' }}>Nifty Pharma</span>
                        <span style={{ fontWeight: '600', color: '#22c55e' }}>+0.48% ▲</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: '#64748b' }}>Nifty Metal</span>
                        <span style={{ fontWeight: '600', color: '#ef4444' }}>-0.52% ▼</span>
                    </div>
                </div>

                {/* Row 3: Live Market Status Indicators (Featuring our DYNAMIC floating values) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#475569', background: '#eff6ff', padding: '8px 12px', borderRadius: '6px' }}>
                    <div>📊 <span style={{ fontWeight: '600' }}>Adv/Dec:</span> 956 / 1324</div>

                    {/* 🚀 The data floats dynamically here! */}
                    <div>
                        💵 <span style={{ fontWeight: '600' }}>USD/INR:</span> {isLoading ? (
                            <span style={{ color: '#64748b', fontStyle: 'italic' }}>loading...</span>
                        ) : (
                            <span style={{ fontWeight: '700', color: '#1e3a8a' }}>₹{usdInr}</span>
                        )}
                    </div>
                </div>

                {/* Row 4: Inline Micro-Hyperlinks Footer */}
                <div className="market-index-quicklinks" style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: 'auto' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>Direct Trackers:</span>
                    <a
                        href="https://nseindia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'underline' }}
                    >
                        NSE Nifty 50
                    </a>
                    <a
                        href="https://bseindia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0f172a', fontWeight: '600', textDecoration: 'underline' }}
                    >
                        BSE Sensex
                    </a>
                </div>
            </div>
        </div>
    );
};


export default function BentoGrid() {
    return (
        <div className="layout-page-container">

            {/* ========================================================================== 
         1. Navigation Header Section 
         ========================================================================== 
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-tag">VN</span> Vedika Networks
                </div>
                <div className="nav-links">
                    <a href="#benefits">Benefits</a>
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <a href="#start" className="cta-btn">Get Started</a>
            </nav>*/}

            {/* ========================================================================== 
         2. Main Center Pod Content Module 
         ========================================================================== */}
            <div className="content-wrapper">
                <div className="main-container">

                    {/* Hero Header Segment */}
                    <div className="hero-section">
                        <div className="hero-flex-box">
                            <h1 className="hero-title">
                                One Ecosystem.<br /> Infinite Possibilities....
                            </h1>
                            <p className="hero-desc">
                                Turning Dreams into Destinations, Relationships into Lifelong Bonds, and Ideas into Digital Success.
                            </p>
                        </div>
                    </div>

                    {/* ========================================================================== 
             3. Strict Outer Side-By-Side Layout Grid Space
             ========================================================================== */}
                    <div className="bento-grid-main-layout">

                        {/* LEFT-HAND ZONE: 2x2 Segment Layout Grid (4 Cards) */}
                        <div className="grid-left-zone">

                            {/* Card 1: Tours & Travels */}
                            {/* Card 1: Tours & Travels with Historical Narrative */}
                            {/* Card 1: Tours & Travels */}
                            {/* Card 1: Tours & Travels with PDF Integration */}
                            <div className="card travel-story-card">
                                {/* 🚀 Clicking this image or its text link now securely launches the itinerary PDF in a fresh tab */}
                                <a
                                    href="https://thesource.sa.ua.edu/wp-content/uploads/sites/57/2020/03/Sample-Travel-Itinerary-2.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-image-box"
                                >
                                    <img src="travel.png" alt="Tours and Travels" />
                                </a>
                                <div className="card-body">
                                    <h3 className="card-heading">Tours & Travels</h3>
                                    <p className="card-sub">
                                        Trace a 2,500km ancient Indian legacy passing through historic deltas, heritage trails, and local
                                        <a
                                            href="https://thesource.sa.ua.edu/wp-content/uploads/sites/57/2020/03/Sample-Travel-Itinerary-2.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="read-more-link"
                                            style={{ color: '#000000', fontWeight: '700', textDecoration: 'underline', marginLeft: '4px' }}
                                        >
                                            ...Read More ↗
                                        </a>
                                    </p>
                                </div>
                            </div>




                            {/* Card 2: Matrimonial Services */}
                            <div className="card">
                                <a href="https://nichayavedika.com" target="_blank" rel="noopener noreferrer" className="card-image-box">
                                    <img src="matrimony.png" alt="Matrimonial Services" />
                                </a>
                                <div className="card-body">
                                    <h3 className="card-heading">Matrimonial Services</h3>
                                    <p className="card-sub">
                                        Browse matching profiles within secure directory panels with smart filters.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Web Portal Creation */}
                            <div className="card">
                                <a href="https://nichayavedika/portals" target="_blank" rel="noopener noreferrer" className="card-image-box">
                                    <img src="webdesign.png" alt="Web design services" />
                                </a>
                                <div className="card-body">
                                    <h3 className="card-heading">Web Portal Creation</h3>
                                    <p className="card-sub">
                                        Engineered, high-performance, dynamic application portals with core architectures.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Operational Control with PDF Integration */}
                            <div className="card operational-control-card">
                                {/* 🚀 Clicking this gear banner launches your local public PDF in a brand-new browser window */}
                                <a
                                    href="/operational-guide.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-image-box operational-bg"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                                >
                                    <span className="gear-icon">⚙️</span>
                                </a>
                                <div className="card-body">
                                    <h3 className="card-heading">Operational Control</h3>
                                    <p className="card-sub" style={{ marginBottom: '12px' }}>
                                        Supervise cross-department workflows seamlessly with live triggers and framework manuals.
                                    </p>

                                    {/* Dedicated explicit text link pointing directly to the public PDF folder asset */}
                                    <a
                                        href="/operational-guide.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="operational-manual-link"
                                        style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: '#000000', textDecoration: 'underline', gap: '4px' }}
                                    >
                                        View Proposal Manual ↗
                                    </a>
                                </div>
                            </div>


                        </div> {/* End grid-left-zone */}

                        {/* RIGHT-HAND ZONE: 1x3 Stack Layout Grid (3 Cards) */}
                        <div className="grid-right-zone">

                            {/* Card 5: Live Market Data 
                            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* Black Scrolling Ticker Header */}
                                {/*<div className="card-image-box ticker-box">
                                    <div className="tradingview-widget-container">
                                        <div id="ticker-fallback">
                                            <marquee scrollamount="4">
                                                <strong>NIFTY 50:</strong> 24,013.10 <span style={{ color: '#ef4444' }}>▼ -0.64%</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <strong>SENSEX:</strong> 76,802.90 <span style={{ color: '#ef4444' }}>▼ -0.58%</span>
                                            </marquee>
                                        </div>
                                    </div>
                                </div>*/}

                                {/* The Restructured Rich Content Box */}
                                
                        {/*</div>*/}
                            <MarketDataCard />

                            {/* Card 6: Indian Political Live News Component */}
                            <div className="card text-only-card political-news-card">
                                <div className="card-body">
                                    <div className="news-header-flex">
                                        <h3 className="card-heading">Political Live Feed</h3>
                                        <span className="live-indicator">● LIVE</span>
                                    </div>

                                    <ul className="news-feed-list">
                                        <li>
                                            <a
                                                href="https://indianexpress.com/article/india/india-news-today-breaking-news-live-updates-18-june-2026-10745444/lite/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-link"
                                            >
                                                <span className="news-time">Update</span>
                                                <p className="news-text">Rajya Sabha voting begins across 24 crucial assembly seats spanning 10 states.</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.thehindu.com/news/top-news-of-the-day-june-17-2026/article71113586.ece"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-link"
                                            >
                                                <span className="news-time">Breaking</span>
                                                <p className="news-text">Centre’s temporary blocks on messaging tools challenged in High Court over paper leak row.</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://frontline.thehindu.com/politics/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-link"
                                            >
                                                <span className="news-time">Analysis</span>
                                                <p className="news-text">Political analysts debate structural reforms to Anti-Defection Law amid sudden party switches.</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            {/* Card 6: LIC Policies & Premium Itineraries Component */}
                            <div className="card text-only-card lic-itinerary-card">
                                <div className="card-body">
                                    

                                    <div className="lic-policy-divider"></div>

                                    <div className="lic-section">
                                        <span className="lic-section-title">New LIC Savings Plans (June 2026 Updates)</span>
                                        <ul className="lic-links-list">
                                            <li>
                                                <a
                                                    href="https://licindia.in/documents/d/guest/press-release-jeevan-sathi_26052026"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="lic-link-item"
                                                >
                                                    <div className="policy-meta">
                                                        <span className="policy-name">New Jeevan Sathi (Single Premium)</span>
                                                        <span className="policy-tag">Plan 888</span>
                                                    </div>
                                                    <p className="policy-desc">Joint life cover for spouses with guaranteed additions of ₹70 per ₹1000 sum assured annually.</p>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://licindia.in/documents/d/guest/press-release-jeevan-sathi_26052026"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="lic-link-item"
                                                >
                                                    <div className="policy-meta">
                                                        <span className="policy-name">New Jeevan Sathi (Limited Premium)</span>
                                                        <span className="policy-tag">Plan 889</span>
                                                    </div>
                                                    <p className="policy-desc">Joint savings protection plan offering 7% guaranteed additions on tabular annual premium with premium waivers.</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div> {/* End grid-right-zone */}

                    </div> {/* End bento-grid-main-layout */}
                </div> {/* End main-container */}
            </div> {/* End content-wrapper */}
        </div>
    );
}
