$(document).ready(function(){
    $(".sortable").sortable();
    $(".note").hide();
    $('.button#add').on('click',function(){
        var $newTask = $('#newTask').val(); //get task from input
        if($newTask==='') {
        $(".note").show(); //if list is empty
        } else {
        $(".note").hide();
        var listItem = $('<li><input type="checkbox"><label>'+$newTask+'</label></li>').fadeIn(1000); //create new item to add
        $('ul#incomplete').append(listItem); //append to list
        $('#newTask').val(''); //empty the text box
        };
        taskCounter(); //increment task number
    });

    //call this when checkbox inside a list is checked or unchecked
    $('ul').on('change','input[type="checkbox"]', function() {
    var whichItem = $(this).parent(); //find which item
    var whichList = $(this).parent().parent(); //find which list contains the item 
    //is the item complete or incomplete
    if (whichList.is('#incomplete')) {
        whichItem.remove().fadeIn(600); //remove item from incomplete
        $('#complete').append(whichItem); //add it to complete
    } else if (whichList.is('#complete')) {
        whichItem.remove().fadeIn(600); //remove item from complete
        $('#incomplete').prepend(whichItem); //add it to incomplete
    }
    taskCounter();
    });

    //counter
    function taskCounter(){
        $('#counter').hide().fadeIn(1000).html($('#incomplete li').length);
    };
    taskCounter();
});