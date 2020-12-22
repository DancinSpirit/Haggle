

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
    //removes the quantity if changing players
    // console.log($dropDown.siblings("select.items:not([name='possible'])"));
    $dropDown.siblings("select.items").not("[name='possible']").val("");
    correctQuantity($dropDown.siblings("select.items").not("[name='possible']"));

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
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","traderItem") : $allDropdowns.eq(i).attr("name","traderRule"));
            } else {//if tradee
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","tradeeItem") : $allDropdowns.eq(i).attr("name","tradeeRule"));
            }
            
        } else {
            $allDropdowns.eq(i).css("display","none");
            $allDropdowns.eq(i).attr("name","possible")
        }     
    }
    
}
//TODO fix bug where if you change the player without unselecting the item the quantity dropdown still shows
const correctQuantity = function correctQuantity($dropDown) {

    const $chosenItem = $dropDown.children(":selected");
    const variableName = `${$chosenItem.parent().parent("section").attr("class")}Quantity`;

    if($chosenItem.text() === "") {//if there is no item chosen
        console.log($(`select[name='${variableName}']`));
        return $(`select[name='${variableName}']`).remove();
    }

    const curQuantity = $chosenItem.attr("quantity");
    let options = ""

    for (let i = 1; i <= curQuantity; i++) {
        options += `<option value="${i}">${i}</option>`;
        
    }

    $(`select[name='${variableName}']`).remove();

    const $quantityDropdown = $(`<select name="${variableName}">
                                    ${options}
                                </select>`)


    $chosenItem.parent().after($quantityDropdown);
}

/*===========================EVENT LISTENERS=========================*/

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

const $selectedItems = $("section").children("select.items");
console.log($selectedItems);

$selectedItems.on("change", (event) => { 

    correctQuantity($(event.target));

});

/*===========================ON LOAD=========================*/

correctDropdowns($selectedTraders, true);
// correctDropdowns($selectedTradee, true);