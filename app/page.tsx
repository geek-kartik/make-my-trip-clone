import { Header } from "@/components/Header";
import {
  DownloadAppCard,
  LoginPersuasionCard,
  OffersSection,
  RoutesFooter,
  SeoContent,
  SiteFooter,
  TrustSection
} from "@/components/HomeSections";
import { ProductNav } from "@/components/ProductNav";
import { SearchWidget } from "@/components/SearchWidget";
import { getHomepageContent } from "@/lib/homepage-service";

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <main className="pageShell">
      <section className="hero" aria-label="MakeMyTrip search dashboard">
        <div className="heroBackdrop" aria-hidden="true" />
        <div className="container heroContent">
          <Header actions={content.headerActions} />
          <div className="heroStack">
            <ProductNav products={content.products} />
            <SearchWidget content={content.flightSearch} />
          </div>
        </div>
      </section>

      <div className="container contentStack">
        <LoginPersuasionCard {...content.loginCard} />
        <OffersSection offers={content.offers} />
        <TrustSection badges={content.trustBadges} />
        <DownloadAppCard />
        <RoutesFooter groups={content.routeGroups} />
      </div>

      <SeoContent blocks={content.seoBlocks} />
      <SiteFooter />
    </main>
  );
}
