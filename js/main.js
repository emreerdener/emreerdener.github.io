$(document).ready(function() {
 
    var reps = [];
    var queues = [];
    var queueNames = [];
    var nonCore = [];

    
//---------Navbar----------
    //Adds spin animation to Settings "gear" in navbar 
    $('.nav-cog').hover(function() {
        $('.nav-cog').toggleClass('fa-spin');
    });
    
    //Adds bounce animation to ninja logo
    $('#gp-ninja').click(function() {
        $(this).effect('bounce', 'slow');
    });
    
    //Hide/Show settings view
    $('#settings').hide();
    $('#desktop-cog, #mobile-cog').on('click', function() {
        $('#settings').show();
        $('.breadcrumbs').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
    });    
    //Hide/Show reps-working view
    $('#queue-import-view').hide();
    $('.navbar-brand').on('click', function() {
        $('#reps-working-view').show();
        $('.breadcrumbs').show();
        $('#settings').hide();
        $('#queue-import-view').hide();
    });
    //Hide/Show queue import view
    $('#reps-working-next, .bread-vol').on('click', function() {
        $('#queue-import-view').show();
        $('.breadcrumbs').show();
        $('#reps-working-view').hide();
        $('#settings').hide();
        $('.bread-reps').removeClass('bread-active');
        $('.bread-reps').addClass('bread-completed');
        $('.bread-vol').addClass('bread-active');
    });
    $('#queue-import-back, .bread-reps').on('click', function() {
        $('#reps-working-view').show();
        $('.breadcrumbs').show();
        $('#queue-import-view').hide();
        $('#settings').hide();
        $('.bread-reps').removeClass('bread-completed');
        $('.bread-reps').addClass('bread-active');
        $('.bread-vol').removeClass('bread-active');
    });



//---------Settings---------    
    
    //Rep Working button & Rep Profile
    $('#add-rep-form').submit(function(event) {
             
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
        
        //Non-core work card (to be added)
        var ncInputCard = `
            <div class="nc-input-card">
                <div class="nc-input-name">
                    ` + repName + `
                </div><!--nc-input-name-->
                <input class="nc-input" type="number" placeholder="Hours" pattern="[0-9]*" inputmode="numeric">
            </div><!--nc-input-card-->
        `;
        
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
            nonCore.push(ncInputCard);
            
            //Rep Profile added in rep-profile container
            $('.rep-profiles').prepend(repProfile);
            
            //Rep Button added in rep-buttons container
            $('.rep-buttons').append(repButton);
            
            //Adds nonCore cards to Non-Core Work section
            $('.non-core-data').append(ncInputCard);
            
            //Adds queues array to local variable of repName
            $('.rep-card:contains(' + repName + ') .rep-card-queues').append(queues);                   
        }//--close if statement
        
        //Hide non-core-input cards (to show/hide--around line 290)
        $('.nc-input-card').hide();
        
        //Clears rep input field
        $('#addrep-name').val(''); 
        
        //Plugin to resize text (repName) to container width
        $('.jtextfill').textfill({ maxFontPixels: 24 }); 
        
        //Prevents default form submit, causing page reload
        event.preventDefault(); 
    });//--close add rep    
    
  
    
    //Queue button to Rep Profile
    $('#add-queue-form').submit(function(event) {
        
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
                <div class="graph-preview">
                    <img src="images/graph-ex.png"/>
                </div>
                <div class="queue-data-fields">
                    <h4 class="data-title"><i class="fa fa-archive" aria-hidden="true"></i> Queue Name</h4>
                    <input class="queue-data-input" type="text" placeholder="Name">
                </div>
                <div class="queue-data-fields grey">
                    <h4 class="data-title"><i class="fa fa-clock-o" aria-hidden="true"></i> Utilization Time</h4>
                    <input class="queue-data-input" type="text" placeholder="Seconds">
                </div>
                <div class="queue-data-fields">
                    <h4 class="data-title"><i class="fa fa-line-chart" aria-hidden="true"></i> Daily Growth</h4>
                    <input class="queue-data-input" type="text" placeholder="Percentage">
                </div>
                <div class="queue-data-fields grey">
                    <h4 class="data-title"><i class="fa fa-database" aria-hidden="true"></i> Database ID</h4>
                    <input class="queue-data-input" type="text" placeholder="SQL">
                </div>
            </div><!--queue-data-->`;
        
        //Queue import field (to be added)
        var queueVolume = `
        <div class="container queue-volume-card">
            <div class="queue-volume-name">
                    <h4>` + queueName + `</h4>
            </div><!--queue-volume-name-->
            <div class="queue-volume-data">
                <button type="button" class="btn qvolume-btn"><i class="qvolume-graph fa fa-bar-chart fa-lg" aria-hidden="true"></i></button>
                <input class="queue-volume-input" type="number" placeholder="Volume">
                <button type="button" class="btn qvolume-btn"><i class="queue-alert fa fa-bell fa-lg" aria-hidden="true"></i></button>
            </div><!--queue-volume-data-->
        </div><!--queue-volume-card-->
        `;
        
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
            
            //Adds queues to Queue Volume cards
            $('.queue-imports').append(queueVolume);
        }//--close if statement
        
    //Clears queue input field
    $('#addQueue-name').val('');     
          
    //Hides queue-data to be toggled in drop-down
    $('.queue-data').hide();          
        
    //Prevents default form submit, causing page reload
    event.preventDefault();
});//--close add queue
    
    
 
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
   

//--------Non-Core Work--------
    //Hide elements to be toggled on click
    $('.non-core-data').hide();
    
    //Toggle non-core work data
    $('.non-core-card').on('click', function(e) {
        $(this).find('.non-core-data').slideToggle('fast');
        //Toggle button styles on click
        $('.non-core-name').toggleClass('non-core-btn-styles');
        //Toggle chevron right to down on click
        $('.chevron-toggle').toggleClass('fa-chevron-right fa-chevron-down');       
        e.preventDefault();
    });
    
    //Prevents slideToggle when clicking on non-core-data
    $('.non-core-card').on('click', '.non-core-data', function() {
        return false;
    });
    
    //Changes non-core card to green if input is above 0 or not empty  
    $('.non-core-data').on('change', '.nc-input-card', function() {
        //Changes non-core card back to white if 0 or empty
        if ( ( $(this).find('.nc-input').val() ) == (0 && '') ) {
            $(this).css({'background-color' : 'white'});
            $(this).find('.nc-input-name').css({'color' : 'black'});
        } else {
            $(this).css({'background-color' : '#5cb85c'});
            $(this).find('.nc-input-name').css({'color' : 'white'});
        }
    });
    
    //Toggle rep-btns & Add nc-input card to Non-Core Work div
    $('.rep-buttons').on('click', '.btn-rep', function() {
        //Toggles rep-btns from grey to green and vice versa
        $(this).toggleClass('btn-default btn-success');

        //Determins if rep-btns are selected or not
        if( $(this).hasClass('btn-success') ) {
            $('.nc-input-card').show();
        } else {
            $('.nc-input-card').hide();
        }
    }).trigger('change');

    
    
//--------Delete Rep--------    
    //Removes rep-card on "delete" button click
    $('.rep-profiles').on('click', '.delete-rep', function() {
        $(this).parent().remove();
    });
    
//--------Delete Queue--------    
    //Removes queue-card on "delete" button click
    $('.queue-profiles').on('click', '.delete-queue', function() {
        $(this).parents('.queue-card').remove();
    });        
    
    
//---------Button toggle---------    
    //Toggle button from grey to green on click
    function toggleButton() {
        $(this).toggleClass('btn-default btn-success'); 
    }   
    //Toggles repQueues buttons
    $('.rep-profiles').on('click', '.repQueues-btn', toggleButton);
    //$('.rep-buttons').on('click', '.btn-rep', toggleButton);

    
//--------Date Stamp--------
$('#date-stamp').append(moment().format('ddd - MMMM D, YYYY'));
        
    
}); //end of .ready document

