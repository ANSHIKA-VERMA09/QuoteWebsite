document.getElementById('new-quote-button').addEventListener('click', function() {
    fetch('/quote')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote-text').innerText = data.text;
            document.getElementById('quote-author').innerText = `- ${data.author}`;
        })
        .catch(error => console.error('Error fetching new quote:', error));
});