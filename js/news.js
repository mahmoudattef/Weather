async function getNews() {
    try {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=1d2378e575554dd9b0b1fad4c6316d28`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      displayNews(data);
    } catch (error) {
      console.error('Error fetching the news:', error);
      document.getElementById('allNews').innerHTML = '<p>Failed to load news.</p>';
    }
  }
  function displayNews(data) {
    let cartona = ``;
    for (let i = 0; i < data.articles.length; i++) {
      let article = data.articles[i];
      let publishedAt = new Date(article.publishedAt).toLocaleDateString();
      let imageUrl = article.urlToImage ? article.urlToImage : 'default-image.jpg'; 
  
      cartona += `
      
        <div class="col-md-3 mb-4">
        
          <img src="${imageUrl}" width="250" height="250" alt="News Image" class="img-fluid">
        </div>
        <div class="col-md-8 mb-4">
          <h4><a href="${article.url}" class="text-light">${article.title}</a></h4>
          <p>${publishedAt}</p>
          <p>${article.description}</p>
          <h6 class="float-end text-warning">${article.author ? article.author : 'Unknown author'}</h6>
        </div>
     
      `;
    }
    document.getElementById('allNews').innerHTML = cartona;
  }
  
  getNews();