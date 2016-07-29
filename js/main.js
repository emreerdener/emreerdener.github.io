$(document).ready(function() {
 
    var reps = [];
    var queues = [];
    var queueNames = [];

    
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
        var repName = $('#addrep-name').val();
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" class="btn-rep btn btn-lg btn-default">' + repName + '</button>';
        
        //Rep Profile stored in variable (to be added)
        var repProfile = `
            <div class="container rep-card">
                <h3 class="repProfileName">` + repName + `</h3>
                <div class="rep-card-queues"></div>
                <button type="button" class="delete-rep btn btn-danger">Delete</button>
            </div>`;
        
        //Checks if repName is already in rep array. if so, it's rejected. If not, it's added to reps array.
        if (reps.indexOf(repName) !== -1) {
            $('#addrep-name').before('<span class="repname-duperror">Duplicate name. Please enter a different name.</span>');
            //Fade out error message
            $('.repname-duperror').delay(1200).fadeOut();
        } else if (repName === "") {
            $('#addrep-name').before('<span class="repname-emptyerror">Please input a name.</span>');
            //Fade out error message
            $('.repname-emptyerror').delay(1200).fadeOut();
        } else {
            //Adds repName to reps array
            reps.push(repName);
            
            //Rep Profile added in rep-profile container
            $('.rep-profiles').prepend(repProfile);
            
            //Rep Button added in rep-buttons container
            $('.rep-buttons').append(repButton);
            
            //Adds queues array to local variable of repName
            $('.rep-card:contains(' + repName + ') .rep-card-queues').append(queues);            
            
        }//end rep array if statement
        
        //Clears rep input field
        $('#addrep-name').val(''); 
        
        //Prevents default form submit, causing page reload
        event.preventDefault();
    });//close add rep    
    
  
    
    //Queue button to Rep Profile
    //$('.add-queue').click(function() {
    $('#add-queue-form').submit(function() {
        
        //Name for Queue from input value
        var queueName = $('#addQueue-name').val();
        
        //Queue button stored in variable (to be added)
        var repQueues = '<button class="btn btn-lg btn-block btn-default repQueues-btn">' + queueName + '</button>';
        
        //Queue Profile stored in variable (to be added)
        var queueProfile = `
        <div class="queue-card">
            <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            <div class="queue-card-toggle">
                <h4 class="queueProfileName">` + queueName + `</h4>
                <i class="queue-chevron-toggle fa fa-chevron-right fa-lg" aria-hidden="true"></i>
                <div class="queue-card-data"></div>
            </div><!--queue-card-toggle close-->        
            <button type="button" class="delete-queue btn btn-circle btn-danger">
                <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
            </button>
        </div><!--queue-card close-->`;
        
        //Checks if queueName is already in queueNames array. if so, it's rejected. If not, it's added to queues array.
        if (queueNames.indexOf(queueName) !== -1) {
            $('#addQueue-name').before('<span class="queuename-duperror">Duplicate queue. Please enter a different queue.</span>');
            //Fade out error message
            $('.queuename-duperror').delay(1200).fadeOut();
        } else if (queueName === "") {
            $('#addQueue-name').before('<span class="queuename-emptyerror">Please input a queue name.</span>');
            //Fade out error message
           $('.queuename-emptyerror').delay(1200).fadeOut();
        } else {     
            //Adds Queue button to array
            queues.push(repQueues);
            queueNames.push(queueName);

            //Queue Profile added in rep-profile container
            $('.queue-profiles').prepend(queueProfile);

            //Adds queues to Rep Profile card
            $('.rep-card-queues').append(repQueues);
        }
            
            //Clears queue input field
            $('#addQueue-name').val('');

            //Prevents default form submit, causing page reload
            event.preventDefault();
    });//close add queue
        

 //Adds chevron rotate on click
    $('.queue-card-toggle').on('click', function() {
        $('.queue-chevron-toggle').toggleClass('fa-chevron-right fa-chevron-down');
    });  
  
//Allows queue-cards to be sortable
    $("#queue-sortable").sortable({ revert: true });    
    
   
    
//--------Delete Rep--------    
    //Removes rep-card on "delete" button click
    $('.rep-profiles').on('click', '.delete-rep', function() {
            $(this).parent().remove();
    });
    
//--------Delete Queue--------    
    //Removes rep-card on "delete" button click
    $('.queue-profiles').on('click', '.delete-queue', function() {
            $(this).parent().remove();
    });    
       
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





