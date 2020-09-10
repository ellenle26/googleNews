const API_KEY = "42a1d4d9ed0a481caab1345317ae5394";
let newsList = [];
let source = {};
let page = 1;
const getNews = async () => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=${API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  newsList = data.articles;
  render(newsList);
  console.log(newsList);

  for (let i = 0; i < newsList.length; i++) {
    if (source[newsList[i].source.name]) {
      source[newsList[i].source.name] += 1;
    } else {
      source[newsList[i].source.name] = 1;
    }
  }
  console.log(source);
  renderChannel();
};

const renderChannel = () => {
  let sourceHTML = "";
  for (let [key, value] of Object.entries(source)) {
    sourceHTML += `<div class="newsSources"><input type="checkbox" onclick="filterSource(${key})"/><span>${key} </span> :${value}</div>`;
  }
  document.getElementById("chanel").innerHTML = sourceHTML;
};

// let filterSource = (key) => {
//     if ($(this).is(':checked')) {
//         console.log(key)
// };

const render = (list) => {
  let newsHTML = list
    .map(
      (item, index) =>
        `<div class="newsListCss">
        <div class="imageHolder">
        <img src="${item.urlToImage}" alt=""/>
        </div>
        <div class="news-content">
            <h3 >${item.title}</h3>
            <p >${item.description}</p>
            <div>Source: ${item.source.name}</div>
            <a href="${item.url}" target="_blank">more</a>
            <p class="card-text"><small class="text-muted">${moment(
              `${list[`${index}`].publishedAt}`,
              "YYYYMMDD"
            ).fromNow()}</small></p>
        </div>
        </div>`
    )
    .join("");

  document.getElementById("newsBoard").innerHTML = newsHTML;
  document.getElementById("totalArticles").innerHTML = list.length;
};

getNews();

const loadMorePage = async () => {
  page++;
  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=${API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(newsList);
  newsList = newsList.concat(data.articles);
  render(newsList);
  source = {};
  for (let i = 0; i < newsList.length; i++) {
    if (source[newsList[i].source.name]) {
      source[newsList[i].source.name] += 1;
    } else {
      source[newsList[i].source.name] = 1;
    }
  }

  renderChannel();
};
