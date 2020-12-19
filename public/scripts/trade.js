/* console.log("trade scripts connect");


const $selectedPlayer = $("select[name='player']");

console.log($selectedPlayer);


console.log($selectedPlayer.find(":selected").text());

const $curItems = $(`.${$selectedPlayer.find(":selected").text()}__items`)

console.log($curItems);

console.log($selectedPlayer.val());



 */

/*===========================FUNCTIONS=========================*/

const correctDropdowns = function correctDropdowns($dropDown, isLoad) {

    console.log($dropDown.attr("class"));
    console.log($dropDown.hasClass("trader"));

    const $chosenPlayer = $dropDown.find((isLoad ? "option:first-of-type" : ":selected")).text();
    console.log($chosenPlayer);

    const $allDropdowns = $dropDown.siblings(".items, .rules");
    // console.log($allDropdowns);

    for (let i = 0; i < $allDropdowns.length; i++) {
        //console.log($allDropdowns.eq(i).attr("class"));
        if ($allDropdowns.eq(i).hasClass($chosenPlayer)) {
            // console.log("chosen");
            // console.log($allDropdowns.eq(i));
            $allDropdowns.eq(i).css("display","block");
            if ($dropDown.hasClass("trader")) {
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","traderItems") : $allDropdowns.eq(i).attr("name","traderRules"));
            } else {
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","tradeeItems") : $allDropdowns.eq(i).attr("name","tradeeRules"));
            }
            
        } else {
            // console.log("not_chosen");
            $allDropdowns.eq(i).css("display","none");
            $allDropdowns.eq(i).attr("name","possible")
        }     
    }
    
}

const submitForms = function submitForms() {


    const $allForms = $("form")

    for (let i = 0; i < $allForms.length; i++) {
        console.log($allForms.eq(i))
        $allForms.eq(i).submit();
        
    }
    
    console.log("submited");


}


/*===========================EVENT LISTENERS=========================*/

const $selectedTrader = $(".trader").find("select[name='traderName']");
console.log($selectedTrader);

const $selectedTradee = $(".tradee").find("select[name='tradeeName']");
console.log($selectedTradee);
// console.log($selectedTrader.find(":selected").text());

$selectedTrader.on("click", null, (event) => { 
    
    // event.stopPropagation();
    console.log(event);
    console.log("clicked");
    
});

$selectedTrader.on("change", (event) => { 

    correctDropdowns($(event.target), false);

});

$selectedTradee.on("change", (event) => { 
    
    correctDropdowns($(event.target), false);
    

});



/*===========================ON LOAD=========================*/

correctDropdowns($selectedTrader, true);
correctDropdowns($selectedTradee, true);