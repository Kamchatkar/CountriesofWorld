import React from "react";

export default function CountryCard({
  country,
  nightMode,
  setMainCountry,
  setCountryPopUp,
  comma,
}) {
  function handleCountryClick(country) {
    setCountryPopUp(true);
    setMainCountry(country);
  }

  return (
    <div
      className="country-card"
      key={country.ccn3}
      onClick={() => handleCountryClick(country)}
      style={
        nightMode
          ? {
              backgroundColor: "hsl(209, 23%, 22%)",
              boxShadow: "0 0.3px 3px hsl(209, 23%, 10%",
            }
          : {
              backgroundColor: "hsl(0, 0%, 100%)",
              boxShadow: "0 0.3px 3px hsl(0, 0%, 85%)",
            }
      }
    >
      <div
        className="country-flag"
        style={{ backgroundImage: `url(${country.flags.png})` }}
      >
        {/* <img src={country.flags.png} alt="Country flag" /> */}
      </div>
      <div className="country-info">
        <h2
          style={
            nightMode
              ? { color: "hsl(0, 0%, 100%)" }
              : { color: "hsl(200, 15%, 8%)" }
          }
        >
          {country.name.common}
        </h2>
        <h5
          style={
            nightMode
              ? { color: "hsl(0, 0%, 100%)" }
              : { color: "hsl(200, 15%, 8%)" }
          }
        >
          <b
            style={
              nightMode
                ? { color: "hsl(0, 0%, 100%)" }
                : { color: "hsl(200, 15%, 8%)" }
            }
          >
            Population:{" "}
          </b>{" "}
          {comma(country.population.toString())}
        </h5>
        <h5
          style={
            nightMode
              ? { color: "hsl(0, 0%, 100%)" }
              : { color: "hsl(200, 15%, 8%)" }
          }
        >
          <b
            style={
              nightMode
                ? { color: "hsl(0, 0%, 100%)" }
                : { color: "hsl(200, 15%, 8%)" }
            }
          >
            Region:{" "}
          </b>{" "}
          {country.region}
        </h5>
        <h5
          style={
            nightMode
              ? { color: "hsl(0, 0%, 100%)" }
              : { color: "hsl(200, 15%, 8%)" }
          }
        >
          <b
            style={
              nightMode
                ? { color: "hsl(0, 0%, 100%)" }
                : { color: "hsl(200, 15%, 8%)" }
            }
          >
            Capital:{" "}
          </b>
          {country.capital}
        </h5>
      </div>
    </div>
  );
}
