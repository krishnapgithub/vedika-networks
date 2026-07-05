import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const stripHtml = (value = "") =>
    value
        .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();

const getTagValue = (item: string, tag: string) => {
    const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));

    return match ? stripHtml(match[1]) : "";
};

const fallbackPoliticalNews = [
    {
        category: "INDIA POLITICS",
        text: "Latest India politics headlines are loading from live public news feeds.",
        link: "https://news.google.com/search?q=India%20politics&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
];

const fallbackMarketNews = [
    {
        category: "INDIA MARKETS",
        text: "Latest Indian stock market headlines are loading from live public news feeds.",
        link: "https://news.google.com/search?q=Indian%20stock%20market%20NSE%20BSE&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
];

const fallbackLicUpdates = [
    {
        category: "LIC UPDATE",
        text: "Latest LIC policy and plan updates are loading from live public news feeds.",
        link: "https://news.google.com/search?q=LIC%20India%20new%20policy%20plans&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
];

const marketSymbols = [
    { key: "nifty50", label: "NIFTY 50", exchange: "NSE", symbol: "^NSEI" },
    { key: "sensex", label: "SENSEX", exchange: "BSE", symbol: "^BSESN" },
    { key: "bank", label: "Nifty Bank", exchange: "NSE", symbol: "^NSEBANK" },
    { key: "it", label: "Nifty IT", exchange: "NSE", symbol: "^CNXIT" },
    { key: "pharma", label: "Nifty Pharma", exchange: "NSE", symbol: "^CNXPHARMA" },
    { key: "metal", label: "Nifty Metal", exchange: "NSE", symbol: "^CNXMETAL" },
];

const formatNumber = (value: number) =>
    value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const getYahooChartQuote = async (market: typeof marketSymbols[number]) => {
    const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(market.symbol)}?range=1d&interval=1m`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0 VedikaNetworks/1.0",
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`${market.label} returned ${response.status}`);
    }

    const data = await response.json() as any;
    const result = data?.chart?.result?.[0];
    const meta = result?.meta;
    const closes = result?.indicators?.quote?.[0]?.close || [];
    const lastClose = [...closes].reverse().find((value) => Number.isFinite(value));
    const price = meta?.regularMarketPrice || lastClose;
    const previousClose = meta?.chartPreviousClose || meta?.previousClose;

    if (!Number.isFinite(price)) {
        throw new Error(`No live value returned for ${market.label}`);
    }

    const changePercent = Number.isFinite(previousClose) && previousClose > 0
        ? ((price - previousClose) / previousClose) * 100
        : null;

    return {
        ...market,
        value: formatNumber(price),
        changePercent,
        status: "live",
    };
};

const getUsdInrRate = async () => {
    const primaryResponse = await fetch("https://open.er-api.com/v6/latest/USD");
    const primaryData = await primaryResponse.json() as any;

    if (primaryData?.rates?.INR) {
        return {
            rate: formatNumber(primaryData.rates.INR),
            updatedAt: primaryData.time_last_update_utc,
            source: "open.er-api.com",
            status: "live",
        };
    }

    const fallbackResponse = await fetch("https://api.frankfurter.app/latest?from=USD&to=INR");
    const fallbackData = await fallbackResponse.json() as any;

    if (fallbackData?.rates?.INR) {
        return {
            rate: formatNumber(fallbackData.rates.INR),
            updatedAt: fallbackData.date,
            source: "frankfurter.app",
            status: "live",
        };
    }

    throw new Error("USD/INR rate was not available.");
};

const fetchGoogleNewsItems = async (feedUrl: string, category: string, limit = 5) => {
    const response = await fetch(feedUrl, {
        headers: {
            "User-Agent": "VedikaNetworks/1.0",
        },
    });

    if (!response.ok) {
        throw new Error(`News feed returned ${response.status}`);
    }

    const xml = await response.text();

    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
        .slice(0, limit)
        .map((match) => {
            const item = match[1];

            return {
                category,
                text: getTagValue(item, "title"),
                link: getTagValue(item, "link"),
                publishedAt: getTagValue(item, "pubDate"),
                source: getTagValue(item, "source") || "Google News",
            };
        })
        .filter((item) => item.text && item.link);
};

/* ========================================================================== 
   1. Backend API Routes
   ========================================================================== */
app.get("/api/message", (c) => {
    return c.text("Hello Hono!");
});

app.get("/api/market-data", async (c) => {
    const [markets, usdInr] = await Promise.all([
        Promise.all(
            marketSymbols.map(async (market) => {
                try {
                    return await getYahooChartQuote(market);
                } catch (error) {
                    console.error(`Market feed failed for ${market.label}:`, error);

                    return {
                        ...market,
                        value: null,
                        changePercent: null,
                        status: "unavailable",
                    };
                }
            })
        ),
        getUsdInrRate().catch((error) => {
            console.error("USD/INR feed failed:", error);

            return {
                rate: null,
                updatedAt: "",
                source: "",
                status: "unavailable",
            };
        }),
    ]);

    return c.json({
        success: true,
        updatedAt: new Date().toISOString(),
        markets,
        usdInr,
    });
});

app.get("/api/political-news", async (c) => {
    const feedUrl = "https://news.google.com/rss/search?q=India%20politics%20OR%20election%20OR%20parliament&hl=en-IN&gl=IN&ceid=IN:en";

    try {
        const items = await fetchGoogleNewsItems(feedUrl, "INDIA POLITICS", 5);

        return c.json({
            success: true,
            updatedAt: new Date().toISOString(),
            items: items.length ? items : fallbackPoliticalNews,
        });
    } catch (error) {
        console.error("Political news feed failed:", error);

        return c.json({
            success: false,
            updatedAt: new Date().toISOString(),
            items: fallbackPoliticalNews,
        });
    }
});

app.get("/api/market-news", async (c) => {
    const feedUrl = "https://news.google.com/rss/search?q=Indian%20stock%20market%20OR%20NSE%20OR%20BSE%20OR%20Sensex%20OR%20Nifty&hl=en-IN&gl=IN&ceid=IN:en";

    try {
        const items = await fetchGoogleNewsItems(feedUrl, "INDIA MARKETS", 5);

        return c.json({
            success: true,
            updatedAt: new Date().toISOString(),
            items: items.length ? items : fallbackMarketNews,
        });
    } catch (error) {
        console.error("Market news feed failed:", error);

        return c.json({
            success: false,
            updatedAt: new Date().toISOString(),
            items: fallbackMarketNews,
        });
    }
});

app.get("/api/lic-updates", async (c) => {
    const feedUrl = "https://news.google.com/rss/search?q=LIC%20India%20new%20policy%20OR%20LIC%20new%20plan%20OR%20LIC%20press%20release&hl=en-IN&gl=IN&ceid=IN:en";

    try {
        const items = await fetchGoogleNewsItems(feedUrl, "LIC UPDATE", 5);

        return c.json({
            success: true,
            updatedAt: new Date().toISOString(),
            items: items.length ? items : fallbackLicUpdates,
        });
    } catch (error) {
        console.error("LIC updates feed failed:", error);

        return c.json({
            success: false,
            updatedAt: new Date().toISOString(),
            items: fallbackLicUpdates,
        });
    }
});

/* ========================================================================== 
   2. Fallback Route: Pass everything else straight to your React App
   ========================================================================== */
app.all("*", async (c) => {
    const url = new URL(c.req.url);

    if (!url.pathname.startsWith("/api")) {
        return await c.env.ASSETS.fetch(c.req.raw);
    }

    return c.json({ error: "API endpoint route not found" }, 404);
});

// 🚀 CRITICAL FOR D1 BINDINGS: Export using standard ES module syntax explicitly 
export default {
    fetch: (request: Request, env: CloudflareBindings, ctx: ExecutionContext) => {
        return app.fetch(request, env, ctx);
    }
};
