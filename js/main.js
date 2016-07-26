$(document).ready(function() {
 
    var reps = [];
    var queues = [];

    
//---------Navbar----------
    //Adds spin animation to Settings "gear" in navbar 
    $('.fa-cog').hover(function() {
        $('.fa-cog').toggleClass('fa-spin');
    });
    
//---------Settings---------    
    
    //Rep Working button & Rep Profile
    $('.add-rep').click(function() {
        //Name for Rep from input value. Then assigned to variable
        repName = $('#addrep-name').val();
        
        //find way to block adding rep if has the same name.
        //check if repName is in rep array. if so reject it.
        //reps.indexOf(repName)
        //then push to rep array      
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" class="btn-rep btn btn-lg btn-default">' + repName + '</button>';
        
        //Rep Profile stored in variable (to be added)
        repProfile = '<div class="container rep-card"><h3 class="repProfileName">' + repName + '</h3></div>';
        
        //Rep Profile added in rep-profile container
        $('.rep-profiles').prepend(repProfile);
        
        //Rep Button added in rep-buttons container
        $('.rep-buttons').append(repButton);
        
        //Adds queues array to local variable of $repName
        $('.rep-card:contains(' + repName + ')').append(queues);   
    });//close add rep    
    
    
    //Queue button to Rep Profile
    $('.add-queue').click(function() {    
        
        //Name for Queue from input value
        $queueName = $('#addQueue-name').val();       
        //Queue button stored in variable (to be added)
        repQueues = '<button class="btn btn-lg btn-block btn-default repQueues-btn">' + $queueName + '</button>';
        
        //Adds Queue button to array
        queues.push(repQueues);
        //Adds queues to Rep Profile card
        $('.rep-card').append(repQueues);
    });//close add queue
        
    
//---------Button toggle---------
    //Toggle button from grey to green on click
    function toggleButton() {
        $(this).toggleClass('btn-default btn-success'); 
    }   
    //Toggles Rep Working button
    $('.rep-buttons').on('click', '.btn-rep', toggleButton); 
    //Toggles repQueues buttons
    $('.rep-profiles').on('click', '.repQueues-btn', toggleButton);
    

//--------Date Stamp--------
$('#date-stamp').append(moment().format('MMMM D, YYYY'));
    
}); //end of jQuery document





