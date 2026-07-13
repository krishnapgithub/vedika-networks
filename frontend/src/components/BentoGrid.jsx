

import React, { useState, useEffect } from 'react';

const marketSymbols = [
    { key: 'nifty50', label: 'NIFTY 50', exchange: 'NSE', symbol: '^NSEI' },
    { key: 'sensex', label: 'SENSEX', exchange: 'BSE', symbol: '^BSESN' },
    { key: 'bank', label: 'Nifty Bank', exchange: 'NSE', symbol: '^NSEBANK' },
    { key: 'it', label: 'Nifty IT', exchange: 'NSE', symbol: '^CNXIT' },
    { key: 'pharma', label: 'Nifty Pharma', exchange: 'NSE', symbol: '^CNXPHARMA' },
    { key: 'metal', label: 'Nifty Metal', exchange: 'NSE', symbol: '^CNXMETAL' },
];

const initialMarketRows = marketSymbols.map((item) => ({
    ...item,
    value: null,
    changePercent: null,
    status: 'loading',
}));

const getMarketDirection = (changePercent) => {
    if (changePercent === null || changePercent === undefined) return 'flat';
    if (changePercent > 0) return 'gain';
    if (changePercent < 0) return 'loss';
    return 'flat';
};

const formatMarketChange = (changePercent) => {
    if (changePercent === null || changePercent === undefined) return 'pending';

    const sign = changePercent > 0 ? '+' : '';
    const arrow = changePercent > 0 ? '▲' : changePercent < 0 ? '▼' : '•';

    return `${sign}${changePercent.toFixed(2)}% ${arrow}`;
};

const fallbackMarketNews = [
    {
        category: 'INDIA MARKETS',
        text: 'Latest Indian stock market headlines are loading from live public news feeds.',
        link: 'https://news.google.com/search?q=Indian%20stock%20market%20NSE%20BSE&hl=en-IN&gl=IN&ceid=IN:en',
        publishedAt: new Date().toISOString(),
        source: 'Google News',
    },
];

