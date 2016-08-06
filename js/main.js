$(document).ready(function() {
 
    var reps = [];
    var queues = [];
    var queueNames = [];

    
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
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
    });    
    //Hide/Show reps-working view
    $('#queue-import-view').hide();
    $('.navbar-brand').on('click', function() {
        $('#reps-working-view').show();
        $('#settings').hide();
        $('#queue-import-view').hide();
    });
    //Hide/Show queue import view
    $('#reps-working-next').on('click', function() {
        $('#queue-import-view').show();
        $('#reps-working-view').hide();
        $('#settings').hide();
    });
    $('#queue-import-back').on('click', function() {
        $('#reps-working-view').show();
        $('#queue-import-view').hide();
        $('#settings').hide();
    });

//---------Settings---------    
    
    //Rep Working button & Rep Profile
    $('#add-rep-form').submit(function(event) {
             
        //Name for Rep from input value. Then assigned to variable
        repName = $('#addrep-name').val();
        
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
        }//--close if statement
        
        //Clears rep input field
        $('#addrep-name').val(''); 
        
        //Plugin to resize text (repName) to container width
        $('.jtextfill').textfill({ maxFontPixels: 24 }); 
        
        //Prevents default form submit, causing page reload
        event.preventDefault(); 
    });//close add rep    
    
    
    function textFillCont() {
      $('.jtextfill').textfill({ maxFontPixels: 18 });  
    };
  
    
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
                <i class="qvolume-graph fa fa-bar-chart fa-lg" aria-hidden="true"></i>
                <input class="queue-volume-input" type="number">
                <i class="queue-alert fa fa-bell fa-lg" aria-hidden="true"></i>
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
    
    textFillCont();    
        
    //Plugin to resize text (queueName) to container width
    //$('.textfill').textfill({ maxFontPixels: 18 });     
        
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
       
//---------Button toggle & NonCore Btn add---------
    //Toggle button from grey to green on click
    function toggleButton() {
        $(this).toggleClass('btn-default btn-success'); 
    }   
    //Toggles Rep Working button & adds Non-core work buttons
    $('.rep-buttons').on('click', '.btn-rep', function() {
        $(this).toggleClass('btn-default btn-success');
        
        
    //!!!!!!!!!!Attempt to add non-core work button
        var nonCoreBtn = `<button type="button" class="btn">` + repName + `</button>`;
        
        if( $(this).hasClass('btn-success') ) {
            console.log(repName);
            $('.non-core-data').append(nonCoreBtn);
        } else {
            $('.non-core-data').parent().remove(nonCoreBtn);
        }
    });
    
    
    //Toggles repQueues buttons
    $('.rep-profiles').on('click', '.repQueues-btn', toggleButton);
    

//--------Date Stamp--------
$('#date-stamp').append(moment().format('MMMM D, YYYY'));
        
    
}); //end of .ready document

