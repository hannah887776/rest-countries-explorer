"use client";

import { useEffect, useState } from "react";

import CountryDetails from "./CountryDetails";
import type { Country } from "../types/Country";

type CountryPageContentProps = {
  name: string;
};

export default function CountryPageContent({
  name,
}: CountryPageContentProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/countries");

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data: Country[] = await response.json();

        setCountries(data);
      } catch {
        setError("Could not load country information.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const country = countries.find(
    (item) => item.codes.alpha_3.toLowerCase() === name.toLowerCase()
  );

  const borderCountries = countries.filter((item) =>
    country?.borders?.includes(item.codes.alpha_3)
  );

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Loading country information...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-red-600">
          {error}
        </p>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-slate-600">
          Country not found!
        </p>
      </main>
    );
  }

  return (
    <CountryDetails
      country={country}
      borderCountries={borderCountries}
    />
  );
}
