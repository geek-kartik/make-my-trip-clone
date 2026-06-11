import Image from "next/image";
import type { FooterGroup, PromoCard, SeoBlock, TrustBadge } from "@/lib/types";

type LoginCardProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export function LoginPersuasionCard({ title, subtitle, imageUrl }: LoginCardProps) {
  return (
    <section className="loginPersuasion" aria-label="Login offer">
      <Image src={imageUrl} alt="" width={64} height={64} />
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button type="button">Login now</button>
    </section>
  );
}

export function OffersSection({ offers }: { offers: PromoCard[] }) {
  return (
    <section className="landingCard offersCard" aria-labelledby="offers-heading">
      <div className="sectionHeader">
        <h2 id="offers-heading">Super Offers</h2>
        <div className="offerTabs" aria-label="Offer filters">
          <button className="active" type="button">All Offers</button>
          <button type="button">Flights</button>
          <button type="button">Hotels</button>
        </div>
      </div>
      <div className="offerGrid">
        {offers.map((offer) => (
          <article className="offerCard" key={offer.title}>
            <Image src={offer.imageUrl} alt="" width={116} height={116} />
            <div className="offerCopy">
              <span>{offer.label}</span>
              <h3>{offer.title}</h3>
              <i aria-hidden="true" />
              <p>{offer.text}</p>
              <small>Expires {offer.expires}</small>
            </div>
            <a href="#">Book Now</a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TrustSection({ badges }: { badges: TrustBadge[] }) {
  return (
    <section className="landingCard trustCard" aria-label="MakeMyTrip trust badges">
      {badges.map((badge) => (
        <article className="trustItem" key={badge.title}>
          {badge.tagged ? <span className="trustTag">MMT Assured</span> : null}
          <Image src={badge.imageUrl} alt="" width={52} height={52} />
          <div>
            <h3>{badge.title}</h3>
            <p>{badge.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export function DownloadAppCard() {
  return (
    <section className="downloadCard" aria-label="Download MakeMyTrip app">
      <div>
        <span>Download App</span>
        <h2>Get more with the MakeMyTrip app</h2>
        <p>Receive instant fare alerts, app-exclusive offers and booking updates on the go.</p>
      </div>
      <form className="downloadForm">
        <label htmlFor="phone">Enter mobile number</label>
        <div>
          <span>+91</span>
          <input id="phone" placeholder="Mobile Number" inputMode="numeric" />
          <button type="button">Get App Link</button>
        </div>
      </form>
    </section>
  );
}

export function RoutesFooter({ groups }: { groups: FooterGroup[] }) {
  return (
    <section className="routeFooter" aria-label="Popular MakeMyTrip routes">
      {groups.map((group) => (
        <div className="routeGroup" key={group.title}>
          <h2>{group.title}</h2>
          <p>
            {group.links.map((link, index) => (
              <span key={link}>
                <a href="#">{link}</a>
                {index < group.links.length - 1 ? <em>, </em> : null}
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  );
}

export function SeoContent({ blocks }: { blocks: SeoBlock[] }) {
  return (
    <section className="seoContent" aria-label="About MakeMyTrip">
      <div className="seoGrid">
        {blocks.map((block) => (
          <article key={block.title}>
            <h2>{block.title}</h2>
            <p>{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="container footerInner">
        <div className="socialLinks" aria-label="Social links">
          <a href="#" aria-label="Twitter">t</a>
          <a href="#" aria-label="Instagram">ig</a>
        </div>
        <p>&copy; 2026 MakeMyTrip Travel & Tourism LLC</p>
      </div>
    </footer>
  );
}
