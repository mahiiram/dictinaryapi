


const input = document.getElementById('input');
const button = document.getElementById('button-search');
const apikey = '4022ecd7-7209-410d-9942-5c471efd9900';
const notfound = document.querySelector('.not_found')
const para=document.querySelector('.para')
const audio = document.querySelector('.audio')




button.addEventListener('click',e =>{
    e.preventDefault();
   const word = input.value;
   if(word === ""){
    alert("Please Type any word! ")
   }
   dataGet(word)
   audio.innerHTML="";
   notfound.innerText="";
   para.innerText="";
})

async function dataGet(word){
 const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
  const data= await response.json()
  console.log(data)
  if(!data.length>0){
    notfound.innerText= "No results Found"
    return;
  }
  if(typeof data[0] === 'string'){
      let heading =document.getElementById('heading')
      heading.innerText = "Did you mean?"
  


     data.map(element => {
        let suggestion= document.getElementById('span');
        suggestion.innerText = element    
    })
    return;
  }
  let definition= data[0].shortdef[0];
  para.innerText=definition;
  
  let audiorender=data[0].hwi.prs[0].sound.audio;
  if(audiorender){
    soundrender(audiorender)
  }
}
function soundrender(audiorender){
  let audiofolder = audiorender.charAt(0);
  let soundsrc = `https://media.merriam-webster.com/soundc11/${audiofolder}/${audiorender}.wav?key=${apikey}`
  let aud = document.createElement('audio')
  aud.src=soundsrc;
  aud.controls=true;
  audio.appendChild(aud)
  
}
