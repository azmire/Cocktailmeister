const cocktailCardTemplate = document.querySelector("#data-cocktail-template");
const cardContainer = document.querySelector("#data-card-container");
const searchInput = document.querySelector("#searchinput");
const searchBtn = document.querySelector("#searchbtn");

/* fetch data */
document.addEventListener("click", function (event) {
  if (event.target.id == "random-cocktail") {
    searchName = "random.php";
    fetchData();
  } else if (event.target.id == "searchbtn") {
    searchName = "search.php?s=" + searchInput.value.toLowerCase();
    fetchData();
  }
});
let searchName = "";

async function fetchData() {
  try {
    const urlSearch = `https://www.thecocktaildb.com/api/json/v1/1/${searchName}`;
    const response = await fetch(urlSearch);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    showCocktails(data);
  } catch (error) {
    console.log(error);
  }
}
let cocktails = [];
const showCocktails = (data) => {
  const container = document.querySelector("#data-card-container");

  container.innerHTML = "";
  cocktails = data.drinks.map((drink) => {
    const card = createCard(drink);
    container.appendChild(card);

    return {
      name: drink.strDrink,
      alcoholic: drink.strAlcoholic,
      category: drink.strCategory,
      ingredients: drink.strIngredient1,
      element: card,
    };
  });
};
function createCard(drink) {
  const drinkCard = document.createElement("div");
  const drinkMeasureList = document.createElement("ul");
  drinkCard.classList = "card";
  if (drink.strDrink) {
    const drinkName = document.createElement("h4");
    drinkName.classList = "card-body, card-title";
    drinkName.innerText = drink.strDrink;
    drinkCard.appendChild(drinkName);
  }
  if (drink.strDrinkThumb) {
    const drinkImg = document.createElement("img");
    drinkImg.classList = "card-img-top";
    drinkImg.style = "width: 100%";
    drinkImg.src = drink.strDrinkThumb;
    drinkCard.appendChild(drinkImg);
  }
  if (drink.strInstructions) {
    const drinkRecipe = document.createElement("p");
    drinkRecipe.classList = "card-body";
    drinkRecipe.innerText = drink.strInstructions;
    recipe = drink.strInstructions;
    drinkCard.appendChild(drinkRecipe);
  }
  if (drink.strMeasure1) {
    const drinkMeasure1 = document.createElement("li");
    drinkMeasure1.innerText = drink.strMeasure1 + " - " + drink.strIngredient1;
    drinkMeasureList.appendChild(drinkMeasure1);
    drinkCard.appendChild(drinkMeasureList);
  }
  if (drink.strMeasure2) {
    const drinkMeasure2 = document.createElement("li");
    drinkMeasure2.innerText = drink.strMeasure2 + " - " + drink.strIngredient2;
    drinkMeasureList.appendChild(drinkMeasure2);
    drinkCard.appendChild(drinkMeasureList);
  }
  if (drink.strMeasure3) {
    const drinkMeasure3 = document.createElement("li");
    drinkMeasure3.innerText = drink.strMeasure3 + " - " + drink.strIngredient3;
    drinkMeasureList.appendChild(drinkMeasure3);
    drinkCard.appendChild(drinkMeasureList);
  }
  if (drink.strMeasure4) {
    const drinkMeasure4 = document.createElement("li");
    drinkMeasure4.innerText = drink.strMeasure4 + " - " + drink.strIngredient4;
    drinkMeasureList.appendChild(drinkMeasure4);
    drinkCard.appendChild(drinkMeasureList);
  }
  if (drink.strMeasure5) {
    const drinkMeasure5 = document.createElement("li");
    drinkMeasure5.innerText = drink.strMeasure5 + " - " + drink.strIngredient5;
    drinkMeasureList.appendChild(drinkMeasure5);
    drinkCard.appendChild(drinkMeasureList);
  }
  if (drink.strMeasure6) {
    const drinkMeasure6 = document.createElement("li");
    drinkMeasure6.innerText = drink.strMeasure6 + " - " + drink.strIngredient6;
    drinkMeasureList.appendChild(drinkMeasure6);
    drinkCard.appendChild(drinkMeasureList);
  }
  const spanBtn = document.createElement("span");
  spanBtn.classList = "btn btn-primary";
  spanBtn.setAttribute("onclick", "addToFavs()");
  spanBtn.innerText = "Add to favourites";
  drinkCard.appendChild(spanBtn);
  return drinkCard;
}

