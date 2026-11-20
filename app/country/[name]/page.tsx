import { Suspense } from "react";
import CountryPageContent from "../../components/CountryPageContent";

type CountryPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default function CountryPage({
  params,
}: CountryPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-lg font-semibold text-slate-600">
            Loading country information...
          </p>
        </main>
      }
    >
      <CountryPageContentWrapper params={params} />
    </Suspense>
  );
}

async function CountryPageContentWrapper({
  params,
}: CountryPageProps) {
  const { name } = await params;

  return <CountryPageContent name={name} />;
}
