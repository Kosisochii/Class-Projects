"use strict";

fetch("./stays.json")
  .then((res) => res.json())
  .then((data) => {
    const searchBtn = document.querySelector(".search-btn");

    const locationInput = document.querySelector("#selectLocation");

    const guestInput = document.querySelector("#addGuests");

    const staysContainer = document.querySelector(".stays-container");

    const locationBar = document.querySelector(".location-bar p");
    const guestsBar = document.querySelector(".guests-bar p");

    function displaySearch() {
      let locationQuery = locationInput.value;
      let guestQuery = guestInput.value.slice(0, 1);

      locationBar.innerHTML = locationQuery;
      guestsBar.innerHTML = guestQuery + " guests";

      //filter location query
      let filteredCityResults = data.filter((item) =>
      locationQuery.includes(item.city));
        //filter guests query from location query results
      let filteredFinalResults = filteredCityResults.filter(
        (item) => item.maxGuests >= parseInt(guestQuery));

      //checker if filtered results is empty
      if (filteredFinalResults.length === 0) {
        staysContainer.innerHTML = `<p>No Search Results</p>`;
      } else {
        //clear container content
        staysContainer.innerHTML = "";
        //display search result content
        filteredFinalResults.forEach((element) => {
          const staysBox = document.createElement("div");
          staysBox.classList.add("stays-box");

          const city = document.createElement("p");
          city.classList.add("hidden", "city");

          const country = document.createElement("p");
          country.classList.add("hidden", "country");

          const superHost = document.createElement("p");
          superHost.classList.add("superhost");

          const title = document.createElement("p");
          title.classList.add("title");

          const rating = document.createElement("p");
          rating.classList.add("rating");

          const maxGuests = document.createElement("p");
          maxGuests.classList.add("max-guests", "hidden");

          const type = document.createElement("p");
          type.classList.add("type");

          const beds = document.createElement("p");
          beds.classList.add("beds");

          const photo = document.createElement("div");

          const staysText = document.createElement("div");
          staysText.classList.add("stays-text");

          const staysRating = document.createElement("div");
          staysRating.classList.add("stays-rating");

          const star = document.createElement("i");
          star.classList.add("fas", "fa-star");
          staysRating.append(star, rating);

          city.append(element.city);
          country.append(element.country);
          superHost.append(element.superHost);
          title.append(element.title);
          rating.append(element.rating);
          maxGuests.append(element.maxGuests);
          type.append(element.type);
          beds.append(element.beds + " beds");

          let img = document.createElement("img");
          img.src = element.photo;
          photo.append(img);
          photo.classList.add("stays-img");

          if (superHost.innerText === "false") {
            superHost.classList.add("hidden");
          } else {
            superHost.innerText = "SUPER HOST";
          }

          if (beds.innerText === "null beds") {
            beds.classList.add("hidden");
          }

          staysBox.append(
            photo,
            superHost,
            type,
            beds,
            staysRating,
            title,
            country,
            maxGuests,
            city
          );

          staysText.append(superHost, type, beds, staysRating);

          staysBox.insertBefore(staysText, staysBox.children[1]);

          staysContainer.append(staysBox);
        });

      }
    }
    searchBtn.addEventListener("click", displaySearch);
  });
