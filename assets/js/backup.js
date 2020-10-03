$(document).ready(function(){

    // Pozivanje funckije za prikaz sume svih producta

    updateNutrientSum();

    // Dugme za birsanje producta
    
    $(document).on('click', '.removeProductButton', function(){

        console.log(this.dataset.idproduct)

        var dataProductId = this.dataset.idproduct;

        if(localStorage){

            var productsFromLocalStorageToRemove = JSON.parse(localStorage.getItem('products'));

            for(let el of productsFromLocalStorageToRemove){

                if(el[1] == dataProductId){

                    const indexOfProductFromLocal = productsFromLocalStorageToRemove.indexOf(el);

                    console.log(indexOfProductFromLocal)

                    if(indexOfProductFromLocal > -1){

                        productsFromLocalStorageToRemove.splice(indexOfProductFromLocal, 1);

                        localStorage.setItem('products', JSON.stringify(productsFromLocalStorageToRemove));

                        console.log(productsFromLocalStorageToRemove.length)

                        printProductsFromLocal();

                        updateNutrientSum();

                    }

                }

            }
        
                if(localStorage.getItem('products').length == 2){
        
                    document.getElementById('noProducts').innerHTML = "You didn't add any products yet, Alex.";
        
                }
    
        }

    })

    // Prikaz producta iz localStorage ako imamo neke, ako ne menjamo naslov

    if(localStorage){

        if(localStorage.getItem('products') && localStorage.getItem('products').length != 2){

            document.getElementById('noProducts').innerHTML = "List of added products, Alex.";

            printProductsFromLocal();

        }

        else{

            document.getElementById('noProducts').innerHTML = "You didn't add any products yet, Alex.";

        }

    }

    // Ajax za foodAndDrinks.json

    $.ajax({

        url : "assets//foodAndDrinks.json",
        method : "GET",
        dataType : 'json',
        success : function(data){

            console.log(data);
            fillTheSelect(data);

        },
        error : function(err, type, msg){

            console.log(type);

        }

    })

    // Local storage ispis za vodu

    if(localStorage){

        var resetWaterTimer = new Date();

        if(localStorage.getItem('dayIndex')){

            if(localStorage.getItem('dayIndex') != resetWaterTimer.getDay()){

                localStorage.removeItem('waterAmountAndHeight');

                localStorage.removeItem('products');

                localStorage.setItem('dayIndex', resetWaterTimer.getDay());

            }
            
        }

        else{

            localStorage.setItem('dayIndex', resetWaterTimer.getDay());

        }

    }

    if(localStorage){

        if(localStorage.getItem('waterAmountAndHeight')){

            console.log(JSON.parse(localStorage.getItem('waterAmountAndHeight')))

            var arrForWater = JSON.parse(localStorage.getItem('waterAmountAndHeight'));

            document.getElementById('currentWaterValue').innerHTML = arrForWater[0];

            document.querySelector('.animatedWater').style.height = arrForWater[1] + '%';

        }

    }

    // Event delegation na Ikseve i Stiklirane znakove za taskove

    $(document).on('click', '#tasksDone', function(){

        var checkedBoxes = [];

    for(let el of taskBoxes){

        if(el.classList.contains('taskBoxChecked')){

            checkedBoxes.push(el.dataset.idtask);

        }

    }

    console.log(taskBoxes);

    console.log(checkedBoxes)

    var pushNotDeleted = [];

    var countMeIn = 0;

    if(localStorage){

        if(localStorage.getItem('tasks').length != 0){

            var newLocalTasks = JSON.parse(localStorage.getItem('tasks'));

            for(let el of checkedBoxes){

                for(let elem of newLocalTasks){

                    if(Number(el) == elem[1]){

                        pushNotDeleted.push(elem);

                    }

                }

            }

        }

    }

    console.log(pushNotDeleted)

    var newListOfTasks = newLocalTasks.filter(function(el){

        return pushNotDeleted.indexOf(el) == -1;

    })

    localStorage.setItem('tasks', JSON.stringify(newListOfTasks));

    console.log(JSON.parse(localStorage.getItem('tasks')).length)

     if(JSON.parse(localStorage.getItem('tasks')).length == 0){

         localStorage.removeItem('tasks');

     }

    localStorageIspis();

    $(this).css('display', 'none');

    })

    //

    // Ispisi zadatake iz local storage-a ako ih ima

    localStorageIspis();

    //

    // Calculate days till montly anniversary

    // Ako je dan izmedju 1 i 24

    var dateCurrent = new Date();

    var currentDay = dateCurrent.getDate();

    console.log(currentDay)

    if(currentDay >= 1 && currentDay < 25){

        var printDays = 25 - currentDay;
        
        document.getElementById('printDays').innerHTML = printDays;

    }

    if(currentDay == 25){

        document.getElementById('printDays').innerHTML = '';

        document.getElementById('prviOpcioni').innerHTML = 'Today is your';

        $("#prviOpcioni").css({'font-size' : '2.1em', 'color' : 'orange'})

    }

    if(currentDay > 25 && currentDay <= 31){

        var dateNow = new Date();

        var monthNow = dateNow.getMonth() + 2;

        var nextDate = new Date(monthNow + '/25/2020');

        var firstTime = dateNow.getTime();

        var secondTime = nextDate.getTime();

        var timeDifference = secondTime - firstTime;

        var differenceInDays = timeDifference / (1000 * 3600 * 24);

        document.getElementById('printDays').innerHTML = Math.ceil(differenceInDays);

    }

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

// Funckije koje se koriste i za neki button i za voice command

    function taskHandle(){

        setTimeout(function(){

            $('.taskAdd').css("transform", "translateY(0px)");

        },1600)

    }


//


// Hvatanje temperature


const btn = document.querySelector(".talk");

const content = document.querySelector(".content");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = () => {

    console.log('radi ovo sada');

}

recognition.onresult = (event) => {

    const current = event.resultIndex;

    const text = event.results[current][0].transcript;

    content.textContent = text;

    setTimeout(readOutLoud(text),0);

}

btn.addEventListener('click', () => {

    recognition.start();

})

var datum = new Date();

var vreme = datum.getHours();

console.log(vreme)

// Uzmi glasove 

var worked = window.speechSynthesis.getVoices();

// Funckija za button za cekirane taskove

var nizot = [2,3,6];

console.log(nizot.splice(1,1));

console.log(nizot)

// Funkcija za prikaz dugmeta za zadatake samo ako je cekiran neki zadatak kao zavrsen

    var taskBoxes = document.getElementsByClassName('taskBox');

    $(document).on('click', '.taskBox', function(){

        if($(this).hasClass('taskBoxChecked')){

            $(this).find('i').addClass('fa-times');

            $(this).find('i').removeClass('fa-check');

            $(this).find('i').css('color', 'tomato');

            $(this).removeClass('taskBoxChecked');

        }

        else{

            $(this).addClass('taskBoxChecked');

            $(this).find('i').addClass('fa-check');

            $(this).find('i').removeClass('fa-times');

            $(this).find('i').css('color', '#3cdb3c');

        }

        var checkedCounter = 0;

        for(let i = 0 ; i < taskBoxes.length ; i++){

            if(taskBoxes[i].classList.contains('taskBoxChecked')){

                checkedCounter++;

            }

        }

        if(checkedCounter == 0){

            $('#tasksDone').css("display", "none");

        }

        else{

            $('#tasksDone').css("display", "block");

        }

        console.log(checkedCounter)

    })


// Globalne funckije

    // Prikaz ukupnog  unosa ako ima nekog proizvoda u localStorage

    function updateNutrientSum(){

        if(localStorage){

            if(localStorage.getItem('products') && localStorage.getItem('products').length != 2){

                document.querySelector('.showNutrientsSum').style.display = 'block';

                var localProductsAgain = JSON.parse(localStorage.getItem('products'));

                var sumCalories = 0, sumProtein = 0, sumCarbs = 0, sumFats = 0;

                for(let el of localProductsAgain){

                    sumCalories += el[0].calories;

                    sumProtein += el[0].protein;

                    sumCarbs += el[0].carbs;

                    sumFats += el[0].fats;

                }

                document.getElementById('totalsCaloriesHeader').innerHTML = sumCalories.toFixed(2);

                document.getElementById('totalsProteinHeader').innerHTML = sumProtein.toFixed(2) + ' g';

                document.getElementById('totalsCarbsHeader').innerHTML = sumCarbs.toFixed(2) + ' g';

                document.getElementById('totalsFatsHeader').innerHTML = sumFats.toFixed(2) + ' g';

            }

            else{

                document.querySelector('.showNutrientsSum').style.display = 'none';

            }

        }

    }

    // Ispis producta iz local storage-a

    function printProductsFromLocal(){

        if(localStorage){

            var productsFromLocalStorage = JSON.parse(localStorage.getItem('products'));

            var ispis = '';

            var newNutrientVal;

            for(let elem of productsFromLocalStorage){

            ispis += `<div class="productFromLocal">

                    <div class="productPictureLocal">
                          
                        <img src="assets/img/${elem[0].url}" alt="${elem[0].name}"/>
                          
                        <h3>${elem[0].name} (${elem[0].weightAndType.weight}${elem[0].weightAndType.type})</h3>
                          
                    </div>
                          
                    <div class="productCaloriesLocal">
                          
                        <i class='fas caloriesFafa fa-fire-alt'></i>
                          
                        <p>${elem[0].calories.toFixed(2)} calories</p>
                          
                    </div>
                          
                    <div class="nutrientsFromLocal">
                          
                        <div class="productCarbsLocal productNutrientLocalBox">
                          
                            <h3>Carbs</h3>
                            
                            <i class='fas fa-bread-slice'></i>
                            
                            <p>${(elem[0].carbs).toFixed(2)} g</p>
                            
                        </div>
                            
                        <div class="productProteinLocal productNutrientLocalBox">
                            
                            <h3>Protein</h3>
                            
                            <i class='fas fa-drumstick-bite'></i>
                            
                            <p>${(elem[0].protein).toFixed(2)} g</p>
                            
                        </div>
                            
                        <div class="productFatsLocal productNutrientLocalBox">
                            
                            <h3>Fats</h3>
                            
                            <i class='fas fa-oil-can'></i>
                            
                            <p>${(elem[0].fats).toFixed(2)} g</p>
                            
                        </div>
                          
                    </div>

                    <button class="removeProductButton" data-idProduct="${elem[1]}">Remove this product</button>
                          
                </div>`;

            }

            document.querySelector('.productsPrint').innerHTML = ispis;

        }

    }

    // Dropdown punjenje hranom i picima

    function fillTheSelect(data){

        var printIt = '';

        for(let el of data){

            printIt += `<option value=${el.id}>${el.name}</option>`;

        }

        document.getElementById("selectFood").innerHTML = printIt;

    }

    // Funckija za prikaz hrane

    document.getElementById('selectFood').addEventListener('change', function(){

        var valueOfTheFoodOrDrink = this.value;

        $.ajax({

            url : "assets//foodAndDrinks.json",
            method : "GET",
            dataType : 'json',
            success : function(data){
    
                var oneFoodOrDrink;

                oneFoodOrDrink = data.filter(function(el){

                    if(el.id == valueOfTheFoodOrDrink){

                        return true;

                    }

                })

                console.log(oneFoodOrDrink)

                for(let foodOrDrink of oneFoodOrDrink){

                    document.getElementById('nameOfTheFoodOrDrink').innerHTML = foodOrDrink.name;

                    document.getElementById('foodOrDrinkImg').src = 'assets/img/' + foodOrDrink.url;

                    document.getElementById('foodOrDrinkImg').alt = foodOrDrink.name;

                    document.getElementById('weightValue').innerHTML = foodOrDrink.weightAndType.weight;

                    document.getElementById('gramsOrLitres').innerHTML = foodOrDrink.weightAndType.type;

                    document.getElementById('calorieAmount').innerHTML = foodOrDrink.calories;

                    document.getElementById('proteinValue').innerHTML = foodOrDrink.protein;

                    document.getElementById('fatsValue').innerHTML = foodOrDrink.fats;

                    document.getElementById('carbsValue').innerHTML = foodOrDrink.carbs;

                }
    
            },
            error : function(err, type, msg){
    
                console.log(type);
    
            }
    
        })

    })

    // Local Storage ispis

    function localStorageIspis(){

        if(localStorage){

            if(!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length == 0){
    
                document.querySelector('.tasksHolder').innerHTML = '';

                var elementH3 = document.createElement('h3');

                elementH3.setAttribute('id', 'noTasksHere');

                var vrednost = document.createTextNode('You have no task currently, Alex');

                elementH3.appendChild(vrednost);

                document.querySelector('.tasksHolder').appendChild(elementH3);

                // document.getElementById('noTasksHere').innerHTML = 'There are no tasks at the moment';
    
            }
    
            else{
    
                tasksShow();
    
            }
    
        }

    }

    //

    // Funckija za prikaz taskova iz local storage-a

    function tasksShow() {
        
        var tasksLocal = JSON.parse(localStorage.getItem('tasks'));

            var printTasks = '';
                
            for(let el of tasksLocal){

                printTasks += `<div class="task">

                    <p>${el[0]}</p>
      
                    <div data-idTask='${el[1]}' class='taskBox'>
      
                        <i class="fas fa-times"></i>
      
                    </div>
      
                  </div>`;

            }

            document.querySelector('.tasksHolder').innerHTML = printTasks;

    }

    //

//




function readOutLoud(message){

    const speech = new SpeechSynthesisUtterance();

    speech.voice = window.speechSynthesis.getVoices()[5];

    speech.text = "I am very sorry. I still didn't learn this sentence Alex.";


    // RECENICE
    
    // Dodatne informacije o proteinima, mastima i hidratima

    if(message.includes("nutrients info") || message.includes("nutrient info") || message.includes("info nutrients") || message.includes("nutrijent info")){

        if(localStorage){

            var nutrientsInfoSentence = '';

            if(localStorage.getItem('products') && localStorage.getItem('products').length != 2){

                var localStorageInfoNutrients = JSON.parse(localStorage.getItem('products'));

                var caloriesSumInfo = 0, proteinSumInfo = 0, carbsSumInfo = 0, fatsSumInfo = 0;

                for(let el of localStorageInfoNutrients){

                    caloriesSumInfo += el[0].calories;

                    proteinSumInfo += el[0].protein;

                    carbsSumInfo += el[0].carbs;

                    fatsSumInfo += el[0].fats;

                }

                nutrientsInfoSentence = 'Alex';

                // Recenice za kalorije

                if(caloriesSumInfo > 0 && caloriesSumInfo < 2000){

                    nutrientsInfoSentence += `,You still have room for more calories`;

                }

                else{

                    nutrientsInfoSentence += `, You consumed ${Number(caloriesSumInfo - 2000).toFixed(0)} more calories then you should`;

                }

                // Recenice za proteine

                if(proteinSumInfo > 0 && proteinSumInfo <= 100){

                    nutrientsInfoSentence += `, your protein intake is still pretty low, `;

                }

                if(proteinSumInfo > 100 && proteinSumInfo < 150){

                    nutrientsInfoSentence += `, you still need some more protein, but your intake is pretty good,`;

                }

                if(proteinSumInfo > 150){

                    nutrientsInfoSentence += `, you consumed more protein then recommended amount, but that is not bad,`;

                }

                // Recenice za carbs

                if(carbsSumInfo < 100){

                    nutrientsInfoSentence += `, you can consume more carbs`;

                }

                else{

                    nutrientsInfoSentence += `, you consumed more carbs then you should`;

                }

                // Recenice za fats

                if(fatsSumInfo < 50){

                    nutrientsInfoSentence += `, your fats intake is great`;

                }

                else{

                    nutrientsInfoSentence += `, you consumed more fats then you should`;

                }

            }

            else{

                nutrientsInfoSentence = `I have no products to calculate, Alex`;

            }

        }

        speech.text = nutrientsInfoSentence;

    }

    // Sabiranje kalorija, ugljenih i masti

    if(message.includes("calculate nutrients") || message.includes("calculate nutrient")){

        var calculateNutrientsSentence = '';

        if(localStorage){

            if(localStorage.getItem('products') && localStorage.getItem('products').length != 2){

                var getWaterLocal;

                if(localStorage.getItem('waterAmountAndHeight') && localStorage.getItem('waterAmountAndHeight').length != 2){

                    getWaterLocal = JSON.parse(localStorage.getItem('waterAmountAndHeight'));

                }

                else{

                    getWaterLocal = 0;

                }

                var localSumUp = JSON.parse(localStorage.getItem('products'));

                var caloriesSum = 0, proteinSum = 0, carbsSum = 0, fatsSum = 0;

                for(let el of localSumUp){

                    caloriesSum += el[0].calories;

                    proteinSum += el[0].protein;

                    carbsSum += el[0].carbs;

                    fatsSum += el[0].fats;

                }

                console.log(caloriesSum)

                if(getWaterLocal == 0 || Number(getWaterLocal[0]) == 0){

                    calculateNutrientsSentence = `Alex, you didn't consume any water today`;

                }

                else{

                    calculateNutrientsSentence = `Alex, today you consumed ${Number(getWaterLocal[0])} litres of water.`;

                }
                
                if(caloriesSum == 0){

                    calculateNutrientsSentence += `,also you didn't add any other product yet.`;                    

                }

                else{

                    calculateNutrientsSentence += `, you consumed ${Math.round(caloriesSum)} calories, ${Math.round(proteinSum)} grams of protein, ${Math.round(carbsSum)} grams of carbs, and ${Math.round(fatsSum)} grams of fats.`;

                }

            }

            else{

                calculateNutrientsSentence = 'There are no products to sum up, Alex.';

            }

        }
        else{

            calculateNutrientsSentence = 'Please stop using Internet Explorer, you absolute madman.';

        }

        speech.text = calculateNutrientsSentence;

    }
    
    // Dodavanje hrane ili pica

    if(message.includes("insert product") || message.includes("insert Product")){

        var productValue = document.getElementById("selectFood").value;

        console.log(productValue);

        var productSentence = '';

        if(productValue == ''){

            productSentence = "You did not choose any product, Alex.";

        }

        else{

            document.getElementById('noProducts').innerHTML = "List of added products, Alex.";

            var optionalWeight = document.getElementById('weightOfProduct').value;

            $.ajax({

                url : "assets//foodAndDrinks.json",
                method : "GET",
                dataType : 'json',
                success : function(data){
        
                    for(let el of data){

                        if(el.id == productValue){

                            // Ovo se izvrsava samo ako korisnik unese gramazu

                            if(optionalWeight != '' && optionalWeight > 0 && optionalWeight.length < 5){

                                var newProductPercentage = optionalWeight / el.weightAndType.weight;

                                el.weightAndType.weight = optionalWeight;

                                el.changedWeight = true;

                                el.calories = newProductPercentage * el.calories;

                                el.protein = newProductPercentage * el.protein;

                                el.carbs = newProductPercentage * el.carbs;

                                el.fats = newProductPercentage * el.fats;

                            }

                            if(localStorage){

                                var idProduct;

                                var productArray = [];

                                if(!localStorage.getItem('products')){

                                    idProduct = 1;

                                    productArray.push([el, idProduct]);

                                    localStorage.setItem('products', JSON.stringify(productArray));

                                }

                                else{

                                    var currentProducts = JSON.parse(localStorage.getItem('products'));

                                    console.log(currentProducts)

                                    var maxIdProduct = 0;

                                    for(let el of currentProducts){

                                        if(el[1] > maxIdProduct){

                                            maxIdProduct = el[1];

                                        }

                                    }

                                    idProduct = maxIdProduct + 1;

                                    productArray = [el, idProduct];

                                    currentProducts.push(productArray);

                                    localStorage.setItem('products', JSON.stringify(currentProducts));

                                }

                            }

                            else{

                                productSentence = 'Stop using Internet Explorer, bro.';                                

                            }

                        }

                    }

                    printProductsFromLocal();

                    updateNutrientSum();

                    document.getElementById('weightOfProduct').value = '';
        
                },
                error : function(err, type, msg){
        
                    console.log(type);
        
                }
        
            })

            if(optionalWeight.length < 5 && optionalWeight != ''){

                productSentence = "A product has been added, Alex.";
    
            }
    
            else{
    
                productSentence = "I added a regular amount of weight Alex, because you didn't type in your weight, or you put a weight that is too big.";
    
            }

        }

        speech.text = productSentence;

    }

    // Menjanje boje animacije

    var objekatBoja = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkgrey": "#a9a9a9",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkslategrey": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dimgrey": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "goldenrod": "#daa520",
        "gold": "#ffd700",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "grey": "#808080",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavenderblush": "#fff0f5",
        "lavender": "#e6e6fa",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgray": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightgrey": "#d3d3d3",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightslategrey": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#db7093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "slategrey": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
      };

      var bojaBool = false;
      
      var poruka = message.toLowerCase();
      

      for(let boja in objekatBoja){

        if(poruka.includes(boja)){

            bojaBool = true;

            $('.light').css('fill', boja);

        }

      }

      if(bojaBool){

        speech.text = 'It has been done, Alex.';

      }

      console.log(objekatBoja)

    // How are you poruka

    if(message.includes('how are you') || message.includes('How are you')){

        speech.text = "I am feeling very smart today Alex. thank you for asking. How are you today ?";

    }

    // Voda

    if(message.includes("insert Aqua") || message.includes("Inter Aqua")){

        var waterValue = document.getElementById('currentWaterValue').innerHTML;

        console.log(waterValue);

        var messageWater = '';

        if(waterValue == '2.0'){

            messageWater = 'Alex, I will not add this because you already reached your limit of 2 litres of water. You can drink more water, but I dont recommend that.';

        }

        else{

            waterValue = (Number(waterValue) + 0.2).toFixed(1);

            document.getElementById('currentWaterValue').innerHTML = waterValue;

            var waterPercentage = 100/(2/waterValue).toFixed(2);

            if(localStorage){

                var localWaterArr = [waterValue, waterPercentage];

                localStorage.setItem('waterAmountAndHeight', JSON.stringify(localWaterArr));

            }

            else{

                messageWater = 'Stop using Internet Explorer, it does not support local storage !';

            }

            document.querySelector('.animatedWater').style.height = waterPercentage + '%';

            messageWater = 'I have updated your water intake Alex';

        }

        speech.text = messageWater;

    }

    if(message.includes('remove Aqua')){

        var waterValue = document.getElementById('currentWaterValue').innerHTML;

        var waterDownSentence = '';

        if(waterValue == '0.0' || waterValue == '0'){

            waterDownSentence = 'Your water intake is already at 0 litres Alex. I cant substract any more.'

        }

        else{

            waterValue = (Number(waterValue) - 0.2).toFixed(1);

            document.getElementById('currentWaterValue').innerHTML = waterValue;

            var waterPercentage = 100/(2/waterValue).toFixed(2);

            if(localStorage){

                var localWaterArr = [waterValue, waterPercentage];

                localStorage.setItem('waterAmountAndHeight', JSON.stringify(localWaterArr));

            }

            else{

                waterDownSentence = 'Stop using Internet Explorer, it does not support local storage !';

            }

            document.querySelector('.animatedWater').style.height = waterPercentage + '%';

            waterDownSentence = 'I have updated your water intake Alex';

        }

        speech.text = waterDownSentence;

    }

    // Prikaz task pop up-a

    if(message.includes('new task')){

        if($('.taskAdd').hasClass('taskShown')){

            console.log('ovde sam');

            return;

        }

        taskHandle();

        speech.text = "Just type in the new task here Alex. I will take care of the rest.";

        $('.taskAdd').addClass('taskShown');

    }

    //

    // Skloni zadatak pop up i prikazi zadatke iz local storage

    

    // Dodaj zadatak

    if(message.includes('insert task') && $('.taskAdd').hasClass('taskShown')){

        var vrednostTaska = document.getElementById('taskField').value;

        var localTasks = [];

        var taskSentence = '';

        if(vrednostTaska != ''){

            if(localStorage){

                if(JSON.parse(localStorage.getItem('tasks'))){

                    var noviTask = JSON.parse(localStorage.getItem('tasks'));

                    var newMaximum = 0;

                    for(let el of noviTask){

                        console.log(el)

                        if(el[1] > newMaximum){

                            newMaximum = el[1];

                        }

                    }

                    console.log(newMaximum);

                    var brojTaskova = newMaximum + 1;

                    var newTaskArray = [vrednostTaska, brojTaskova];

                    noviTask.push(newTaskArray);

                    localStorage.setItem('tasks', JSON.stringify(noviTask));

                    taskSentence += 'The task has been added Alex.';

                    document.getElementById('taskField').value = '';

                    tasksShow();

                }

                else{

                    var newTaskArray = [vrednostTaska, 1];

                    localTasks.push(newTaskArray);

                    console.log(localTasks);

                    localStorage.setItem('tasks', JSON.stringify(localTasks));

                    taskSentence += 'The task has been added Alex.';

                    document.getElementById('taskField').value = '';

                    tasksShow();

                }

            }

            else{

                taskSentence += 'Your browser does not support local storage. Please stop using Internet Explorer.';

            }

        }

        else{

            taskSentence += 'You have to type in something first Alex';

        }

        speech.text = taskSentence;

    }

    //

    //

    // Zatvori pop-upove

    if(message.includes('close') || message.includes('zatvori')){

        var closeSentence = '';

        if($('.locationHolder').hasClass('locationShown')){

            setTimeout(function(){

                $('.locationHolder').css('transform', 'translateY(-1500px)');
    
            }, 2000);

            closeSentence = 'Right away, Alex.';

            $('.locationHolder').removeClass('locationShown');

        }

        else if($('.taskAdd').hasClass('taskShown')){

            setTimeout(function(){

                $('.taskAdd').css('transform', 'translateY(-1500px)');
    
            }, 2000);

            $('.taskAdd').removeClass('taskShown');

            closeSentence = 'Right away, Alex.';

        }

        else{

            closeSentence = 'There is nothing to close Alex.';

        }

        speech.text = closeSentence;

    }

    //

    // Sve za Ljubicu

    var dani = ['7', '14', '21', '27', '2'];

        var placesToGoOut = [['Slatkoteka', 'Bulevar kralja Aleksandra 52', 'https://media-cdn.tripadvisor.com/media/photo-s/18/14/83/53/donuts.jpg'], ['Vila Maska', 'Rankelova 7', 'https://media-cdn.tripadvisor.com/media/photo-s/14/26/e3/41/villa-maska.jpg'], ['Blaznavac', 'Ulica Kneginje Ljubice 18', 'https://belgrade-beat.rs/photos/venues/4/c-1495128655.jpg'], ['Jazz Garden', 'Karadjordjeva 43', 'https://www.u-beogradu.com/uploads/2014/10/jazz-basta-karadjordjeva-male-stepenice.jpg'], ['Pijaca Bar', 'Nikole Spasica 5', 'https://media-cdn.tripadvisor.com/media/photo-s/0b/42/33/38/interrior.jpg'], ['The Pijaca', 'Vojvode Dozenskog 4', 'https://a4studio.rs/wp-content/uploads/2019/09/The-Pijaca-h4.jpg'], ['Dvoristance','Cetinjska 15', 'https://www.gdecemo.rs/uploads/2017/04/wsi-imageoptim-15895205_1706363859604267_1593504218799526464_n.jpg'], ['Tegla Bar', 'Ulica Baba Visnjina 48', 'https://www.u-beogradu.com/uploads/2015/07/tegla-bar-vracar-02.jpg'], ['Milky', 'Ulica Kneginje Ljubice 10', 'https://www.biznisgroup.com/wp-content/uploads/2018/11/47390858_308406043338051_1430241650214436864_n-600x450.jpg']];


    if($('.locationHolder').hasClass('locationShown') && message.includes('another place')){

        var newRandomPlaceNum = Math.floor(Math.random() * placesToGoOut.length);

        var todaysPlace = placesToGoOut[newRandomPlaceNum];

        document.getElementById('pictureOfAPlace').alt = todaysPlace[0];

        document.getElementById('locationOfThePlacePar').innerHTML = todaysPlace[1];

        document.getElementById('nameOfThePlace').innerHTML = todaysPlace[0];
                
        document.getElementById('pictureOfAPlace').src= todaysPlace[2];

        var newSentence = 'Yes, Alex.';

        speech.text = newSentence;

    }


    if(message.includes('girlfriend')){

        var randomPlaceNum = Math.floor(Math.random() * placesToGoOut.length);

        console.log($('.content').html());

        var dayInTheArray = new Date().getDate();

        var potentialNewPlace = '';

        if($('.locationHolder').hasClass('locationShown')){

            return;

        }


        var girlSentence = 'Alex, '

        if(document.getElementById('printDays').innerHTML == ''){

            girlSentence += 'today is your montly anniversary. Go celebrate, you are doing an amazing job. Don"t forget to take her somewhere.';

        }

        else{

            girlSentence += 'there are ' + document.getElementById('printDays').innerHTML + ' days untill your monthly anniversary. I am glad that you are happy !';

            var placeBool = false;

            for(let i = 0 ; i < dani.length ; i++){

                if(dani[i] == String(dayInTheArray) && dani[i] != '25'){

                    placeBool = true;

                }

            }

            if(placeBool){

                var todaysPlace = placesToGoOut[randomPlaceNum];

                girlSentence += "For today I recommend you go to" + todaysPlace[0] + '. Here is the location of this place. Enjoy.';

                document.getElementById('pictureOfAPlace').alt = todaysPlace[0];

                document.getElementById('locationOfThePlacePar').innerHTML = todaysPlace[1];

                document.getElementById('nameOfThePlace').innerHTML = todaysPlace[0];
                
                document.getElementById('pictureOfAPlace').src= todaysPlace[2];

                $('.locationHolder').addClass('locationShown');

                setTimeout(function(){

                    $('.locationHolder').css('transform', 'translateY(0px)');

                }, 11600);


            }

            else{

                girlSentence += 'I will be sure to remind you to take her out to some interesting place every couple of days.';

            }
        

        }

        speech.text = girlSentence;

    }

    //

    // Delete All tasks

    if(message.includes('delete all')){

        var deleteAllSentence = '';

        if(localStorage){

            if(!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length == 0){

                deleteAllSentence += 'There are no tasks to delete, Alex.';

            }

            else{

                localStorage.removeItem('tasks');

                document.querySelector('.tasksHolder').innerHTML = '';

                var noTasksHeader = document.createElement("h3");

                noTasksHeader.setAttribute('id','noTasksHere');

                var noTasksHeaderContent = document.createTextNode('There are currently no tasks');

                console.log(noTasksHeaderContent)

                noTasksHeader.appendChild(noTasksHeaderContent);

                console.log(noTasksHeader)

                document.querySelector('.tasksHolder').appendChild(noTasksHeader);

                deleteAllSentence += 'All tasks deleted Alex.';

            }

        }

        else{

            deleteAllSentence += 'Your browser does not support local storage. Please stop using Internet Explorer.';

        }

        speech.text = deleteAllSentence;
        
    }    

    //

    // Poruka za laku noc

    if(message.includes('good night') || message.includes('goodnight') || message.includes('GOOD NIGHT') || message.includes('night')){

        speech.text = "Goodnight, Alex. I will manage your problems while you rest. Have a good sleep, you deserved it.";

    }

    //
    
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


    // Kraj poruka

    speech.volume = 1;

    speech.rate = 0.84;

    window.speechSynthesis.speak(speech);

}



})

function animateWithRandomNumber(myClass, from, to) {
    TweenLite.fromTo(myClass, Math.floor(Math.random() * 20 + 1), { y: from }, { y: to,
      onComplete: animateWithRandomNumber,
      onCompleteParams: [myClass, from, to],
      ease: Linear.easeNone });
  }
  
  const itemsDown = [".light4", ".light5", ".light6", ".light7", ".light8", ".light11", ".light12", ".light13", ".light14", ".light15", ".light16"].
  forEach(e => animateWithRandomNumber(e, -1080, 1080));
  const itemsUp = [".light1", ".light2", ".light3", ".light9", ".light10", ".light17"].
  forEach(e => animateWithRandomNumber(e, 1080, -1080));



