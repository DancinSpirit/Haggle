/* console.log("trade scripts connect");


const $selectedPlayer = $("select[name='player']");

console.log($selectedPlayer);


console.log($selectedPlayer.find(":selected").text());

const $curItems = $(`.${$selectedPlayer.find(":selected").text()}__items`)

console.log($curItems);

console.log($selectedPlayer.val());



 */

/*===========================FUNCTIONS=========================*/

const correctDropdowns = function correctDropdowns() {

    console.log($selectedPlayer.find(":selected").text());
    const $curItems = $selectedPlayer.find(":selected").text();

    const $allDropdowns = $(".items, .rules");
    console.log($allDropdowns);

    for (let i = 0; i < $allDropdowns.length; i++) {
        if ($allDropdowns.eq(i).hasClass($curItems)) {
            console.log($allDropdowns.eq(i));
            $allDropdowns.eq(i).css("display","block");
        } else {
            $allDropdowns.eq(i).css("display","none");
        }     
    }
    
}



/*===========================EVENT LISTENERS=========================*/

const $selectedPlayer = $("select[name='player']");

$selectedPlayer.on("change", (event) => { 
    
    correctDropdowns();
    



});