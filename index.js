const urlBase = "https://api.punkapi.com/v2/beers";

// Create an async function called "getBeers" that uses fetch to get our beer data from the urlBase.
// Render each beer name inside the div with the class of beers that currently exists in the HTML file.

// async function getBeers(){
//     try {
//         const request = await fetch(urlBase)
//         const data = await request.json()
//         const beersDiv = document.querySelector('.beers')
//         let beerHTML = ''

//         for(let i = 0; i < data.length; i++){
//             beersDiv.append(`${data[i].name}, `)
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }
// getBeers()

async function getBeers(){
    try {
        const request = await fetch(urlBase)
        const beerData = await request.json()
        console.log(beerData)

        const beerDiv = document.querySelector('.beers')
        let beerHTML = ''
    
        beerData.forEach(beer => {
            beerHTML += `<div class='beer-wrapper card'>
            <div class='beer'>
                <img class='beer__img' src="${beer.image_url}">
                <h3>${beer.name}</h3>
                <span class='beer__info'>
                    <span>ABV: ${beer.abv}%</span>
                    <span>IBU: ${beer.ibu}</span>
                </span>
            </div>
        </div>
       `; 
        });
        beerDiv.innerHTML = beerHTML
    } catch (error) {
        console.error(error)
    }
}
getBeers()

