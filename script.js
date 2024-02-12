let currentSong = new Audio();

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let tds = div.getElementsByTagName("td");
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playMusic = (track) => {
  currentSong.src = "/songs/" + track;
  // let audio=new Audio("/songs/"+ track)
  currentSong.play();
  play.src="pause.svg"
};
async function main() {
  //get the list of all the songs
  let songs = await getSongs();
  console.log(songs);
  //show all the songs in the playlist
  let songUL = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        
        
        <img class="invert" src="music.svg" alt="" />
        <div class="info">
          <div class="songname">${song.replaceAll("%20", " ")}</div>
          <div class="songartist">Arham</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="play.svg" alt="" />
        </div>
      


       </li>`;
  }

  Array.from(
    document.querySelector(".songsList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src="pause.svg"
    }else{
        currentSong.pause()
        play.src="play.svg"
    }
  })
}
main();
