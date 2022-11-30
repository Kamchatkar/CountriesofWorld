import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMoon as solidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as regularMoon } from "@fortawesome/free-regular-svg-icons";
import CountryCard from "./CountryCard";

function App() {
  const [nightMode, setNightMode] = useState(false);
  const [initialCountries, setInitialCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [mainCountry, setMainCountry] = useState(null);
  const [countryPopUp, setCountryPopUp] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setInitialCountries(data);
        console.log(data);
      });
  }, []);

  function handleSearch(e) {
    let searchTerm = e.target.value;
    setCountries(
      initialCountries.filter((country) =>
        country.name.common.includes(searchTerm)
      )
    );
  }

  function handleFilter(e) {
    if (e.target.value === "All") {
      setCountries(initialCountries);
    } else {
      setCountries(
        initialCountries.filter((country) => country.region === e.target.value)
      );
    }
  }

  function handleDarkMode() {
    !nightMode ? setNightMode(true) : setNightMode(false);
  }

  function handleBack() {
    setMainCountry(null);
    setCountryPopUp(false);
  }

  function handleBorderClick(borderCountry) {
    let countryToSet = initialCountries.find(
      (country) => country.cca3 === borderCountry
    );
    setMainCountry(countryToSet);
  }

  function comma(number) {
    let numberArray = [];
    let numberSplit = number.toString().split("").reverse();
    for (let i = 0; i < numberSplit.length; i++) {
      if (i % 3 === 0) {
        numberArray.push(",");
        numberArray.push(numberSplit[i]);
      } else {
        numberArray.push(numberSplit[i]);
      }
    }
    numberArray.reverse();
    numberArray.pop();
    return numberArray.join("");
  }

  return (
    <div className="body">
      <div
        className="header-container"
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
        <div className="header">
          <h1
            style={
              nightMode
                ? { color: "hsl(0, 0%, 100%)" }
                : { color: "hsl(200, 15%, 8%)" }
            }
          >
            Where in the world?
          </h1>
          <div className="dark-mode-toggle" onClick={handleDarkMode}>
            {nightMode ? (
              <FontAwesomeIcon icon={regularMoon} />
            ) : (
              <FontAwesomeIcon icon={solidMoon} color="white" />
            )}

            <p
              style={
                nightMode
                  ? { color: "hsl(0, 0%, 100%)" }
                  : { color: "hsl(200, 15%, 8%)" }
              }
            >
              Dark Mode
            </p>
          </div>
        </div>
      </div>
      {!countryPopUp && (
        <div
          className="main-container"
          style={
            nightMode
              ? { backgroundColor: "hsl(207, 26%, 17%)" }
              : { backgroundColor: "hsl(0, 0%, 98%)" }
          }
        >
          <div className="search-container">
            <div
              className="search-bar-container"
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
              <FontAwesomeIcon
                className="search-icon"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                placeholder="Search for a country..."
                className="search-bar finder"
                onChange={handleSearch}
                onClick={(e) => (e.target.value = "")}
                style={
                  nightMode
                    ? {
                        backgroundColor: "hsl(209, 23%, 22%)",
                        color: "hsl(0, 0%, 100%)",
                      }
                    : {
                        backgroundColor: "hsl(0, 0%, 100%)",
                        color: "hsl(200, 15%, 8%)",
                      }
                }
              />
            </div>
            <select
              onChange={handleFilter}
              className="filter finder"
              style={
                nightMode
                  ? {
                      backgroundColor: "hsl(209, 23%, 22%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0 0.3px 3px hsl(209, 23%, 10%",
                    }
                  : {
                      backgroundColor: "hsl(0, 0%, 100%)",
                      color: "hsl(200, 15%, 8%)",
                      boxShadow: "0 0.3px 3px hsl(0, 0%, 85%)",
                    }
              }
            >
              <option value="" disabled selected hidden>
                Filter by Region
              </option>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div className="country-card-container">
            {countries.map((country) => (
              <CountryCard
                country={country}
                nightMode={nightMode}
                setMainCountry={setMainCountry}
                setCountryPopUp={setCountryPopUp}
                comma={comma}
              />
            ))}
          </div>
        </div>
      )}
      {countryPopUp && mainCountry && (
        <div
          className="country-pop-up-container"
          style={
            nightMode
              ? { backgroundColor: "hsl(207, 26%, 17%)" }
              : { backgroundColor: "hsl(0, 0%, 98%)" }
          }
        >
          <div className="back-button-container">
            <div
              className="back-button"
              onClick={handleBack}
              style={
                nightMode
                  ? {
                      backgroundColor: "hsl(209, 23%, 22%)",
                      color: "hsl(0, 0%, 100%)",
                      boxShadow: "0 0.9px 4px hsl(209, 23%, 10%",
                    }
                  : {
                      backgroundColor: "hsl(0, 0%, 100%)",
                      color: "hsl(200, 15%, 8%)",
                      boxShadow: "0 0.9px 4px hsl(0, 0%, 85%)",
                    }
              }
            >
              Back
            </div>
          </div>
          <div className="info-and-flag-container">
            <div
              className="country-flag-pop-up"
              style={{ backgroundImage: `url(${mainCountry.flags.png})` }}
            ></div>
            <div className="country-info-pop-up">
              <h1
                style={
                  nightMode
                    ? { color: "hsl(0, 0%, 100%)" }
                    : { color: "hsl(200, 15%, 8%)" }
                }
              >
                {mainCountry?.name.common}
              </h1>
              <div className="country-info-additional">
                <div className="country-stats additional-one">
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
                      Native Name:{" "}
                    </b>
                    {mainCountry.name.nativeName &&
                      mainCountry.name.nativeName[
                        Object.keys(mainCountry.name.nativeName)[0]
                      ].common}
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
                      Population:{" "}
                    </b>{" "}
                    {mainCountry.population && comma(mainCountry.population)}
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
                      Region:
                    </b>{" "}
                    {mainCountry.region && mainCountry.region}
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
                      Sub Region:
                    </b>{" "}
                    {mainCountry.subregion && mainCountry.subregion}
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
                      {" "}
                      Capital:
                    </b>{" "}
                    {mainCountry.capital && mainCountry.capital}
                  </h5>
                </div>
                <div className="country-stats additional-two">
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
                      Top Level Domain:
                    </b>{" "}
                    {mainCountry.tld && mainCountry.tld}
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
                      Currencies:
                    </b>{" "}
                    {mainCountry.currencies &&
                      mainCountry.currencies[
                        Object.keys(mainCountry.currencies)[0]
                      ].name}
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
                      Languages:
                    </b>{" "}
                    {mainCountry.languages &&
                      Object.keys(mainCountry.languages).map(
                        (lang) => `${mainCountry.languages[lang]} `
                      )}
                  </h5>
                </div>
              </div>
              {mainCountry.borders && (
                <div className="border-countries-container">
                  <h3
                    style={
                      nightMode
                        ? { color: "hsl(0, 0%, 100%)" }
                        : { color: "hsl(200, 15%, 8%)" }
                    }
                  >
                    Border Countries:{" "}
                  </h3>
                  <div className="border-countries">
                    {mainCountry.borders.map((borderCountry) => (
                      <div
                        key={borderCountry}
                        className="border-country"
                        onClick={() => handleBorderClick(borderCountry)}
                        style={
                          nightMode
                            ? {
                                backgroundColor: "hsl(209, 23%, 22%)",
                                color: "hsl(0, 0%, 100%)",
                                boxShadow: "0 0.3px 3px hsl(209, 23%, 10%",
                              }
                            : {
                                backgroundColor: "hsl(0, 0%, 100%)",
                                color: "hsl(200, 15%, 8%)",
                                boxShadow: "0 0.3px 3px hsl(0, 0%, 85%)",
                              }
                        }
                      >
                        {
                          initialCountries.find(
                            (country) => country.cca3 === borderCountry
                          ).name.common
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
