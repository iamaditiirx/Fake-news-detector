document.getElementById('predictButton').addEventListener('click', function() {
    const newsText = document.getElementById('newsInput').value;

    if (newsText.trim() === '') {
        document.getElementById('result').innerText = 'Please enter some news text.';
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').innerText = '';

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newsText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.error) {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        } else {
            document.getElementById('result').innerText = `Prediction: ${data.prediction}`;
        }
    })
    .catch(error => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('result').innerText = 'An error occurred while processing your request.';
        console.error('Error:', error);
    });
});
