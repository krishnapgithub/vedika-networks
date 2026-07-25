interface Env {
  DB: D1Database;
  PROFILE_PHOTOS: R2Bucket;
  ASSETS: Fetcher;
  TMDB_ACCESS_TOKEN: string;
}

interface TmdbMovie {
  id: number;
  title: string;
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

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
      ...corsHeaders,
    },
  });
}

async function getTrendingMovies(env: Env): Promise<Response> {
  if (!env.TMDB_ACCESS_TOKEN) {
    return jsonResponse(
      {
        success: false,
        message: "TMDB_ACCESS_TOKEN is not configured",
      },
      500
    );
  }

  try {
    const tmdbResponse = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    if (!tmdbResponse.ok) {
      const errorDetails = await tmdbResponse.text();

      console.error(
        "TMDB API error:",
        tmdbResponse.status,
        errorDetails
      );

      return jsonResponse(
        {
          success: false,
          message: "Unable to retrieve trending movies",
          tmdbStatus: tmdbResponse.status,
        },
        tmdbResponse.status
      );
    }

    const data =
      (await tmdbResponse.json()) as TmdbTrendingResponse;

    const results = Array.isArray(data.results)
      ? data.results
      : [];

    const movies = results.slice(0, 5).map((movie) => ({
      id: movie.id,
      title:
        movie.title ||
        movie.original_title ||
        "Untitled Movie",

      rating: Number(
        movie.vote_average ?? 0
      ).toFixed(1),

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

    return jsonResponse({
      success: true,
      count: movies.length,
      movies,
    });
  } catch (error) {
    console.error("Trending movies error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Unable to retrieve trending movies",
      },
      500
    );
  }
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    console.log(`${request.method} ${pathname}`);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (
      request.method === "GET" &&
      pathname === "/api/health"
    ) {
      return jsonResponse({
        success: true,
        message: "Vedika Networks Worker is running",
      });
    }

    if (
      request.method === "GET" &&
      pathname === "/api/movies/trending"
    ) {
      return getTrendingMovies(env);
    }

    /*
     * Any unknown /api route should return JSON.
     * It should not open the React website.
     */
    if (pathname.startsWith("/api/")) {
      return jsonResponse(
        {
          success: false,
          error: "API endpoint route not found",
          path: pathname,
        },
        404
      );
    }

    /*
     * All non-API requests serve your React website.
     */
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;