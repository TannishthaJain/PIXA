// Variable declarations for accessing DOM elements and API key
const accessKey = "4e1E5eCJ0gK0zjGxt7b6BcTWXQhgC1dT47gSOKgy49w";
const formE1 = document.querySelector("#form");
const searchInputE1 = document.getElementById("search-input");
const searchResultE1 = document.getElementById("search-results");
const showMoreButton = document.getElementById("show-more");
const searchCont = document.getElementById("SearchCont");
const upperCont = document.getElementById("upperCont");
const loader = document.getElementById("loader");
let inputData = "";
let page = 1;

// Function to fetch and display images based on search input
async function searchImages() {
  inputData = searchInputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // Show loader while fetching data
  loader.style.display = "block";
  const response = await fetch(url);
  const data = await response.json();
  if (searchResultE1) {
    if (page === 1) {
      searchResultE1.innerHTML = "";
    }
  } else {
    console.error("searchResultE1 is null. Element not found.");
  }

  const results = data.results;
  // Display search results
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add(
      "search-result",
      "rounded-lg",
      "overflow-hidden",
      "shadow",
      "hover:shadow-xl",
      "transition",
      "transform",
      "ImageDiv"
    );
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    image.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "transition",
      "transform",
      "hover:scale-105"
    );
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultE1.appendChild(imageWrapper);
  });
  page++;
  loader.style.display = "none";
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
  searchCont.classList.add("NewSearchCont");
 
  showSearchContainer();

}

// Event listener for form submission
formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
  searchInputE1.blur();
  updateLastSearches(searchInputE1.value);
});

// Event listener for infinite scrolling
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    searchImages();
  }
});


const dropdownContent = document.getElementById('dropdown-content');

function addLastSearchesToDropdown(searches) {
  dropdownContent.innerHTML = '';

  let recentSearch=document.createElement('recentSearch');
  recentSearch.textContent = 'Recent Searches';
  recentSearch.style.fontSize="15px";
  recentSearch.style.fontStyle="italic";
  recentSearch.style.marginBlock="3px";
  recentSearch.classList.add('recentSearch')
  dropdownContent.appendChild(recentSearch);

  searches.forEach((search, index) => {
    const searchOption = document.createElement('a');
    searchOption.textContent = search;
    searchOption.href = '#';
    searchOption.style.fontSize="13px";
    searchOption.style.marginBlock="2px";
    searchOption.style.fontWeight="600";
    searchOption.addEventListener('mousedown', async (e) => {
      e.preventDefault();
      searchInputE1.value = search;
      page = 1; 
      await searchImages();
      searchInputE1.blur();
      return false; 
    });
    dropdownContent.appendChild(searchOption);
    dropdownContent.style.backgroundColor = '#E8F0FE';
    dropdownContent.style.paddingBottom= '7px';
  });
}

const lastSearches = [];

function updateLastSearches(search) {
  // Remove the search if it already exists
  if (lastSearches.includes(search)) {
    lastSearches.splice(lastSearches.indexOf(search), 1);
  }

  // Remove oldest search if there are already 3 searches
  if (lastSearches.length === 3) {
    lastSearches.pop(); // Remove the last item
  }

  // Add new search to the beginning
  lastSearches.unshift(search);

  // Update dropdown
  addLastSearchesToDropdown(lastSearches);
}



 searchInputE1.addEventListener('focus', () => {
   dropdownContent.style.display = 'flex';
 });
 // Hide dropdown when input is blurred
 searchInputE1.addEventListener('blur', () => {
   // Delay hiding the dropdown to allow for click events on the dropdown content
   setTimeout(() => {
     dropdownContent.style.display = 'none';
   }, 1);
 });


// Functionality for toggling dark mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const prefersDarkMode = localStorage.getItem("darkMode") === "true";

if (prefersDarkMode) {
  enableDarkMode();
} else {
  enableLightMode();
}

darkModeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    disableDarkMode();
    localStorage.setItem("darkMode", "false");
  } else {
    enableDarkMode();
    localStorage.setItem("darkMode", "true");
  }
});

// Function to enable dark mode
function enableDarkMode() {
  darkModeToggle.innerHTML = "🌞";
  body.classList.add("dark");
  body.classList.remove("light");
  body.style.backgroundImage = "url('./images/dark.jpg')";
  document.querySelector(".text-5xl").classList.add("text-white");
}

// Function to enable light mode
function enableLightMode() {
  darkModeToggle.innerHTML = "🌙";
  body.classList.add("light");
  body.classList.remove("dark");
  body.style.backgroundImage = "url('./images/light.jpg')";
  document.querySelector(".text-5xl").classList.remove("text-white");
}

// Function to disable dark mode
function disableDarkMode() {
  darkModeToggle.innerHTML = "🌙";
  body.classList.remove("dark");
  body.classList.add("light");
  body.style.backgroundImage = "url('./images/light.jpg')";
  document.querySelector(".text-5xl").classList.remove("text-white");
}