/* filter by alcoholic */
const radioBtn = document.querySelectorAll("input[type=radio]");
const alcoholicRC = document.querySelector("#alcoholic");
const nonAlcoholicRC = document.querySelector("#nonalcoholic");
const allRC = document.querySelector("#all");
radioBtn.forEach((check) =>
  check.addEventListener("change", function () {
    cocktails.filter((drink) => {
      const alcoholic = drink.alcoholic;
      const isAlcoholic = alcoholicRC.checked && alcoholic == alcoholicRC.value;
      const isNonAlcoholic =
        nonAlcoholicRC.checked && alcoholic == nonAlcoholicRC.value;
      const isAll =
        (allRC.checked && alcoholic == alcoholicRC.value) ||
        alcoholic == nonAlcoholicRC.value;
      const isTypeAlcoholic = isAlcoholic || isNonAlcoholic || isAll;
      if (isTypeAlcoholic) {
        drink.element.classList.add("card");
        drink.element.classList.remove("hide");
      } else {
        drink.element.classList.add("hide");
      }
    });
  })
);
/* filter by type/ingredient */
const checkBtn = document.querySelectorAll("input[type=checkbox]");
const cocktailCB = document.querySelector("#cocktail");
const shotCB = document.querySelector("#shot");
const ordinaryCB = document.querySelector("#ordinarydrink");
const coffeeTeaCB = document.querySelector("#coffee");
const otherCB = document.querySelector("#other");
const ginCB = document.querySelector("#gin");
const amarettoCB = document.querySelector("#amaretto");
const rumCB = document.querySelector("#rum");
const vodkaCB = document.querySelector("#vodka");
const schnappsCB = document.querySelector("#schnapps");
const applejackCB = document.querySelector("#applejack");
const scotchCB = document.querySelector("#scotch");
const vermouthCB = document.querySelector("#vermouth");
const campariCB = document.querySelector("#campari");

checkBtn.forEach((check) =>
  check.addEventListener("change", function () {
    cocktails.filter((drink) => {
      const category = drink.category;
      const ingredient = drink.ingredients;

      const isCocktail = cocktailCB.checked && category == cocktailCB.value;
      const isShot = shotCB.checked && category == shotCB.value;
      const isOrdinary = ordinaryCB.checked && category == ordinaryCB.value;
      const isCoffeeTea = coffeeTeaCB.checked && category == coffeeTeaCB.value;
      const isOther = otherCB.checked && category == otherCB.value;
      const isGin = ginCB.checked && ingredient == ginCB.value;
      const isAmaretto = amarettoCB.checked && ingredient == amarettoCB.value;
      const isRum = rumCB.checked && ingredient == rumCB.value;
      const isVodka =
        (vodkaCB.checked && ingredient == vodkaCB.value) ||
        (vodkaCB.checked && ingredient.includes("vodka"));
      const isSchnapps = schnappsCB.checked && ingredient == schnappsCB.value;
      const isApplejack =
        applejackCB.checked && ingredient == applejackCB.value;
      const isScotch = scotchCB.checked && ingredient == scotchCB.value;
      const isVermouth = vermouthCB.checked && ingredient == vermouthCB.value;
      const isCampari = campariCB.checked && ingredient == campariCB.value;

      const isCategory =
        isCocktail || isShot || isOrdinary || isCoffeeTea || isOther;
      const isIngredient =
        isGin ||
        isAmaretto ||
        isRum ||
        isVodka ||
        isSchnapps ||
        isApplejack ||
        isScotch ||
        isVermouth ||
        isCampari;

      if (isCategory && isIngredient) {
        drink.element.classList.add("card");
        drink.element.classList.remove("hide");
      } else {
        drink.element.classList.add("hide");
      }
    });
  })
);

/* cardListener.addEventListener("click", function () {
  
}); */
/* save object in local storage */
/* let cocktailsSerialised = JSON.stringify("favourite");
localStorage.setItem("favourite", cocktailsSer);
localStorage.setItem("ime", cocktailsSerialised);
 */
/* retriewe object from local storage */
let myObjectDesirialized = JSON.parse(localStorage.getItem("ime"));

function addToFavs() {
  cocktails.filter((drink) => {
    let name = `${drink.strDrink}`;
    let btn = document.getElementsByName(name);
    console.log(btn);
  });
}

/* function containsCategory(categories, drink) {
  let categoryMatched = false;

  const drinkCategory = drink.category;
  categories.forEach((category) => {
    const checkedValue = category.value;
    const match = checkedValue === drinkCategory;
    if (match) {
      categoryMatched = true;
    }
  });
  return categoryMatched;
}

filters.forEach((checkbtn) =>
  checkbtn.addEventListener("change", function () {

    const categoryChecks = document.getElementById("categories");
    const checkedFields = categoryChecks.querySelectorAll("input:checked");

    const filteredCocktails = cocktails.filter((drink) => {

      const checkedCategory = containsCategory(checkedFields, drink);
      if (checkedCategory) {
        return drink;
      } 
});
    console.log("filteredCocktails :>> ", filteredCocktails);

  })
);*/
