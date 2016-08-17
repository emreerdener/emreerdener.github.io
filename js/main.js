$(document).ready(function() {
 
    var reps = [];
    var queues = [];
    var queueNames = [];
    var nonCore = [];

    
//---------Navbar----------
    $('#settings-link').hide();
    //Adds spin animation to Settings "gear" in navbar 
    $('.nav-cog').hover(function() {
        $('.nav-cog').toggleClass('fa-spin');
    });
    //Reveals "settings" link
    $('.nav-cog').mouseover(function() {
        $('#settings-link').toggle('slide', {direction: "right"}, 'fast');
    });
    
    //Adds bounce animation to ninja logo
    $('#gp-ninja').click(function() {
        $(this).effect('bounce', 'slow');
    });
    
    //Hide/Show settings view
    $('#settings').hide();
    $('#desktop-cog, #mobile-cog, #settings-link').on('click', function() {
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
        $('.bread-reps').removeClass('bread-completed');
        $('.bread-reps').addClass('bread-active');
        $('.bread-vol').removeClass('bread-active');
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
    //Settings Save button
    $('#settings-save').on('click', function() {
        $('.settings-datestamp').empty();
        $('.settings-heading').before('<span class="settings-datestamp">Last Saved: ' + moment().format("MMMM Do, h:mma") + '</span>');
    });
    
    
    //Rep Working button & Rep Profile
    $('#add-rep-form').submit(function(event) {
             
        //Name for Rep from input value. Then assigned to variable
        var repName = $('#addrep-name').val();
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" id="' + repName + '" class="btn-rep btn btn-lg btn-default">' + repName + '</button>';  
        
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
            <div class="nc-input-card" id="nc-` + repName + `">
                <div class="nc-input-name">
                    ` + repName + `
                </div><!--nc-input-name-->
                <input class="nc-input" type="number" placeholder="Hours">
            </div><!--nc-input-card-->
        `;
        
        //Checks if repName is already in rep array. if so, it's rejected. If not, it's added to reps array.
        if (reps.indexOf(repName) !== -1) {
            $('.rep-settings-container').before('<span class="repname-duperror text-center">Duplicate name. Please enter a different name.</span>');
            //Fade out error message
            $('.repname-duperror').delay(1200).fadeOut();
        } else if (repName === "") {
            $('.rep-settings-container').before('<span class="repname-emptyerror text-center">Please input a name.</span>');
            //Fade out error message
            $('.repname-emptyerror').delay(1200).fadeOut();
        } else {
            //Adds repName to reps array
            reps.push(repName);
            nonCore.push(ncInputCard);
            
            //Rep Profile added in rep-profile container
            $('.rep-profiles').append(repProfile);
            
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
            
        //Remove white spaces from ID repName and make all lower-case
        $('[id="' + repName + '"]').attr("id", repName.replace(/ /g, '').toLowerCase());
        //Remove white space for nc-input-card ID and make lower-case
        $('[id="nc-' + repName + '"]').attr("id", 'nc-' + repName.replace(/ /g, '').toLowerCase());
        
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
                </span>
                <h4 class="queueProfileName">` + queueName + `</h4>
            </div><!--queue-bar-->
            <div class="queue-data">
                <div class="graph-preview">
                    <img src="images/graph-ex.png"/>
                </div>
                <div class="queue-data-fields">
                    <div class="queue-data-card">
                        <h4 class="data-title"><i class="fa fa-archive" aria-hidden="true"></i> Queue Name</h4>
                        <input id="queue-data-name" class="queue-data-input" type="text" placeholder="Name">
                    </div><!--queue-data-card-->
                    <div class="queue-data-card">
                        <h4 class="data-title"><i class="fa fa-clock-o" aria-hidden="true"></i> Utilization Time</h4>
                        <input class="queue-data-input" type="text" placeholder="Seconds">
                    </div><!--queue-data-card-->
                    <div class="queue-data-card">
                        <h4 class="data-title"><i class="fa fa-line-chart" aria-hidden="true"></i> Daily Growth</h4>
                        <input class="queue-data-input" type="text" placeholder="Percentage">
                    </div>
                    <div class="queue-data-card">
                        <h4 class="data-title"><i class="fa fa-database" aria-hidden="true"></i> Database ID</h4>
                        <input class="queue-data-input" type="text" placeholder="SQL">
                    </div>
                </div>
            </div><!--queue-data-->`;
        
        //Queue import field (to be added)
        var queueVolume = `
        <div class="container queue-volume-card">
            <div class="queue-volume-name">
                    <h4>` + queueName + `</h4>
            </div><!--queue-volume-name-->
            <div class="queue-volume-data">
                <div type="button" class="qvolume-graph">
                    <i class="fa fa-bar-chart fa-lg" aria-hidden="true"></i>
                </div><!--qvolume-graph-->
                <div class="queue-volume-input">
                    <input class="qv-input" type="number" placeholder="Volume" pattern="[0-9]*" inputmode="numeric">
                </div><!--queue-volume-input-->
                <div role="button" class="qv-alert text-center" data-toggle="popover" data-placement="top">

                <div class="popover_content_wrapper hide">` + queueName + ` is 23% above average</div>

                    <span class="fa-stack">
                        <i class="fa fa-bell fa-stack-2x" aria-hidden="true"></i>
                        <i class="fa fa-circle fa-stack-1x" aria-hidden="true"></i>
                    </span>
                </div><!--qv-alert-->
            </div><!--queue-volume-data-->
        </div><!--queue-volume-card-->
        `;        
        
        //Checks if queueName is already in queueNames array. if so, it's rejected. If not, it's added to queues array.
        if (queueNames.indexOf(queueName) !== -1) {
            $('.queue-settings-container').before('<span class="queuename-duperror text-center">Duplicate queue. Please enter a different queue.</span>');
            //Fade out error message
            $('.queuename-duperror').delay(1200).fadeOut();
        } else if (queueName === "") {
            $('.queue-settings-container').before('<span class="queuename-emptyerror text-center">Please input a queue name.</span>');
            //Fade out error message
           $('.queuename-emptyerror').delay(1200).fadeOut();
        } else {     
            //Adds Queue button to array
            queues.push(repQueues);
            queueNames.push(queueName);

            //Queue Profile added in rep-profile container
            $('.queue-profiles').append(queueProfile);

            //Adds queues to Rep Profile card
            $('.rep-card-queues').append(repQueues);
            
            //Adds queues to Queue Volume cards
            $('.queue-imports').append(queueVolume);
        }//--close if statement
        
    //Clears queue input field
    $('#addQueue-name').val('');     
          
    //Hides queue-data to be toggled in drop-down
    $('.queue-data').hide();   
    
    //Hides notification circle (to be shown)
    $('.fa-circle').hide();    
        
    //Prevents default form submit, causing page reload
    event.preventDefault();
});//--close add queue
   
   
    
//--------Import Queues--------
    $('.importQueuesBtn').on('click', function() {
        $('.import-datestamp').empty();
        $('.volumes-header').before('<span class="import-datestamp">Last Import: ' + moment().format("MMMM Do, h:mma") + '</span>');
    });
    
    
    
//--------Popover--------    
//Code to initialize popover
$('.queue-imports').on('mouseover', '.qv-alert', function() {
    $(this).popover({
        html : true,
        content: function() {
            return $(this).find('.popover_content_wrapper').html();
        }
    });
});    
    
//Code to close popover on off click    
$('body').on('click', function(e) {    
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});
//Code to stop double-click to fire popover
$('body').on('hidden.bs.popover', function(e) {
    $(e.target).data('bs.popover').inState.click = false;
});

//Toggles visibility of notification circle for queue volumes
$('.queue-imports').on('change', '.qv-input', function() {  
    if ($(this).val() > 10) {
        $(this).parent('.queue-volume-input').siblings('.qv-alert').find('.fa-circle').show('fast');
    } else {
        $(this).parent('.queue-volume-input').siblings('.qv-alert').find('.fa-circle').hide('fast');
    }
});    


    
       
 
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
    
    //Show / Hide Non-Core Work cards from rep-buttons
    $('.rep-buttons').on('click', '.btn-rep', function() {
            //Toggles button color for select
            $(this).toggleClass('btn-default btn-success');
             
            var repSelect = $(this);
            
            //Removes "nc-" from ID in order to match to btn-rep ID
            $('.nc-input-card').each(function() {
                this.id = this.id.replace('nc-', '');
            });            
            
            //If btn-rep is selected then show corresponding non-core-work button
            if( $(this).hasClass('btn-success') ) {
                //For every nc-input-card if the IDs match the card is shown
                $('.nc-input-card').each(function() {
                    if ( ($(this).attr('id')) === (repSelect.attr('id')) ) {
                        $(this).show();
                    }
                });
                
            } else {   
                //For every nc-input-card if the IDs match the card is hidden
                $('.nc-input-card').each(function() {
                    if ( ($(this).attr('id')) === (repSelect.attr('id')) ) {
                        $(this).hide();
                        
                        //Clears nc-input input field
                        $(this).find('.nc-input').val('').trigger('change');
                    }
                });            
            }//--close if statement
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

