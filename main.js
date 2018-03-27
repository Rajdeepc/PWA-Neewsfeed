
const apiKey = '8592766d75eb4787b9609d395d45e5ce';
const main  = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'bbc-news';


window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    //fetch news based on chance

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('sw registered');
        }catch (error) {
            console.log('sw failed');
        }
    }
});

async function updateSources(){
    const res  = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
    const json = await res.json();

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n');

}


async function updateNews(source = defaultSource) {
    const res  = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`)
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
