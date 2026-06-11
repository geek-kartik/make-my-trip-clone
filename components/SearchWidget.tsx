"use client";

import { useState } from "react";
import type { AirportField, DateField, FlightSearchContent } from "@/lib/types";

type SearchWidgetProps = {
  content: FlightSearchContent;
};

function AirportTile({ field }: { field: AirportField }) {
  return (
    <button className="searchTile cityTile" type="button">
      <span className="tileLabel">{field.label}</span>
      <strong>{field.city}</strong>
      <span className="tileMeta">{field.code}, {field.detail}</span>
    </button>
  );
}

function DateTile({ date, dimmed = false }: { date: DateField; dimmed?: boolean }) {
  return (
    <button className={`searchTile dateTile ${dimmed ? "dimmed" : ""}`} type="button">
      <span className="tileLabel">{date.label}</span>
      {date.helper ? (
        <span className="returnHelper">{date.helper}</span>
      ) : (
        <>
          <strong>
            {date.day}
            <small>{date.monthYear}</small>
          </strong>
          <span className="tileMeta">{date.weekday}</span>
        </>
      )}
    </button>
  );
}

export function SearchWidget({ content }: SearchWidgetProps) {
  const [tripType, setTripType] = useState(content.tripTypes[0]);
  const [fareType, setFareType] = useState(content.fareTypes[0].id);

  return (
    <section className="searchWidget" aria-label="Flight search">
      <div className="searchTopRow">
        <div className="tripTypeGroup" role="radiogroup" aria-label="Trip type">
          {content.tripTypes.map((type) => (
            <button
              aria-checked={tripType === type}
              className={`tripType ${tripType === type ? "selected" : ""}`}
              key={type}
              onClick={() => setTripType(type)}
              role="radio"
              type="button"
            >
              <span className="radioMark" aria-hidden="true" />
              {type}
            </button>
          ))}
        </div>
        <p>{content.headline}</p>
      </div>

      <div className="searchGrid">
        <AirportTile field={content.from} />
        <button className="swapButton" type="button" aria-label="Swap origin and destination">
          <span aria-hidden="true">&harr;</span>
        </button>
        <AirportTile field={content.to} />
        <DateTile date={content.departure} />
        <DateTile date={content.returnDate} dimmed />
        <button className="searchTile travellerTile" type="button">
          <span className="tileLabel">Travellers & Class</span>
          <strong>
            {content.travellers.adults}
            <small> Traveller</small>
          </strong>
          <span className="tileMeta">{content.travellers.cabin}</span>
        </button>
      </div>

      <div className="fareRow">
        <span className="fareTitle">
          Select A
          <strong> Fare Type:</strong>
        </span>
        <div className="fareChips">
          {content.fareTypes.map((fare) => (
            <button
              className={`fareChip ${fareType === fare.id ? "selected" : ""}`}
              key={fare.id}
              onClick={() => setFareType(fare.id)}
              type="button"
            >
              <span className="fareRadio" aria-hidden="true" />
              <span>
                <strong>{fare.title}</strong>
                <small>{fare.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <button className="searchButton" type="button">SEARCH</button>
    </section>
  );
}
