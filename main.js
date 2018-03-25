
const apiKey = '8592766d75eb4787b9609d395d45e5ce';

const main  = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');

window.addEventListener('load', e => {
    updateNews();
    updateSources();
});

async function updateSources(){
    const res  = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n');

}


async function updateNews(params) {
    const res  = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`)
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
        <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}"/>
            <p>${article.description}</p>
        </a>
        </div>
    
    `;
}
