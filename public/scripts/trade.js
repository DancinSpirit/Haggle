/* console.log("trade scripts connect");


const $selectedPlayer = $("select[name='player']");

console.log($selectedPlayer);


console.log($selectedPlayer.find(":selected").text());

const $curItems = $(`.${$selectedPlayer.find(":selected").text()}__items`)

console.log($curItems);

console.log($selectedPlayer.val());



 */

/*===========================FUNCTIONS=========================*/

const removeOnSibling = function removeOnSibiling($selectedTransactor) {//tranbalhando aqui tirando o igual da lista do lado

    // const $siblingDropdown = $selectedTransactor.parent().parent().siblings("section").children("selecte.name");
    const $siblingDropdown = $selectedTransactor.parent().parent().siblings("section").children("select.name");
    const $siblingOptions = $siblingDropdown.children();
    // console.log($siblingOptions);

    for (let i = 0; i < $siblingOptions.length; i++) {
        // console.log($selectedTransactor);
        // console.log($siblingOptions.eq(i).text());
        if ($siblingOptions.eq(i).text() === $selectedTransactor.text()) {
            $siblingOptions.eq(i).css("display","none");
            console.log("blocked");
        }else{
            $siblingOptions.eq(i).css("display","block");
        };
        
    }

}

const correctDropdowns = function correctDropdowns($dropDown, isLoad) {

    const $chosenPlayer = $dropDown.children((isLoad ? "option:first-of-type" : ":selected"));

    removeOnSibling($chosenPlayer);
    // console.log($chosenPlayer);

    const $allDropdowns = $dropDown.siblings(".items, .rules");
    // console.log($allDropdowns);

    for (let i = 0; i < $allDropdowns.length; i++) {
        //console.log($allDropdowns.eq(i).attr("class"));
        if ($allDropdowns.eq(i).hasClass($chosenPlayer.text())) {

            $allDropdowns.eq(i).css("display","block");
            if ($dropDown.hasClass("trader")) {
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","traderItems") : $allDropdowns.eq(i).attr("name","traderRules"));
            } else {//if tradee
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","tradeeItems") : $allDropdowns.eq(i).attr("name","tradeeRules"));
            }
            
        } else {
            $allDropdowns.eq(i).css("display","none");
            $allDropdowns.eq(i).attr("name","possible")
        }     
    }
    
}

const correctQuantity = function correctQuantity($dropDown) {

    const $chosenItem = $dropDown.children(":selected");
    console.log($chosenItem);
    if($chosenItem.text() === "") {
        const variableName = `${$chosenItem.parent().parent("section").attr("class")}Quantity`;

        console.log($(`select[name='${variableName}']`));
        return $(`select[name='${variableName}']`).remove();
    }
    console.log($chosenItem);

    const curQuantity = $chosenItem.attr("quantity");
    console.log(curQuantity);

    let options = ""

    for (let i = 1; i <= curQuantity; i++) {
        options += `<option value="${i}">${i}</option>`;
        
    }
    const variableName = `${$chosenItem.parent().parent("section").attr("class")}Quantity`;

    console.log($(`select[name='${variableName}']`));
    $(`select[name='${variableName}']`).remove();

    const $quantityDropdown = $(`<select name="${variableName}">
                                    ${options}
                                </select>`)


    $chosenItem.parent().after($quantityDropdown);
}

/*===========================EVENT LISTENERS=========================*/

// const $selectedTrader = $(".trader").children("select[name='traderName']");
// console.log($selectedTrader);

// const $selectedTradee = $(".tradee").children("select[name='tradeeName']");
// console.log($selectedTradee);
// console.log($selectedTrader.find(":selected").text());

const $selectedTraders = $("section").children("select.name");
console.log($selectedTraders);

$selectedTraders.on("click", null, (event) => { 
    
    // event.stopPropagation();
    console.log(event);
    console.log("clicked");
    
});

$selectedTraders.on("change", (event) => { 

    correctDropdowns($(event.target), false);

});

// $selectedTradee.on("change", (event) => { 
    
//     correctDropdowns($(event.target), false);
    

// });

const $selectedItems = $("section").children("select.items");
console.log($selectedItems);

$selectedItems.on("change", (event) => { 

    correctQuantity($(event.target));

});

/*===========================ON LOAD=========================*/

correctDropdowns($selectedTraders, true);
// correctDropdowns($selectedTradee, true);