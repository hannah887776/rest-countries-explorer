
"use client";

import { useEffect, useState } from "react";

import CountryCard from "./components/CountryCard";
import CountryCardSkeleton from "./components/CountryCardSkeleton";
import { useTheme } from "./context/ThemeContext";
import type { Country } from "./types/Country";

export default function Home() {
  // Theme
  const { isDark, toggleTheme } = useTheme();

  // Countries and API states
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Fetch countries from API
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
        setError("Could not load countries. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  // Remove countries without valid codes or flags
  const validCountries = countries.filter(
    (country) => country.codes.alpha_3 && country.flag.url_png
  );

  // Search and filter countries
  const filteredCountries = validCountries.filter((country) => {
    const matchesSearch = country.names.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <main
      className={`min-h-screen ${
        isDark
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-sm ${
          isDark
            ? "bg-slate-800 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <h1 className="text-lg font-bold tracking-tight sm:text-2xl">
            Where in the world?
          </h1>

          <button
            onClick={toggleTheme}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-500/10"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Search and Region Filter */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div
            className={`flex w-full items-center gap-4 rounded-md px-5 py-4 shadow-sm transition-all duration-200 focus-within:ring-2 sm:max-w-md ${
              isDark
                ? "bg-slate-800 text-white focus-within:ring-slate-600"
                : "bg-white text-slate-900 focus-within:ring-slate-300"
            }`}
          >
            <span className="text-lg" aria-hidden="true">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search for a country"
              className={`w-full bg-transparent text-sm outline-none ${
                isDark
                  ? "placeholder:text-slate-400"
                  : "placeholder:text-slate-500"
              }`}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className={`shrink-0 rounded-full px-2 py-1 text-lg transition-colors ${
                  isDark
                    ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                ×
              </button>
            )}
          </div>

          {/* Region Filter */}
          <div className="relative w-full sm:max-w-xs">
            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              aria-label="Filter by region"
              className={`w-full cursor-pointer appearance-none rounded-md px-5 py-4 pr-12 text-sm shadow-sm outline-none transition-all duration-200 focus:ring-2 ${
                isDark
                  ? "bg-slate-800 text-white focus:ring-slate-600"
                  : "bg-white text-slate-900 focus:ring-slate-300"
              }`}
            >
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            {selectedRegion && (
              <button
                type="button"
                onClick={() => setSelectedRegion("")}
                aria-label="Clear region filter"
                className={`absolute right-10 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-lg transition-colors ${
                  isDark
                    ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Countries Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Explore Countries
          </h2>

          {!isLoading && !error && (
            <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isDark
                ? "bg-slate-800 text-slate-400"
                : "bg-slate-200 text-slate-600"
            }`}
            >
             {filteredCountries.length} countries
            </span>
          )}
        </div>

        {/* Countries List */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <CountryCardSkeleton
                key={index}
                isDark={isDark}
              />
            ))}
          </div>
        ) : error ? (
          <p
            className={`rounded-xl py-12 text-center ${
              isDark ? "text-red-300" : "text-red-600"
            }`}
          >
            {error}
          </p>
        ) : filteredCountries.length === 0 ? (
          <p
            className={`rounded-xl py-12 text-center ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            No countries found!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.names.common}
                name={country.names.common}
                flag={country.flag.url_png}
                population={country.population}
                region={country.region}
                capital={country.capitals?.[0]?.name ?? "N/A"}
                isDark={isDark}
                alpha3Code={country.codes.alpha_3}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

