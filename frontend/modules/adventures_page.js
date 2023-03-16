
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 if(search) {
  return search.split("=")[1]
 }

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
 
  const divEl = document.createElement("div");   
  divEl.className = "row ";
  adventures.forEach(el => {
   
    divEl.innerHTML += `
    <div class="col-12 col-sm-6 col-lg-3 mb-3">
    <a  href="../adventures/detail/?adventure=${el.id}"  id="${el.id}" >
    <div class="card activity-card">
    <img src="${el.image}">
    <div class="category-banner">${el.category}</div>
    <div class="card-body col-md-12 mt-2">
    <div class="d-flex justify-content-between">
    <p>${el.name}</p>
    <p>₹ ${el.costPerHead}</p>
    </div>
    <div class="d-flex justify-content-between">
    <p>Duration</p
    ><p>${el.duration}</p>
    </div>
    </div>
    </div>
    </a>
    </div>
  `;

  }) 

  document.getElementById("data").appendChild(divEl);

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredList=list.filter(function(el){
    return (el.duration>=low && el.duration<=high);
  })
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list



  let filterList=[];
  console.log(list);
  list.filter(function (el) {
    if(categoryList.includes(el.category))
    filterList.push(el);   
      });
      return filterList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredlist =[]
  let arr=filters["duration"].split("-");

  if(filters["category"].length>0&&filters["duration"].length>0){

    filteredlist=filterByCategory(list,filters.category)
    filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
   }else if(filters["category"].length>0){
     filteredlist=filterByCategory(list,filters.category);
   }else if(filters["duration"].length>0){
    filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
   }else{
     return list;
   }
  // Place holder for functionality to work in the Stubs
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterData = JSON.parse(localStorage.getItem('filters'));
 
  // Place holder for functionality to work in the Stubs
  return filterData;
}
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  let categoryList=filters["category"];
   let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  console.log(li);
  for(let i=0;i<li.length;i++)
  {
    console.log(li[i]);
    const div=document.createElement("div");
    div.className ="category-filter";
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
