infoArray = jQuery.makeArray($(".info"));
editArray = jQuery.makeArray($(".edit"));
editButtons = jQuery.makeArray($(".edit-button"));

editButtons.forEach(editButton => {
    editButton.addEventListener("click",()=>{
        id = editButton.id;
        infoArray.forEach(info => {
            if(info.id===`${id}-info`)
            info.style.display = "none";
        });
        editArray.forEach(edit => {
            if(edit.id===`${id}-edit`)
            edit.style.display = "block";
        });
    })
});