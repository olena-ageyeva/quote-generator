const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removerLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newQuote(apiQuotes) {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const { author, text } = quote;

  if (author === "") {
    authorText.innerText = "unknown";
  } else {
    authorText.innerText = author;
  }
  if (text > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = text;
}

//Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://sheltered-badlands-52292.herokuapp.com/";
  //"https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(proxyUrl + apiUrl);

    const apiQuotes = await response.json();

    newQuote(apiQuotes);

    removerLoadingSpinner();
  } catch (error) {}
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