// Place this right inside your main BentoGrid component code 
const MarketDataCard = () => {
    // 🚀 React State Variables to hold live floating values
    const [marketRows, setMarketRows] = useState(initialMarketRows);
    const [marketUpdatedAt, setMarketUpdatedAt] = useState('');
    const [usdInr, setUsdInr] = useState(null);
    const [rateUpdatedAt, setRateUpdatedAt] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [rateError, setRateError] = useState('');
    const [marketNews, setMarketNews] = useState(fallbackMarketNews);

    // 📡 Fetch live market and USD/INR data directly from public feeds
    useEffect(() => {
        async function fetchLiveMarketData() {
            try {
                setRateError('');
                const response = await fetch('/api/market-data');
                const data = await response.json();
                const markets = Array.isArray(data?.markets) ? data.markets : initialMarketRows;
                const fxData = data?.usdInr || {};

                setMarketRows(markets);
                setMarketUpdatedAt(new Date(data?.updatedAt || Date.now()).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                }));
                setUsdInr(fxData.rate);
                setRateUpdatedAt(fxData.updatedAt ? `Updated: ${fxData.updatedAt}` : fxData.source ? `Source: ${fxData.source}` : '');
                setRateError(fxData.status === 'unavailable' ? 'temporarily unavailable' : '');
                setIsLoading(false);
            } catch (error) {
                console.error('Could not fetch live market data:', error);
                setRateError('temporarily unavailable');
                setIsLoading(false);
            }
        }

        fetchLiveMarketData();

        const refreshTimer = window.setInterval(fetchLiveMarketData, 5 * 60 * 1000);

        return () => window.clearInterval(refreshTimer);
    }, []);

    useEffect(() => {
        async function fetchMarketNews() {
            try {
                const response = await fetch('/api/market-news');
                const data = await response.json();
                const items = Array.isArray(data?.items) && data.items.length > 0
                    ? data.items
                    : fallbackMarketNews;

                setMarketNews(items.slice(0, 2));
            } catch (error) {
                console.error('Could not fetch stock market news:', error);
                setMarketNews(fallbackMarketNews);
            }
        }

        fetchMarketNews();

        const refreshTimer = window.setInterval(fetchMarketNews, 10 * 60 * 1000);

        return () => window.clearInterval(refreshTimer);
    }, []);

    const tickerRows = marketRows.slice(0, 2);
    const sectorRows = marketRows.slice(2);

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Black Live Ticker Header */}
            <div className="card-image-box ticker-box">
                <div className="market-grid-container" style={{ height: '100%', justifyContent: 'center' }}>
                    {tickerRows.map((market) => {
                        const direction = getMarketDirection(market.changePercent);

                        return (
                            <div key={market.key} className="market-metric-row">
                                <div className="metric-identity">
                                    <span className="metric-symbol">{market.label}</span>
                                    <span className="metric-exchange">{market.exchange} live</span>
                                </div>
                                <div className="metric-figures">
                                    <span className="metric-price">{market.value || (market.status === 'unavailable' ? 'retrying' : 'loading...')}</span>
                                    <span className={`metric-percent ${direction}`}>
                                        {market.status === 'unavailable' ? 'feed unavailable' : formatMarketChange(market.changePercent)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div className="metric-divider-line" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.68rem', fontWeight: 600 }}>
                        <span>Public live market feed</span>
                        <span>{marketUpdatedAt ? `Refreshed ${marketUpdatedAt}` : 'Fetching...'}</span>
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

                {/* Row 2: Live Sector Performance Grid */}
                <div className="market-sector-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    {sectorRows.map((market) => {
                        const direction = getMarketDirection(market.changePercent);
                        const color = direction === 'gain' ? '#22c55e' : direction === 'loss' ? '#ef4444' : '#64748b';

                        return (
                            <div key={market.key} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '0.75rem' }}>
                                <span style={{ color: '#64748b' }}>{market.label}</span>
                                <span style={{ fontWeight: '600', color, textAlign: 'right' }}>
                                    {market.status === 'unavailable' ? 'retrying' : formatMarketChange(market.changePercent)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="market-news-strip">
                    {marketNews.map((item, index) => (
                        <a
                            key={`${item.link}-${index}`}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="market-news-link"
                        >
                            {item.text}
                        </a>
                    ))}
                </div>

                {/* Row 3: Live Market Status Indicators (Featuring our DYNAMIC floating values) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#475569', background: '#eff6ff', padding: '8px 12px', borderRadius: '6px' }}>
                    <div>📊 <span style={{ fontWeight: '600' }}>Markets:</span> {marketUpdatedAt ? `Live ${marketUpdatedAt}` : 'loading...'}</div>

                    {/* 🚀 The data floats dynamically here! */}
                    <div>
                        💵 <span style={{ fontWeight: '600' }}>USD/INR:</span> {isLoading ? (
                            <span style={{ color: '#64748b', fontStyle: 'italic' }}>loading...</span>
                        ) : rateError ? (
                            <span style={{ color: '#ef4444', fontWeight: '600' }}>{rateError}</span>
                        ) : (
                            <span style={{ fontWeight: '700', color: '#1e3a8a' }}>₹{usdInr}</span>
                        )}
                    </div>
                </div>

                {rateUpdatedAt && (
                    <div style={{ marginTop: '-10px', fontSize: '0.66rem', color: '#64748b', textAlign: 'right' }}>
                        USD/INR {rateUpdatedAt}
                    </div>
                )}

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

const fallbackPoliticalNews = [
    {
        category: 'INDIA POLITICS',
        text: 'Latest India politics headlines are loading from live public news feeds.',
        link: 'https://news.google.com/search?q=India%20politics&hl=en-IN&gl=IN&ceid=IN:en',
        publishedAt: new Date().toISOString(),
        source: 'Google News',
    },
];

const formatNewsTime = (value) => {
    const date = value ? new Date(value) : null;

    if (!date || Number.isNaN(date.getTime())) return 'Live update';

    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const PoliticalNewsCard = () => {
    const [newsItems, setNewsItems] = useState(fallbackPoliticalNews);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPoliticalNews() {
            try {
                const response = await fetch('/api/political-news');
                const data = await response.json();
                const items = Array.isArray(data?.items) && data.items.length > 0
                    ? data.items
                    : fallbackPoliticalNews;

                setNewsItems(items.slice(0, 4));
                setUpdatedAt(data?.updatedAt || new Date().toISOString());
            } catch (error) {
                console.error('Could not fetch live political news:', error);
                setNewsItems(fallbackPoliticalNews);
                setUpdatedAt(new Date().toISOString());
            } finally {
                setIsLoading(false);
            }
        }

        fetchPoliticalNews();

        const refreshTimer = window.setInterval(fetchPoliticalNews, 10 * 60 * 1000);

        return () => window.clearInterval(refreshTimer);
    }, []);

    return (
        <div className="card text-only-card political-news-card">
            <div className="card-body">
                <div className="news-header-flex">
                    <div>
                        <h3 className="card-heading">Political Live Feed</h3>
                        <span className="news-source-line">
                            {isLoading ? 'Fetching live headlines...' : `Updated ${formatNewsTime(updatedAt)}`}
                        </span>
                    </div>
                    <span className="live-indicator">● LIVE</span>
                </div>

                <ul className="news-feed-list">
                    {newsItems.map((item, index) => (
                        <li key={`${item.link}-${index}`}>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-link"
                            >
                                <span className="news-time">
                                    {item.source || item.category || 'Politics'} · {formatNewsTime(item.publishedAt)}
                                </span>
                                <p className="news-text">{item.text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const fallbackLicUpdates = [
    {
        category: 'LIC UPDATE',
        text: 'Latest LIC policy and plan updates are loading from live public news feeds.',
        link: 'https://news.google.com/search?q=LIC%20India%20new%20policy%20plans&hl=en-IN&gl=IN&ceid=IN:en',
        publishedAt: new Date().toISOString(),
        source: 'Google News',
    },
];

const getLicPolicyTag = (text = '', index) => {
    const planMatch = text.match(/plan\s*(?:no\.?|number)?\s*[-:]?\s*(\d+)/i);

    return planMatch ? `Plan ${planMatch[1]}` : index === 0 ? 'Latest' : 'Update';
};

const LICUpdatesCard = () => {
    const [licUpdates, setLicUpdates] = useState(fallbackLicUpdates);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLicUpdates() {
            try {
                const response = await fetch('/api/lic-updates');
                const data = await response.json();
                const items = Array.isArray(data?.items) && data.items.length > 0
                    ? data.items
                    : fallbackLicUpdates;

                setLicUpdates(items.slice(0, 3));
                setUpdatedAt(data?.updatedAt || new Date().toISOString());
            } catch (error) {
                console.error('Could not fetch LIC updates:', error);
                setLicUpdates(fallbackLicUpdates);
                setUpdatedAt(new Date().toISOString());
            } finally {
                setIsLoading(false);
            }
        }

        fetchLicUpdates();

        const refreshTimer = window.setInterval(fetchLicUpdates, 10 * 60 * 1000);

        return () => window.clearInterval(refreshTimer);
    }, []);

    return (
        <div className="card text-only-card lic-itinerary-card">
            <div className="card-body">
                <div className="news-header-flex">
                    <div>
                        <h3 className="card-heading">LIC Policy Updates</h3>
                        <span className="news-source-line">
                            {isLoading ? 'Fetching LIC updates...' : `Updated ${formatNewsTime(updatedAt)}`}
                        </span>
                    </div>
                    <span className="lic-badge">LIVE</span>
                </div>

                <div className="lic-policy-divider"></div>

                <div className="lic-section">
                    <span className="lic-section-title">Latest LIC Plans & News</span>
                    <ul className="lic-links-list">
                        {licUpdates.map((item, index) => (
                            <li key={`${item.link}-${index}`}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lic-link-item"
                                >
                                    <div className="policy-meta">
                                        <span className="policy-name">{item.text}</span>
                                        <span className="policy-tag">{getLicPolicyTag(item.text, index)}</span>
                                    </div>
                                    <p className="policy-desc">
                                        {item.source || item.category || 'LIC'} · {formatNewsTime(item.publishedAt)}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const initialTravelPlan = {
    travelerName: '',
    contactNumber: '',
    email: '',
    destination: '',
    originCity: '',
    startDate: '',
    endDate: '',
    travelers: '2',
    travelStyle: 'Heritage and leisure',
    budget: '',
    hotelPreference: 'Comfort hotel',
    transportPreference: 'Private cab',
    specialRequests: '',
};

const travelPlanFields = [
    { name: 'travelerName', label: 'Traveler name', type: 'text', required: true },
    { name: 'contactNumber', label: 'Contact number', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'originCity', label: 'Starting city', type: 'text', required: true },
    { name: 'destination', label: 'Destination', type: 'text', required: true },
    { name: 'startDate', label: 'Start date', type: 'date', required: true },
    { name: 'endDate', label: 'End date', type: 'date', required: true },
    { name: 'travelers', label: 'Travelers', type: 'number', required: true, min: '1' },
    { name: 'budget', label: 'Budget range', type: 'text', required: true },
];

const formatTravelDate = (value) => {
    const date = value ? new Date(`${value}T00:00:00`) : null;

    if (!date || Number.isNaN(date.getTime())) return 'To be confirmed';

    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const getTripDays = (startDate, endDate) => {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T00:00:00`) : null;

    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;

    return Math.max(1, Math.round((end - start) / 86400000) + 1);
};

const buildItineraryPreview = (plan) => {
    const days = getTripDays(plan.startDate, plan.endDate);
    const destination = plan.destination || 'your selected destination';

    return [
        {
            day: 'Day 1',
            title: `Arrival from ${plan.originCity || 'starting city'}`,
            detail: `Meet-and-assist pickup, hotel check-in, and a relaxed evening introduction to ${destination}.`,
        },
        {
            day: 'Day 2',
            title: 'Heritage and local discovery',
            detail: `Guided cultural route inspired by the Tours & Travels reference itinerary, with local food stops and photo points.`,
        },
        {
            day: days > 3 ? 'Day 3' : 'Final Day',
            title: days > 3 ? 'Scenic excursion' : 'Checkout and return',
            detail: days > 3
                ? 'Comfortable day excursion with transport, sightseeing windows, and flexible rest breaks.'
                : 'Breakfast, checkout support, and return transfer as per the selected transport preference.',
        },
        ...(days > 3 ? [{
            day: `Day ${days}`,
            title: 'Return transfer',
            detail: 'Final breakfast, checkout, luggage assistance, and return journey coordination.',
        }] : []),
    ];
};

const TravelPlanModal = ({ isOpen, onClose }) => {
    const [plan, setPlan] = useState(initialTravelPlan);
    const [showPreview, setShowPreview] = useState(false);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPlan((currentPlan) => ({
            ...currentPlan,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowPreview(true);
    };

    const handleReset = () => {
        setPlan(initialTravelPlan);
        setShowPreview(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const itineraryPreview = buildItineraryPreview(plan);
    const tripDays = getTripDays(plan.startDate, plan.endDate);

    return (
        <div className="travel-modal-shell" role="dialog" aria-modal="true" aria-labelledby="travel-plan-title">
            <div className="travel-modal-panel">
                <div className="travel-modal-header no-print">
                    <div>
                        <span className="travel-modal-kicker">Tours & Travels</span>
                        <h2 id="travel-plan-title">Travel Plan Form</h2>
                    </div>
                    <button type="button" className="travel-icon-button" onClick={onClose} aria-label="Close travel plan form">
                        X
                    </button>
                </div>

                <div className="travel-modal-content">
                    <form className="travel-plan-form no-print" onSubmit={handleSubmit}>
                        <div className="travel-form-grid">
                            {travelPlanFields.map((field) => (
                                <label key={field.name} className="travel-field">
                                    <span>{field.label}{field.required ? ' *' : ''}</span>
                                    <input
                                        name={field.name}
                                        type={field.type}
                                        value={plan[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                        min={field.min}
                                    />
                                </label>
                            ))}

                            <label className="travel-field">
                                <span>Travel style</span>
                                <select name="travelStyle" value={plan.travelStyle} onChange={handleChange}>
                                    <option>Heritage and leisure</option>
                                    <option>Family vacation</option>
                                    <option>Pilgrimage tour</option>
                                    <option>Business plus leisure</option>
                                    <option>Honeymoon trip</option>
                                </select>
                            </label>

                            <label className="travel-field">
                                <span>Hotel preference</span>
                                <select name="hotelPreference" value={plan.hotelPreference} onChange={handleChange}>
                                    <option>Comfort hotel</option>
                                    <option>Premium hotel</option>
                                    <option>Luxury resort</option>
                                    <option>Budget stay</option>
                                </select>
                            </label>

                            <label className="travel-field">
                                <span>Transport preference</span>
                                <select name="transportPreference" value={plan.transportPreference} onChange={handleChange}>
                                    <option>Private cab</option>
                                    <option>Tempo traveller</option>
                                    <option>Flight plus cab</option>
                                    <option>Train plus local cab</option>
                                </select>
                            </label>

                            <label className="travel-field travel-field-wide">
                                <span>Special requests</span>
                                <textarea
                                    name="specialRequests"
                                    value={plan.specialRequests}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Meal preference, senior citizen support, temple visits, accessibility, pickup timing..."
                                />
                            </label>
                        </div>

                        <div className="travel-form-actions">
                            <button type="submit" className="travel-primary-button">Preview Plan</button>
                            <button type="button" className="travel-secondary-button" onClick={handleReset}>Clear</button>
                            <a
                                href="https://thesource.sa.ua.edu/wp-content/uploads/sites/57/2020/03/Sample-Travel-Itinerary-2.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="travel-reference-link"
                            >
                                Reference itinerary
                            </a>
                        </div>
                    </form>

                    {showPreview && (
                        <section className="travel-preview" aria-live="polite">
                            <div className="travel-preview-toolbar no-print">
                                <span>Preview ready</span>
                                <button type="button" className="travel-primary-button" onClick={handlePrint}>Print / Save PDF</button>
                            </div>

                            <div className="travel-print-sheet">
                                <div className="travel-print-header">
                                    <div>
                                        <span className="travel-print-brand">Vedika Networks</span>
                                        <h2>{plan.destination} Travel Plan</h2>
                                        <p>{plan.travelStyle} itinerary proposal</p>
                                    </div>
                                    <div className="travel-print-summary">
                                        <span>{tripDays} day trip</span>
                                        <span>{formatTravelDate(plan.startDate)} - {formatTravelDate(plan.endDate)}</span>
                                    </div>
                                </div>

                                <div className="travel-summary-grid">
                                    <div><span>Traveler</span><strong>{plan.travelerName}</strong></div>
                                    <div><span>Contact</span><strong>{plan.contactNumber}</strong></div>
                                    <div><span>Email</span><strong>{plan.email}</strong></div>
                                    <div><span>Route</span><strong>{plan.originCity} to {plan.destination}</strong></div>
                                    <div><span>Travelers</span><strong>{plan.travelers}</strong></div>
                                    <div><span>Budget</span><strong>{plan.budget}</strong></div>
                                    <div><span>Stay</span><strong>{plan.hotelPreference}</strong></div>
                                    <div><span>Transport</span><strong>{plan.transportPreference}</strong></div>
                                </div>

                                <div className="travel-itinerary-list">
                                    <h3>Suggested Itinerary</h3>
                                    {itineraryPreview.map((item) => (
                                        <div key={`${item.day}-${item.title}`} className="travel-itinerary-item">
                                            <span>{item.day}</span>
                                            <div>
                                                <strong>{item.title}</strong>
                                                <p>{item.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="travel-notes-box">
                                    <h3>Traveler Notes</h3>
                                    <p>{plan.specialRequests || 'No special requests added. Final inclusions, exclusions, room category, vehicle type, and payment schedule can be confirmed by the travel desk.'}</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

const defaultProposalTemplate = {
    brand: 'Vedika Networks Travel Desk',
    destination: 'Vietnam',
    packageTitle: 'Vietnam Tour Package',
    duration: '5 nights / 6 days',
    groupSize: 'Group of 5 pax',
    packageType: 'Flights + land package',
    summary: 'Hanoi, Halong Bay, Danang, Hoi An, Bana Hills, and Golden Bridge in a ready-to-share travel proposal.',
    flightCost: 'Rs. 77,950',
    landCost: 'Rs. 45,950',
    totalCost: 'Rs. 1,23,900',
    costNote: 'Per head including flight and land package.',
    hotels: 'Hanoi: La Dolce Vita, Halais, Moon View, First Eden or similar\nHalong: Hera Luxury Day Cruise\nDanang: Anfada, Palazzo, Vivian, Lavencos, Greenery or similar',
    flights: [
        { flightNo: 'VN-984', from: 'HYD', to: 'Hanoi', startTime: '5 July 23:30', reachTime: '6 July 05:25' },
        { flightNo: 'VJ-531', from: 'Hanoi', to: 'Danang', startTime: '9 July 06:30', reachTime: '9 July 07:50' },
        { flightNo: 'AK-641', from: 'Danang', to: 'Kuala Lumpur', startTime: '11 July 16:05', reachTime: '11 July 19:55' },
        { flightNo: 'AK-69', from: 'Kuala Lumpur', to: 'HYD', startTime: '11 July 21:25', reachTime: '11 July 23:55' },
        ...Array.from({ length: 6 }, () => ({ flightNo: '', from: '', to: '', startTime: '', reachTime: '' })),
    ],
    inclusions: 'Accommodation on twin, double, or triple sharing basis\nMeals as mentioned in the itinerary\nEntrance fees and sightseeing as mentioned\nAir-conditioned vehicle transfers\nWater bottles during tours\nEnglish-speaking guide as mentioned\nTravel insurance',
    exclusions: 'Visa charges\nPersonal expenses\nAny service not listed under inclusions',
    terms: '30 days prior: no charge. 29-21 days: 50%. 20-15 days: 75%. Less than 15 days: 100%. All cancellations must be made in writing.',
    itineraryDays: [
        { title: 'Hanoi Arrival - Half Day City Tour', meals: 'No meals', stay: 'Overnight in Hanoi', details: 'Airport pickup; Ba Dinh Square photo stop; Temple of Literature; Hoan Kiem Lake; Old Quarter cyclo ride; Train Street visit' },
        { title: 'Hanoi - Hoa Lu - Tam Coc - Hanoi', meals: 'Breakfast', stay: 'Overnight in Hanoi', details: 'Ninh Binh day tour; Hoa Lu ancient capital; Tam Coc bamboo boat ride; village cycling; Mua Cave viewpoint' },
        { title: 'Hanoi - Halong Bay - Hanoi', meals: 'Breakfast, Lunch', stay: 'Overnight in Hanoi', details: 'Hera Cruise; seafood buffet lunch; Lan Ha Bay kayaking; swimming; cooking class; sunset party' },
        { title: 'Hanoi - Danang - Coconut Village - Hoi An', meals: 'Breakfast', stay: 'Overnight in Danang', details: 'Domestic flight; Cam Thanh Coconut Jungle; basket boat experience; Hoi An Ancient Town; Hoai River lantern ride' },
        { title: 'Da Nang - Bana Hills and Golden Bridge - Danang', meals: 'Breakfast, Lunch', stay: 'Overnight in Danang', details: 'Ba Na Hills cable car; Linh Ung Pagoda; Golden Bridge; Fantasy Park; Han Market shopping' },
        { title: 'Danang Departure', meals: 'Breakfast', stay: 'Departure transfer', details: 'Free time until checkout; private airport transfer' },
        ...Array.from({ length: 4 }, () => ({ title: '', meals: '', stay: '', details: '' })),
    ],
};

const splitProposalLines = (value) =>
    value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

const parseProposalItinerary = (days = []) =>
    days
        .map((item, index) => ({
            day: `Day ${String(index + 1).padStart(2, '0')}`,
            title: item.title?.trim() || '',
            meals: item.meals?.trim() || 'Meals as mentioned',
            stay: item.stay?.trim() || 'Stay as mentioned',
            points: item.details
                ? item.details.split(';').map((point) => point.trim()).filter(Boolean)
                : [],
        }))
        .filter((item) => item.title || item.points.length > 0);

const formatFlightRows = (flights = []) =>
    flights
        .map((flight) => {
            const flightNo = flight.flightNo?.trim();
            const from = flight.from?.trim();
            const to = flight.to?.trim();
            const startTime = flight.startTime?.trim();
            const reachTime = flight.reachTime?.trim();

            if (!flightNo && !from && !to && !startTime && !reachTime) return '';

            return `${flightNo ? `${flightNo}: ` : ''}${from || 'From'} to ${to || 'To'}${startTime || reachTime ? `, ${startTime || 'Start time'} - ${reachTime || 'Reach time'}` : ''}`;
        })
        .filter(Boolean);

const ProposalPreview = ({ proposal }) => {
    const itineraryDays = parseProposalItinerary(proposal.itineraryDays);
    const flights = formatFlightRows(proposal.flights);
    const hotels = splitProposalLines(proposal.hotels);
    const inclusions = splitProposalLines(proposal.inclusions);
    const exclusions = splitProposalLines(proposal.exclusions);

    return (
        <div className="proposal-screen">
            <section className="proposal-hero">
                <div className="proposal-hero-media">
                    <img src="vedika-india-banner.png" alt="Indian destinations banner for Vedika Travels & Tours" />
                    <div className="proposal-hero-logo" aria-label="Vedika Travels & Tours">
                        <strong>Vedika</strong>
                        <span>Travels &amp; Tours</span>
                    </div>
                </div>
                <div className="proposal-hero-copy">
                    <span className="proposal-brand">{proposal.brand}</span>
                    <h1>{proposal.packageTitle || `${proposal.destination} Tour Package`}</h1>
                    <p>{proposal.summary}</p>
                    <div className="proposal-quick-facts">
                        <span>{proposal.duration}</span>
                        <span>{proposal.groupSize}</span>
                        <span>{proposal.packageType}</span>
                    </div>
                </div>
            </section>

            <section className="proposal-section proposal-cost-grid">
                <div>
                    <span className="proposal-label">Flight Cost</span>
                    <strong>{proposal.flightCost}</strong>
                    <p>Per head, if flight is included.</p>
                </div>
                <div>
                    <span className="proposal-label">Land Package</span>
                    <strong>{proposal.landCost}</strong>
                    <p>Hotels, transfers, sightseeing, and listed services.</p>
                </div>
                <div>
                    <span className="proposal-label">Total Cost</span>
                    <strong>{proposal.totalCost}</strong>
                    <p>{proposal.costNote}</p>
                </div>
            </section>

            <section className="proposal-section">
                <div className="proposal-section-heading">
                    <span>Day Wise Plan</span>
                    <h2>Tour Itinerary</h2>
                </div>
                <div className="proposal-day-list">
                    {itineraryDays.map((item) => (
                        <article key={`${item.day}-${item.title}`} className="proposal-day-card">
                            <div className="proposal-day-meta">
                                <span>{item.day}</span>
                                <small>{item.meals}</small>
                            </div>
                            <div>
                                <h3>{item.title}</h3>
                                <ul>
                                    {item.points.map((point) => <li key={point}>{point}</li>)}
                                </ul>
                                <p>{item.stay}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="proposal-section proposal-two-column">
                <div>
                    <div className="proposal-section-heading">
                        <span>Flight Details</span>
                        <h2>Route Summary</h2>
                    </div>
                    <ul className="proposal-info-list">
                        {flights.map((flight) => <li key={flight}>{flight}</li>)}
                    </ul>
                </div>
                <div>
                    <div className="proposal-section-heading">
                        <span>Hotel Options</span>
                        <h2>Stay References</h2>
                    </div>
                    <ul className="proposal-info-list">
                        {hotels.map((hotel) => <li key={hotel}>{hotel}</li>)}
                    </ul>
                </div>
            </section>

            <section className="proposal-section proposal-two-column">
                <div>
                    <div className="proposal-section-heading">
                        <span>Included</span>
                        <h2>Package Includes</h2>
                    </div>
                    <ul className="proposal-info-list">
                        {inclusions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <div className="proposal-section-heading">
                        <span>Not Included</span>
                        <h2>Exclusions & Terms</h2>
                    </div>
                    <ul className="proposal-info-list">
                        {exclusions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="proposal-terms-box">
                        <strong>Cancellation / Terms</strong>
                        <p>{proposal.terms}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProposalTemplateModal = ({ isOpen, onClose }) => {
    const [proposal, setProposal] = useState(defaultProposalTemplate);
    const [showPreview, setShowPreview] = useState(false);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProposal((currentProposal) => ({
            ...currentProposal,
            [name]: value,
        }));
    };

    const handleItineraryDayChange = (index, field, value) => {
        setProposal((currentProposal) => ({
            ...currentProposal,
            itineraryDays: currentProposal.itineraryDays.map((day, dayIndex) =>
                dayIndex === index ? { ...day, [field]: value } : day
            ),
        }));
    };

    const handleFlightChange = (index, field, value) => {
        setProposal((currentProposal) => ({
            ...currentProposal,
            flights: currentProposal.flights.map((flight, flightIndex) =>
                flightIndex === index ? { ...flight, [field]: value } : flight
            ),
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowPreview(true);
    };

    return (
        <div className="travel-modal-shell" role="dialog" aria-modal="true" aria-labelledby="proposal-template-title">
            <div className="travel-modal-panel proposal-modal-panel">
                <div className={`travel-modal-header no-print${showPreview ? ' proposal-preview-header' : ''}`}>
                    <div>
                        <span className="travel-modal-kicker">Travel Proposal Template</span>
                        <h2 id="proposal-template-title">{showPreview ? 'Final Proposal Preview' : 'Create Travel Proposal'}</h2>
                    </div>
                    <div className="proposal-header-actions">
                        {showPreview && (
                            <>
                                <button type="button" className="travel-secondary-button" onClick={() => setShowPreview(false)}>Edit</button>
                                <button type="button" className="travel-primary-button" onClick={() => window.print()}>Print / Save PDF</button>
                            </>
                        )}
                        <button type="button" className="travel-icon-button" onClick={onClose} aria-label="Close proposal template">X</button>
                    </div>
                </div>

                {showPreview ? (
                    <ProposalPreview proposal={proposal} />
                ) : (
                    <form className="proposal-builder-form no-print" onSubmit={handleSubmit}>
                        <div className="travel-form-actions proposal-form-actions-top">
                            <button type="submit" className="travel-primary-button">Final Preview</button>
                            <button type="button" className="travel-secondary-button" onClick={() => setProposal(defaultProposalTemplate)}>Reset Sample</button>
                        </div>

                        <div className="proposal-builder-grid">
                            <label><span>Brand / company</span><input name="brand" value={proposal.brand} onChange={handleChange} required /></label>
                            <label><span>Country / place</span><input name="destination" value={proposal.destination} onChange={handleChange} required /></label>
                            <label><span>Proposal title</span><input name="packageTitle" value={proposal.packageTitle} onChange={handleChange} required /></label>
                            <label><span>Duration</span><input name="duration" value={proposal.duration} onChange={handleChange} required /></label>
                            <label><span>Group size</span><input name="groupSize" value={proposal.groupSize} onChange={handleChange} /></label>
                            <label><span>Package type</span><input name="packageType" value={proposal.packageType} onChange={handleChange} /></label>
                            <label><span>Flight cost</span><input name="flightCost" value={proposal.flightCost} onChange={handleChange} /></label>
                            <label><span>Land package cost</span><input name="landCost" value={proposal.landCost} onChange={handleChange} /></label>
                            <label><span>Total cost</span><input name="totalCost" value={proposal.totalCost} onChange={handleChange} /></label>
                            <label className="proposal-field-wide"><span>Cost note</span><input name="costNote" value={proposal.costNote} onChange={handleChange} /></label>
                            <label className="proposal-field-wide"><span>Short proposal summary</span><textarea name="summary" value={proposal.summary} onChange={handleChange} rows="3" required /></label>

                            <div className="proposal-field-wide proposal-repeat-section">
                                <div className="proposal-repeat-heading">
                                    <span>Day-wise itinerary</span>
                                    <small>Fill up to 10 days. Empty days will not show in preview.</small>
                                </div>
                                <div className="proposal-day-input-list">
                                    {proposal.itineraryDays.map((day, index) => (
                                        <div key={`proposal-day-${index + 1}`} className="proposal-day-input-card">
                                            <strong>Day {String(index + 1).padStart(2, '0')}</strong>
                                            <input
                                                value={day.title}
                                                onChange={(event) => handleItineraryDayChange(index, 'title', event.target.value)}
                                                placeholder="Day title / route"
                                            />
                                            <input
                                                value={day.meals}
                                                onChange={(event) => handleItineraryDayChange(index, 'meals', event.target.value)}
                                                placeholder="Meals"
                                            />
                                            <input
                                                value={day.stay}
                                                onChange={(event) => handleItineraryDayChange(index, 'stay', event.target.value)}
                                                placeholder="Stay / overnight"
                                            />
                                            <textarea
                                                value={day.details}
                                                onChange={(event) => handleItineraryDayChange(index, 'details', event.target.value)}
                                                rows="2"
                                                placeholder="Sightseeing and activity points, separated with semicolons"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="proposal-field-wide proposal-repeat-section">
                                <div className="proposal-repeat-heading">
                                    <span>Flight details</span>
                                    <small>Add up to 10 flight sectors. Empty rows will not show in preview.</small>
                                </div>
                                <div className="proposal-flight-input-list">
                                    {proposal.flights.map((flight, index) => (
                                        <div key={`proposal-flight-${index + 1}`} className="proposal-flight-input-row">
                                            <strong>{index + 1}</strong>
                                            <input
                                                value={flight.flightNo}
                                                onChange={(event) => handleFlightChange(index, 'flightNo', event.target.value)}
                                                placeholder="Flight no."
                                            />
                                            <input
                                                value={flight.from}
                                                onChange={(event) => handleFlightChange(index, 'from', event.target.value)}
                                                placeholder="From"
                                            />
                                            <input
                                                value={flight.to}
                                                onChange={(event) => handleFlightChange(index, 'to', event.target.value)}
                                                placeholder="To"
                                            />
                                            <input
                                                value={flight.startTime}
                                                onChange={(event) => handleFlightChange(index, 'startTime', event.target.value)}
                                                placeholder="Start time"
                                            />
                                            <input
                                                value={flight.reachTime}
                                                onChange={(event) => handleFlightChange(index, 'reachTime', event.target.value)}
                                                placeholder="Reach time"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <label className="proposal-field-wide"><span>Hotel / stay references</span><textarea name="hotels" value={proposal.hotels} onChange={handleChange} rows="4" /></label>
                            <label className="proposal-field-wide"><span>Inclusions</span><textarea name="inclusions" value={proposal.inclusions} onChange={handleChange} rows="5" /></label>
                            <label className="proposal-field-wide"><span>Exclusions</span><textarea name="exclusions" value={proposal.exclusions} onChange={handleChange} rows="4" /></label>
                            <label className="proposal-field-wide"><span>Cancellation / terms</span><textarea name="terms" value={proposal.terms} onChange={handleChange} rows="4" /></label>
                        </div>

                        <div className="travel-form-actions">
                            <button type="submit" className="travel-primary-button">Final Preview</button>
                            <button type="button" className="travel-secondary-button" onClick={() => setProposal(defaultProposalTemplate)}>Reset Sample</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};


export default function BentoGrid() {
    const [isTravelPlannerOpen, setIsTravelPlannerOpen] = useState(false);
    const [isProposalTemplateOpen, setIsProposalTemplateOpen] = useState(false);

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
                                    <button
                                        type="button"
                                        className="travel-card-action travel-card-action-secondary"
                                        onClick={() => setIsProposalTemplateOpen(true)}
                                    >
                                        Create Proposal PDF
                                    </button>
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
                            <PoliticalNewsCard />


                            {/* Card 7: Dynamic LIC Policies & Updates Component */}
                            <LICUpdatesCard />


                        </div> {/* End grid-right-zone */}

                    </div> {/* End bento-grid-main-layout */}
                </div> {/* End main-container */}
            </div> {/* End content-wrapper */}
            <TravelPlanModal isOpen={isTravelPlannerOpen} onClose={() => setIsTravelPlannerOpen(false)} />
            <ProposalTemplateModal isOpen={isProposalTemplateOpen} onClose={() => setIsProposalTemplateOpen(false)} />
        </div>
    );
}
