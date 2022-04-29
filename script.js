const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//get the quote from the api
const fetchQuote = async () => {
  showLoading();
  const proxyUrl = 'https://cors-anywhere-449.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const quote = await response.json();
    if (quote.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = quote.quoteAuthor;
    }
    if (quote.quoteText > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote.quoteText;
    hideLoading();
  } catch (err) {
    fetchQuote();
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const hideLoading = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};
newQuoteButton.addEventListener('click', fetchQuote);
twitterButton.addEventListener('click', tweetQuote);
fetchQuote();
