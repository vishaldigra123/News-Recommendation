async function fetchNews() {
  const query = document.getElementById("newsInput").value;
  const resultBox = document.getElementById("resultBox");

  if (!query.trim()) {
    resultBox.innerText = "❗ Please enter a keyword to search news.";
    return;
  }

  resultBox.innerHTML = "⏳ Fetching news articles...";

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=3cce4c973e6649868abfcef6274948e2`);

    const data = await response.json();

    if (data.status !== "ok") {
      resultBox.innerText = "❌ Failed to fetch news.";
      return;
    }

    if (data.articles.length === 0) {
      resultBox.innerText = "🔍 No news articles found.";
      return;
    }

    let output = `<h3>📰 Results for "${query}":</h3><ul>`;
    data.articles.slice(0, 5).forEach(article => {
      output += `
        <li>
          <a href="${article.url}" target="_blank">${article.title}</a><br>
          <small>${article.source.name} | ${new Date(article.publishedAt).toLocaleString()}</small>
        </li><br>`;
    });
    output += "</ul>";

    resultBox.innerHTML = output;

  } catch (error) {
    console.error(error);
    resultBox.innerText = "❌ API Error. Try again.";
  }
}
