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
                <div class="jtextfill">  
                    <h3 class="repProfileName"><span>` + repName + `</span></h3>
                </div><!--jtextfill-->
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
        
        //Plugin that resizes text (repName) to size of container
        $('.jtextfill').textfill({ maxFontPixels: 24 });  
        
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
            <div class="queue-bar">    
                <span>
                    <i class="refuseAccordion fa fa-bars fa-2x" aria-hidden="true"></i>
                    <button type="button" class="delete-queue btn btn-danger">
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                    </button>
                </span>
                <h4 class="queueProfileName">` + queueName + `</h4>
            </div><!--queue-bar-->

            <div class="queue-data">
                <div class="queue-data-fields">
                    <input class="queue-data-input" type="text" placeholder="Utilization">
                </div>
                <div class="queue-data-fields">
                    <input class="queue-data-input" type="text" placeholder="Growth %">
                </div>
                <div class="queue-data-fields">
                    <input class="queue-data-input" type="text" placeholder="Database ID">
                </div>
            </div><!--queue-data-->
        </div><!--queue-card-->`;
        
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
        }//--close else statement
            
        
    //Clears queue input field
    $('#addQueue-name').val('');     
  
        
    //Hides queue-data to be toggled
    $('.queue-data').hide();
               
        
    //Prevents default form submit, causing page reload
    event.preventDefault();
});//close add queue
     
    
 
//--------Queue Cards--------
    //Allows queue-cards to be sortable
    $('.queue-profiles').sortable();    
    
    //Toggle queue data in queue cards
    $('.queue-profiles').on('click', '.queue-card', function(e) {
        $(this).find('.queue-data').slideToggle('fast');
        e.preventDefault();
    });
    //Prevents slideToggle when interacting with queue-data
    $('.queue-profiles').on('click', '.queue-data', function() {
        return false;    
    });
    //Prevents slideToggle when interacting with 3 bars icon
    $('.queue-profiles').on('click', '.fa-bars', function() {
        return false; 
    });
   
    
//--------Delete Rep--------    
    //Removes rep-card on "delete" button click
    $('.rep-profiles').on('click', '.delete-rep', function() {
            $(this).parent().remove();
    });
    
//--------Delete Queue--------    
    //Removes rep-card on "delete" button click
    $('.queue-profiles').on('click', '.delete-queue', function() {
            $(this).parents('.queue-card').remove();
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





