$(document).ready(function(){

    // Get current time

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('timerPar').innerHTML =
        h + ":" + m + ":" + s;
        var t = setTimeout(startTime, 500);
      }

      function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
      }

      startTime();

        var tren;

        setTimeout(function(){

            tren = $('#temp').find('h3').html();


        if(tren >= 20 && tren <= 35){

            setTimeout(function(){

                document.getElementById('iconWeather').innerHTML = '<i class="fas fa-sun"></i>';

            },0)
    
        }

        if(tren > 12 && tren < 20){

            setTimeout(function(){

                document.getElementById('iconWeather').innerHTML = '<i class="fas fa-cloud-sun"></i>';

            },0)

        }

        if(tren > 2 && tren <= 12){

            setTimeout(function(){

                document.getElementById('iconWeather').innerHTML = '<i class="fas fa-snowflake"></i>';

            },0)

        }

    },200)


    fetch("https://api.openweathermap.org/data/2.5/weather?id=792680&appid=10c69e9bd27b2ce73925ead435eec23a")
  .then(response => response.json())
  .then(data =>  ispisi(data))

  .catch(err => console.log(err))



    function ispisi(data){

        var broj = data.main.temp - 273.15;

        var noviBroj = Math.round(broj);

        console.log(noviBroj)

        var element = document.createElement('h3');

        element.setAttribute('id','novi');

        var dodajMe = document.createTextNode(noviBroj);

        console.log(dodajMe)

        element.appendChild(dodajMe);

        console.log(dodajMe)

        document.getElementById('temp').appendChild(element);

    }

    const btn = document.querySelector(".talk");

const content = document.querySelector(".content");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {

    console.log('radi ovo sada');

}


btn.addEventListener('click', () => {

    recognition.start();

})

recognition.onresult = (event) => {

    const current = event.resultIndex;

    const text = event.results[current][0].transcript;

    content.textContent = text;

    setTimeout(readOutLoud(text),0);

}

var datum = new Date();

var vreme = datum.getHours();

var worked = window.speechSynthesis.getVoices();

function readOutLoud(message){

    const speech = new SpeechSynthesisUtterance();

    speech.voice = window.speechSynthesis.getVoices()[5];

    speech.text = "I am very sorry. I still didn't learn this sentence Alex.";

    // Prognoza i vreme

    if(message.includes("basic info") || message.includes("Basic info")){

        var weatherSentence = `Alex, it's`;
        
        if(vreme > 0 && vreme < 12){

            weatherSentence += `${vreme}AM in the morning.`;

        }

        if(vreme == 12){

            weatherSentence += `noon.`;

        }

        if(vreme > 12 && vreme <= 18){

            weatherSentence += `${vreme}PM in the afternoon.`;

        }

        if(vreme > 18 && vreme < 24){

            weatherSentence += `${vreme}PM in the evening.`;

        }
        
        weatherSentence += `. It is currently ${tren} degrees Celsius.`;

        if(Number(tren) >= 20 && Number(tren) < 30){

            weatherSentence += 'It is an optimal temperature. I recommend you go outside.';

        }


        speech.text = weatherSentence;

    }

    //

    speech.volume = 1;

    speech.rate = 0.84;

    window.speechSynthesis.speak(speech);

}

})
