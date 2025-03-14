console.log("Hello")

function removeActiveClass(){
  const activeBtn=document.getElementsByClassName("active")
  
  for(let btn of activeBtn){
    btn.classList.remove("active")
  }
}


function btnCategories (){
  // 1- fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  // 2- convert promise to json
  .then(response => response.json())
  // 3- send data to display
  .then(data => displayCategories(data.categories))
}

function loadVideos(searchText=""){
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(response => response.json())
  .then(data => {
    removeActiveClass();
    document.getElementById("btn-all").classList.add("active");
    displayVideos(data.videos);
  })
}


const loadVideosCaterogires=(id)=>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  // console.log(url);
  fetch(url)
  .then(response => response.json())
  .then(data => {
    removeActiveClass();
    const clickedBtn=document.getElementById(`btn-${id}`);
    clickedBtn.classList.add("active")
    console.log(clickedBtn)
    displayVideos(data.category)
  })

}

const loadVideoDetails = (videoID) => {
  console.log(videoID)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
  fetch (url)
  .then(response => response.json())
  .then(data => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
  console.log(video)
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full w-full shadow-sm">
    <figure>
      <img
        src="${video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${video.title}</h2>
      <p>${video.authors[0].profile_name}</p>
      <div class="card-actions justify-end">
      </div>
    </div>
  </div>
  `;

}


function displayCategories(categories){

  // 1- get the container
    const categoriesContainer = document.getElementById('button-category')

    // 2- loop operation of Array of object
    for (let cat of categories){

      // 3- create element
      const btnCategory = document.createElement("div")
      btnCategory.innerHTML=`
      <button id="btn-${cat.category_id}" onclick="loadVideosCaterogires(${cat.category_id})" class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${cat.category}</button>`

      // 4- append the element
      categoriesContainer.append(btnCategory)
    }

}

/* {
  "category_id": "1001",
  "video_id": "aaaa",
  "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
  "title": "Shape of You",
  "authors": [
      {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
      }
  ],
  "others": {
      "views": "100K",
      "posted_date": "16278"
  },
  "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
} */

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videosContainer.innerHTML = "";

  if (videos.length == 0) {
    videosContainer.innerHTML=`
     <div class="flex flex-col justify-center items-center mx-auto col-span-full text-center py-20">
      <img class="w-32" src="assets/Icon.png" alt="">
      <h1 class="text-2xl font-bold">Oops!! Sorry, There is no video here</h1>
    </div>
    `
  }

  videos.forEach((video) => {
    // console.log(videos)
    const videoElement = document.createElement("div");
    videoElement.innerHTML = `
    <div class="card bg-base-100 ">
      <figure class="relative">
        <img
          class="lg:w-full lg:h-44 object-cover"
          src="${video.thumbnail}"
          alt="Shoes" />
          <span class="absolute bottom-2 right-2 bg-slate-800 rounded-md text-white px-2 py-1">3h 56m ago</span>
      </figure>
      <div class=" flex gap-4 px-2 py-4">
        <div class="profile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>
        <div class="info">
          <h2 class="title font-semibold ">${video.title}</h2>
          <p class="flex gap-2 items-center  text-sm font-semibold text-gray-500">${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt="">` : ``}</p>
          <p class="views-title text-sm text-gray-500">${video.others.views}</p>
        </div>
      </div>
      <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
    </div>
    `;
    videosContainer.append(videoElement);
  });
};


document.getElementById('search-input').addEventListener("keyup",(e)=>{
  const input = e.target.value;
  loadVideos(input)
});

btnCategories();
loadVideos();