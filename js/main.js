$(document).ready(function() {
       
    //Toggles Rep Working button color from grey to green
    $('.rep-buttons').on('click', '.btn-rep', function() {
        $(this).toggleClass('btn-default btn-success');       
        //assigns boolean if button is "selected"
        var repWorking = $('.btn-rep').hasClass('btn-success') ? true : false;    
    });//close rep button toggle

    
    //Toggles repQueues button from grey to green
    $('.rep-profiles').on('click', '.repQueues', function() {
    $(this).toggleClass('btn-default btn-success');
    //assigns boolean if button is "selected"
    var repQueuesWorked = $('.btn-rep').hasClass('btn-success') ? true : false;   
    });//close queue button toggle
    
    
    //Adds a Rep Working button & Rep Profile
    $('.add-rep').click(function() {
        //Gets Name for Rep from input value
        var $repName = $('#addrep-name').val();
        
        //----Rep Working Button----
        //Rep Button stored in variable (to be added)
        var $repButton = $('<button type="button" class="btn-rep btn btn-lg btn-default">' + $repName + '</button>');
        //Rep Button added in rep-buttons container
        $('.rep-buttons').append($repButton);
        
        //----Rep Profiles----
        //Rep Profile stored in variable (to be added)
        var $repProfile = $('<div class="container col-sm-2 rep-card"><h3>' + $repName + '</h3>');       
        //Rep Profile added in rep-profile container
        $('.rep-profiles').append($repProfile);
    });//close add rep
    
    
    //Attempt to add Queue button to Rep Profile
    $('.add-queue').click(function() {
       //Gets Name for Queue from input value
       var $queueName = $('#addQueue-name').val();
       //Queue button stored in variable (to be added)
       var $repQueues = $('<button class="btn btn-lg btn-default repQueues">' + $queueName + '</button>');
       //Adds Queue button to Rep Profile
       $($repProfile).append($repQueues);
    });//close add queue

    
}); //end of jQuery document