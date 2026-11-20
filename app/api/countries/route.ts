
export async function GET() {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    return Response.json(
      { message: "API key is missing" },
      { status: 500 }
    );
  }

  try {
    const allCountries = [];
    const limit = 100;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          next: {
            revalidate: 3600,
          },
        }
      );

      if (!response.ok) {
        return Response.json(
          { message: "Failed to fetch countries" },
          { status: response.status }
        );
      }

      const result = await response.json();

      const countries = result.data.objects;

      allCountries.push(...countries);

      hasMore = result.data.meta.more;
      offset += limit;
    }

    return Response.json(allCountries);

  } catch {
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

