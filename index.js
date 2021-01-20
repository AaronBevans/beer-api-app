const urlBase = "https://api.punkapi.com/v2/beers?page=";

//accessing radio buttons that manage ABV content
const filterABV = document.getElementById('filterABV')
const filterIBU = document.getElementById('filterIBU')

//pagination; 
const pageText = document.getElementById('pageNumber')
const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')
//filters
let optionsABV = ''
let optionsIBU = ''
let page = 1



//filtering beer strength data.
filterABV.addEventListener('change', event=>{
    const value = event.target.value

    switch(value){
        case "all":
            optionsABV = '';
            break;
        case "weak":
            optionsABV = '&abv_lt=4.6';
            break;
        case "medium":
            optionsABV = '&abv_gt=4.5&abv_lt=7.6'
            break;
        case "strong":
            optionsABV = '&abv_gt=7.5';
            break
    }
    //reset to page 1 when we change filters
    page = 1
    getBeers()
})


filterIBU.addEventListener('change', event=>{
    const value = event.target.value

    switch(value){
        case "all":
            optionsIBU = '';
            break;
        case "weak":
            optionsIBU = '&ibu_lt=35';
            break;
        case "medium":
            optionsIBU = '&ibu_gt=34&ibu_lt=75';
            break;
        case "strong":
            optionsIBU = '&ibu_get=74';
            break;
    
    }
    //reset to page 1 when we change filters
    page = 1
    getBeers()
})
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
        //manipulating url and utilizing api's built in functionality.
        //implimenting api/data url and filtered strength options.
        const url = urlBase + page + optionsABV + optionsIBU

        const request = await fetch(url)
        const beerData = await request.json()
        //console.log(beerData)
        
        //pagination; application identifies page number
        //buttons disabled based on current page number.
        pageText.innerText = page 

        //current page number condition
        if(page === 1){
            //button functionality
            prevPage.disabled = true
        }else{
            //button functionality
            prevPage.disabled = false
        }

        if(beerData.length < 25){
            nextPage.disabled = true
        }else{
            nextPage.disabled = false
        }



        const beersDiv = document.querySelector('.beers')

        let beerHTML = ''
        const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';
    
        //iterating through all the json data from our request
        //displaying all the json object data into our application.
        beerData.forEach(beer => {
            beerHTML += `
             <div class='beer-wrapper card'>
                 <div class='beer'>
                     <img class='beer__img' src="${beer.image_url ? beer.image_url : genericBottle}">
                     <h3>${beer.name}</h3>
                     <span class='beer__info'>
                         <span>ABV: ${beer.abv}%</span>
                         <span>IBU: ${beer.ibu}</span>
                     </span>
                 </div>
                 <div class='beer__content'>
                     <div class='beer__name'>${beer.name}</div>
                     <div class='beer__tagline'>${beer.tagline}</div>
                     <div class='beer__description'>${beer.description}</div>
                     <div class='beer__food-pairing'>
                         Pair with: ${beer.food_pairing.join(', ')}
                     </div>
                 </div>
             </div>
            `; 
         });

        beersDiv.innerHTML = beerHTML
    } catch (error) {
        console.error(error)
    }
}

prevPage.addEventListener('click', ()=>{
    page--;
    getBeers()
})

nextPage.addEventListener('click', ()=>{
    page++;
    getBeers()
})
getBeers()




