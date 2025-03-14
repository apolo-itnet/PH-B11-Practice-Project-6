console.log("Hello")


function btnCategories (){
  // 1- fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  // 2- convert promise to json
  .then(response => response.json())
  // 3- send data to display
  .then(data => displayCategories(data.categories))
}

function loadvideos(){
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(response => response.json())
  .then(data => displayVideos(data.videos))
}

function displayCategories(categories){

  // 1- get the container
    const categoriesContainer = document.getElementById('button-category')

    // 2- loop operation of Array of object
    for (let cat of categories){

      // 3- create element
      const btnCategory = document.createElement("div")
      btnCategory.innerHTML=`
      <button class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>`

      // 4- append the element
      categoriesContainer.append(btnCategory)
    }

}

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container")

  videos.forEach((video) => {
    console.log(videos)
  });
};


btnCategories();
loadvideos();