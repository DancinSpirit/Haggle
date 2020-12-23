

/*===========================FUNCTIONS=========================*/

const removeOnSibling = function removeOnSibiling($selectedTransactor) {

    const $siblingDropdown = $selectedTransactor.parent().parent().siblings("section").children("select.name");
    const $siblingOptions = $siblingDropdown.children();

    for (let i = 0; i < $siblingOptions.length; i++) {
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
    console.log($dropDown.siblings("div").find("select.items").not("[name='possible']"));
    $dropDown.siblings("div").find("select.items").not("[name='possible']").val("");
    correctQuantity($dropDown.siblings("div").find("select.items").not("[name='possible']"));

    const $chosenPlayer = $dropDown.children((isLoad ? "option:first-of-type" : ":selected"));

    removeOnSibling($chosenPlayer);

    const $allDropdowns = $dropDown.siblings("p").find(".rules");
    $.merge($allDropdowns, $dropDown.siblings("div").find(".items"));

    for (let i = 0; i < $allDropdowns.length; i++) {

        if ($allDropdowns.eq(i).hasClass($chosenPlayer.text())) {

            $allDropdowns.eq(i).css("display","inline");
            $allDropdowns.eq(i).parent("p").css("display","inline");
            if ($dropDown.hasClass("trader1")) {
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","trader1Item") : $allDropdowns.eq(i).attr("name","trader1Rule"));
            } else {//if trader2
                ($allDropdowns.eq(i).hasClass("items") ? $allDropdowns.eq(i).attr("name","trader2Item") : $allDropdowns.eq(i).attr("name","trader2Rule"));
            }
            
        } else {
            $allDropdowns.eq(i).parent("p").css("display","none");
            $allDropdowns.eq(i).css("display","none");
            $allDropdowns.eq(i).attr("name","possible")
        }     
    }
    
}

const correctQuantity = function correctQuantity($dropDown) {
    const $chosenItem = $dropDown.children(":selected");
    const variableName = `${$chosenItem.parent().parent().parent().parent("section").attr("class")}Quantity`;

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


    $dropDown.parent().after($quantityDropdown);
}

/*===========================EVENT LISTENERS=========================*/

const $selectedTraders = $("section").children("select.name");
console.log($selectedTraders);

$selectedTraders.on("change", (event) => { 

    correctDropdowns($(event.target), false);

});

const $selectedItems = $("section").find("select.items");

$selectedItems.on("change", (event) => { 

    correctQuantity($(event.target));

});

/*===========================ON LOAD=========================*/

correctDropdowns($selectedTraders, true);