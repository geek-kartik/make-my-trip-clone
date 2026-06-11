import Image from "next/image";
import type { HeaderAction } from "@/lib/types";

type HeaderProps = {
  actions: HeaderAction[];
};

export function Header({ actions }: HeaderProps) {
  return (
    <header className="siteHeader" aria-label="MakeMyTrip header">
      <a className="brand" href="#" aria-label="MakeMyTrip home">
        <Image
          src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png"
          alt="MakeMyTrip"
          width={155}
          height={49}
          priority
        />
      </a>

      <nav className="accountNav" aria-label="Account and settings">
        {actions.map((action) => (
          <a
            className={`headerAction ${action.variant === "solid" ? "headerActionSolid" : ""}`}
            href="#"
            key={action.title}
          >
            <span className="headerActionIcon" aria-hidden="true" />
            <span>
              <strong>{action.title}</strong>
              {action.subtitle ? <small>{action.subtitle}</small> : null}
            </span>
          </a>
        ))}
        <button className="localeButton" type="button">
          <span className="flagDot" aria-hidden="true" />
          IN | ENG | INR
        </button>
      </nav>
    </header>
  );
}
