/* console.log("trade scripts connect");


const $selectedPlayer = $("select[name='player']");

console.log($selectedPlayer);


console.log($selectedPlayer.find(":selected").text());

const $curItems = $(`.${$selectedPlayer.find(":selected").text()}__items`)

console.log($curItems);

console.log($selectedPlayer.val());



 */

/*===========================FUNCTIONS=========================*/

const displayItemsMenu = function displayItemsMenu() {

    console.log($selectedPlayer.find(":selected").text());
    const $curItems = $selectedPlayer.find(":selected").text();

    const $allItems = $(".items");
    console.log($allItems);

    for (let i = 0; i < $allItems.length; i++) {
        if ($allItems.eq(i).hasClass($curItems)) {
            console.log($allItems.eq(i));
            $allItems.eq(i).css("display","inline");
        } else {
            $allItems.eq(i).css("display","none");
        }     
    }
    
}



/*===========================EVENT LISTENERS=========================*/

const $selectedPlayer = $("select[name='player']");

$selectedPlayer.on("change", (event) => { 
    
    displayItemsMenu();
    



});