$(document).ready(function() {
 
    var reps = [];
    var queues = [];

    
//---------Navbar----------
    //Adds spin animation to Settings "gear" in navbar 
    $('.nav-cog').hover(function() {
        $('.nav-cog').toggleClass('fa-spin');
    });
    
//---------Settings---------    
    
    //Rep Working button & Rep Profile
    //$('#add-rep-btn').click(function() {
    $('#add-rep-form').submit(function() {
             
        //Name for Rep from input value. Then assigned to variable
        repName = $('#addrep-name').val();
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" class="btn-rep btn btn-lg btn-default">' + repName + '</button>';
        
        //Rep Profile stored in variable (to be added)
        repProfile = '<div class="container rep-card"><h3 class="repProfileName">' + repName + '</h3></div>';
        
        //checks if repName is already in rep array. if so it's rejected. If not, it's added to reps array.
        if(reps.indexOf(repName) !== -1) {
            $('#addrep-name').stop(false,true).before('<span class="rep-name-error">Duplicate name. Please enter a different name.</span>');
            //Fade out error message
            $('.rep-name-error').delay(1100).fadeOut();
        } else {
            //Adds repName to reps array
            reps.push(repName);
            
            //Rep Profile added in rep-profile container
            $('.rep-profiles').prepend(repProfile);

            //Rep Button added in rep-buttons container
            $('.rep-buttons').append(repButton);

            //Adds queues array to local variable of repName
            $('.rep-card:contains(' + repName + ')').append(queues);
        };
        
        //Clears rep input field
        $('#addrep-name').val('');       
    });//close add rep    
    
    
    //Queue button to Rep Profile
    //$('.add-queue').click(function() {
    $('#add-queue-form').submit(function() {
        
        //Name for Queue from input value
        $queueName = $('#addQueue-name').val();       
        //Queue button stored in variable (to be added)
        repQueues = '<button class="btn btn-lg btn-block btn-default repQueues-btn">' + $queueName + '</button>';
        
        //Adds Queue button to array
        queues.push(repQueues);
        //Adds queues to Rep Profile card
        $('.rep-card').append(repQueues);
        
        //Clears queue input field
        $('#addQueue-name').val('');
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





