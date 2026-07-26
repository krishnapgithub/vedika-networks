import { Hono } from "hono";

type AppBindings = CloudflareBindings & {
    ASSETS: Fetcher;
    TMDB_ACCESS_TOKEN: string;
};

interface TmdbMovie {
    id: number;
    title?: string;
    original_title?: string;
    vote_average?: number;
    poster_path?: string | null;
    backdrop_path?: string | null;
    release_date?: string;
    overview?: string;
}

interface TmdbTrendingResponse {
    results?: TmdbMovie[];
}

const app = new Hono<{ Bindings: AppBindings }>();

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
        text: "India political headlines are being refreshed from public news feeds.",
        link: "https://news.google.com/search?q=India%20politics&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
    {
        category: "INDIA POLITICS",
        text: "Election, parliament, and policy updates are available through the live tracker.",
        link: "https://news.google.com/search?q=India%20election%20parliament%20policy&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Public News",
    },
    {
        category: "INDIA POLITICS",
        text: "Regional government and public policy developments are monitored for quick reference.",
        link: "https://news.google.com/search?q=India%20government%20state%20politics&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Public News",
    },
];

const fallbackMarketNews = [
    {
        category: "INDIA MARKETS",
        text: "Indian stock market headlines are being refreshed from public market news feeds.",
        link: "https://news.google.com/search?q=Indian%20stock%20market%20NSE%20BSE&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
    {
        category: "INDIA MARKETS",
        text: "Nifty, Sensex, banking, IT, pharma, and metal sector updates are tracked for quick view.",
        link: "https://news.google.com/search?q=Nifty%20Sensex%20sector%20updates&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Market Tracker",
    },
    {
        category: "INDIA MARKETS",
        text: "Market movement, rupee updates, and business headlines are available through public trackers.",
        link: "https://news.google.com/search?q=India%20market%20rupee%20business%20headlines&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Market Tracker",
    },
];

const fallbackLicUpdates = [
    {
        category: "LIC UPDATE",
        text: "LIC policy and plan headlines are being refreshed from public news feeds.",
        link: "https://news.google.com/search?q=LIC%20India%20new%20policy%20plans&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "Google News",
    },
    {
        category: "LIC UPDATE",
        text: "LIC insurance plans, policy servicing, and customer update headlines are tracked here.",
        link: "https://news.google.com/search?q=LIC%20insurance%20plans%20policy%20servicing&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "LIC Tracker",
    },
    {
        category: "LIC UPDATE",
        text: "Public updates on LIC products, financial results, and service announcements are monitored.",
        link: "https://news.google.com/search?q=LIC%20products%20financial%20results%20service%20announcements&hl=en-IN&gl=IN&ceid=IN:en",
        publishedAt: new Date().toISOString(),
        source: "LIC Tracker",
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

const getTrendingMovies = async (env: AppBindings): Promise<Response> => {
    if (!env.TMDB_ACCESS_TOKEN) {
        return Response.json(
            {
                success: false,
                message: "TMDB_ACCESS_TOKEN is not configured",
            },
            { status: 500 }
        );
    }

    const today = new Date().toISOString().slice(0, 10);

const tmdbUrl = new URL(
    "https://api.themoviedb.org/3/discover/movie"
);

tmdbUrl.searchParams.set("region", "IN");
tmdbUrl.searchParams.set("with_original_language", "te");
tmdbUrl.searchParams.set("with_release_type", "2|3");
tmdbUrl.searchParams.set("release_date.lte", today);
tmdbUrl.searchParams.set("sort_by", "release_date.desc");
tmdbUrl.searchParams.set("include_adult", "false");
tmdbUrl.searchParams.set("language", "te-IN");
tmdbUrl.searchParams.set("page", "1");

    try {
        const response = await fetch(tmdbUrl.toString(), {
    headers: {
        Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
    },
});

        if (!response.ok) {
            const details = await response.text();
            console.error("TMDB API error:", response.status, details);

            return Response.json(
                {
                    success: false,
                    message: "Unable to retrieve trending movies",
                    tmdbStatus: response.status,
                },
                { status: response.status }
            );
        }

        const data = await response.json() as TmdbTrendingResponse;
        const results = Array.isArray(data.results) ? data.results : [];

        const movies = results.slice(0, 5).map((movie) => ({
            id: movie.id,
            title: movie.title || movie.original_title || "Untitled Movie",
            rating: Number(movie.vote_average ?? 0).toFixed(1),
            posterPath: movie.poster_path ?? null,
            posterUrl: movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : null,
            backdropUrl: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : null,
            releaseDate: movie.release_date ?? null,
            overview: movie.overview ?? "",
        }));

        return Response.json({
            success: true,
            count: movies.length,
            movies,
        });
    } catch (error) {
        console.error("Trending movies error:", error);

        return Response.json(
            {
                success: false,
                message: "Unable to retrieve trending movies",
            },
            { status: 500 }
        );
    }
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
            success: true,
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
            success: true,
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
            success: true,
            updatedAt: new Date().toISOString(),
            items: fallbackLicUpdates,
        });
    }
});

app.get("/api/health", (c) => {
    return c.json({
        success: true,
        message: "Vedika Networks Worker is running",
    });
});

app.get("/api/movies/trending", async (c) => {
    return getTrendingMovies(c.env);
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
    fetch: (request: Request, env: AppBindings, ctx: ExecutionContext) => {
        return app.fetch(request, env, ctx);
    }
};


