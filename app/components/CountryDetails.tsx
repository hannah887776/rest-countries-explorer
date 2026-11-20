
"use client";

import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import BackButton from "./BackButton";
import type { Country } from "../types/Country";

type CountryDetailsProps = {
  country: Country;
  borderCountries: Country[];
};

export default function CountryDetails({
  country,
  borderCountries,
}: CountryDetailsProps) {
  const { isDark, toggleTheme } = useTheme();

  const labelClass = isDark
    ? "text-slate-400"
    : "text-slate-500";

  const nativeName =
    Object.values(country.names.native ?? {})[0]?.common ?? "N/A";

  const capital =
    country.capitals?.map((item) => item.name).join(", ") || "N/A";

  const currencies =
    country.currencies
      ?.map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ") || "N/A";

  const languages =
    country.languages?.map((language) => language.name).join(", ") ||
    "N/A";

  return (
    <main
      className={`min-h-screen px-5 py-8 sm:px-8 ${
        isDark
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <BackButton />

          <button
            onClick={toggleTheme}
            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-500/10"
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Main Country Layout */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Country Flag */}
          <div className="overflow-hidden rounded-md shadow-lg">
            <img
              src={country.flag.url_png}
              alt={`Flag of ${country.names.common}`}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Country Information */}
          <div
            className={`rounded-md p-6 shadow-sm sm:p-8 lg:p-10 ${
              isDark
                ? "bg-slate-800/70 shadow-black/20"
                : "bg-white shadow-slate-200/70"
            }`}
          >
            <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
              {country.names.common}
            </h1>

            {/* Information Columns */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* First Column */}
              <div className="space-y-5">
                <p className="text-sm leading-7">
                  <strong className={labelClass}>Native Name:</strong>{" "}
                  <span className="font-semibold">{nativeName}</span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Population:</strong>{" "}
                  <span className="font-semibold">
                    {country.population.toLocaleString("en-US")}
                  </span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Region:</strong>{" "}
                  <span className="font-semibold">{country.region}</span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Sub Region:</strong>{" "}
                  <span className="font-semibold">
                    {country.subregion || "N/A"}
                  </span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Capital:</strong>{" "}
                  <span className="font-semibold">{capital}</span>
                </p>
              </div>

              {/* Second Column */}
              <div className="space-y-5">
                <p className="text-sm leading-7">
                  <strong className={labelClass}>Top Level Domain:</strong>{" "}
                  <span className="font-semibold">
                    {country.tlds?.join(", ") || "N/A"}
                  </span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Currencies:</strong>{" "}
                  <span className="font-semibold">{currencies}</span>
                </p>

                <p className="text-sm leading-7">
                  <strong className={labelClass}>Languages:</strong>{" "}
                  <span className="font-semibold">{languages}</span>
                </p>
              </div>
            </div>

            {/* Border Countries */}
            <div className="mt-10 border-t border-slate-500/20 pt-7">
              <h2 className="mb-4 text-base font-bold">
                Border Countries
              </h2>

              {borderCountries.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {borderCountries.map((borderCountry) => (
                    <Link
                      key={borderCountry.codes.alpha_3}
                      href={`/country/${borderCountry.codes.alpha_3.toLowerCase()}`}
                      className={`rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                        isDark
                          ? "bg-slate-700 text-white hover:bg-slate-600"
                          : "bg-slate-50 text-slate-800 hover:bg-slate-200"
                      }`}
                    >
                      {borderCountry.names.common}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className={labelClass}>No bordering countries.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


