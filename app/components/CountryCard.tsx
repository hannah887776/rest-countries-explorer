

import Link from "next/link";

type CountryCardProps = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
  isDark: boolean;
  alpha3Code: string;
};

export default function CountryCard({
  name,
  flag,
  population,
  region,
  capital,
  isDark,
  alpha3Code,
}: CountryCardProps) {
  return (
    <Link
      href={`/country/${alpha3Code.toLowerCase()}`}
      className="block h-full"
    >
      <article
        className={`h-full overflow-hidden rounded-md shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
          isDark
            ? "bg-slate-800 text-white shadow-black/20"
            : "bg-white text-slate-900 shadow-slate-200/70"
        }`}
      >
        <div className="h-40 overflow-hidden bg-slate-200">
          <img
            src={flag}
            alt={`Flag of ${name}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-103"
          />
        </div>

        <div className="p-5">
          <h2 className="mb-4 line-clamp-2 text-lg font-bold">
            {name}
          </h2>

          <div className="space-y-2">
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <strong className="font-semibold">Population:</strong>{" "}
              {population.toLocaleString("en-US")}
            </p>

            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <strong className="font-semibold">Region:</strong> {region}
            </p>

            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <strong className="font-semibold">Capital:</strong> {capital}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
