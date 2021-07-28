const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// Show Loader 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// // Get Quote From API

let i = 12
async function getQuote() {
        loading()
        const apiUrl = 'http://type.fit/api/quotes';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data[i].text);
            if (data[i].author === "") {
                authorText.innerText = "Unknown"
            } else { 
                authorText.innerText = data[i].author
            }
            authorText.innerText = data[i].author;
            quoteText.innerText = data[i].text;
            if (quoteText.length > 120) {
                quoteText.classList.add('long-quote')
            } else { 
                quoteText.classList.remove('long-quote')
            }
            // Stop loader, show quote
            complete()
        } catch(error) {
            getQuote();
            // console.log('whoops', error);
        }
        
        
}

// Twitter Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} `;
    window.open(twitterUrl, "_blank")
}

async function increase() {
    i = ++i
    getQuote()
}

// Event Listener
newQuoteBtn.addEventListener('click', increase);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote();
