$(document).ready(function() {
 
//---------Settings---------    
    
    //Rep Working button & Rep Profile
    $('.add-rep').click(function() {
        //Name for Rep from input value. Then assigned to variable
        $repName = $('#addrep-name').val();
        
        //Rep Profile stored in variable (to be added)
        repProfile = '<div class="container col-sm-3 rep-card"><h3 class="repProfileName">' + $repName + '</h3></div>';
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" class="btn-rep btn btn-lg btn-default">' + $repName + '</button>';
        
        //Rep Profile added in rep-profile container
        $('.rep-profiles').append(repProfile);
        //Rep Button added in rep-buttons container
        $('.rep-buttons').append(repButton);        
    });//close add rep

       
    //Queue button to Rep Profile
    $('.add-queue').click(function() {
        var queues = [];
        
        //Name for Queue from input value
        $queueName = $('#addQueue-name').val();       
        //Queue button stored in variable (to be added)
        var repQueues = '<button class="btn btn-lg btn-block btn-default repQueues">' + $queueName + '</button>';
        
        //Adds Queue button to array
        queues.push(repQueues);
        //Adds queues to Rep Profile card
        $('.rep-card').append(queues);
    });//close add queue
        
    
//---------Button toggle---------
    //Toggle button from grey to green on click
    function toggleButton() {
        $(this).toggleClass('btn-default btn-success'); 
    }   
    
    //Toggles Rep Working button
    $('.rep-buttons').on('click', '.btn-rep', toggleButton); 
    //Toggles repQueues buttons
    $('.rep-profiles').on('click', '.repQueues', toggleButton);
    
}); //end of jQuery document