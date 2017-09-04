$(document).ready(function() {
	
	$('#btn-next-second-step').click(function () {
		$('.first-step').fadeOut(500, function() {
			$('.processing-request-wrapper').fadeIn(500, function() {
				setTimeout(function() { $('.processing-request-wrapper').fadeOut(500, function() {
					setTimeout(function() { $('.second-step').fadeIn(); }, 10 );
					window.scrollTo(0, $(".second-step").offset().top);
				}); }, 1500 );
			});
		});		
	});
	
	var $RP_amount_list = $('.rp-amount-select');
	$('#btn-next-third-step').click(function () {
		if ($RP_amount_list.hasClass('active')) {
			$('.second-step').fadeOut(500, function() {			
				$('.generator-console-wrapper').fadeIn(500, function() {
					setTimeout(function() { $('.console-message-1').fadeIn(); }, 300 );
					setTimeout(function() { $('.console-message-2').fadeIn(); }, 1200 );
					setTimeout(function() { $('.console-message-3').fadeIn(); }, 2100 );
					setTimeout(function() { $('.console-message-4').fadeIn(); }, 3000 );
					setTimeout(function() { $('.console-message-5').fadeIn(); }, 4500 );
					setTimeout(function() { $('.console-message-6').fadeIn(); }, 5800 );
					setTimeout(function() { $('.console-message-7').fadeIn(); }, 6800 );
					setTimeout(function() { $('.console-message-8').fadeIn(); }, 7900 );
					setTimeout(function() { $('.console-message-9').fadeIn(); }, 10500 );
					setTimeout(function() { $('.console-message-10').fadeIn(); }, 11800 );
					setTimeout(function() { $('.console-message-11').fadeIn(); }, 13500 );
					setTimeout(function() { $('.console-message-12').fadeIn(); }, 15000 );
					setTimeout(function() { $('.generator-console-wrapper').fadeOut(200); }, 17500 );	
					setTimeout(function() { $('.human-verification-wrapper').fadeIn(200); }, 17700 );	
				});
			});
		} else {
			sweetAlert("Error", "Please select the amount of Riot Points to add.", "error");
		}
	});	
	
    $('.popup-tos').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-contact').magnificPopup({
        type: 'inline',
        preloader: false
    });
    $('.popup-pp').magnificPopup({
        type: 'inline',
        preloader: false
    });
	
	var $selected_RP = '';
	
	function fixRPBox($RP_parent_class) {
        resetRPBoxes();
        if ($RP_parent_class.hasClass('rp-select-1')) {
            $selected_RP = '99999';
        }
        if ($RP_parent_class.hasClass('rp-select-2')) {
            $selected_RP = '499999';
        }
        if ($RP_parent_class.hasClass('rp-select-3')) {
            $selected_RP = '999999';
        }
        $RP_parent_class.addClass('active');
    }	
    function resetRPBoxes() {
        var $RP_list = $('.rp-select-1, .rp-select-2, .rp-select-3');	
        if ($RP_list.hasClass('active')) {
            $RP_list.removeClass('active');
        }
    }
	$('.rp-amount-select').click(function() {
		fixRPBox($(this));				      
    });
	
	
});
function UpdateSummoner() {
	$('.loading-summoner-info').fadeIn();
	setTimeout(function() { $('.loading-summoner-info').fadeOut(); }, 1500 );
	setTimeout(function() {
	   $region = $('input[type=radio]:checked').val();
	   $name   = $('#summoner-name').val();
	   if($name.length > 0 && typeof($region) != "undefined")
	   $.get("api.php?region="+$region+"&name="+ $name,function(data)  {
			$js = $.parseJSON(data);
			$('#summoners_name').text($('#summoner-name').val());
			$('#summoners_image').attr("src",$js.pic);
			$('#summoners_wins').text($js.wins > 0 ? "Wins: " + $js.wins : "Wins : 0");
			$('#summoners_level').text($js.level);
			$('#summoners_region').text($('input[type=radio]:checked').next().text());
			$history=  $('.summoners_match_history_data .match');
			for(i = 0; i != 4;i++) {
				$curr_match = $history[i];
				$curr_game = $js.games[i+1];
				$($curr_match).removeClass("win").removeClass("loss").addClass($curr_game.outcome ? "win" : "loss");
				$($('.match > .match_outcome')[i]).text($curr_game.outcome ? "WIN" : "LOSS");
				$($('.match > .match_stats > #stat_list > li #match_kills')[i]).text($curr_game.kills);
				$($('.match > .match_stats > #stat_list > li #match_deaths')[i]).text($curr_game.deaths);
				$($('.match > .match_stats > #stat_list > li #match_assists')[i]).text($curr_game.assists);
				champIdToString($curr_game.champ,function(data,trash_var) {
					$($('.match > .match_champion_name')[trash_var]).text(data);
					$($('.match > .match_champion_image #champion_image')[trash_var]).attr("src","http://ddragon.leagueoflegends.com/cdn/5.23.1/img/champion/"+ data+".png");
				},i);
			}
			$('.btn-next-second-step').fadeIn().css("display","block");
			$('.summoner-info-wrapper-inner').removeClass('blurred');
			window.scrollTo(0, $(".summoner-info-wrapper-inner").offset().top);

	   });
    }, 500 );
}
$( "#btn-next-first-step" ).click(function() {
	if($('#summoner-name').val() != '' && $("input[name='region']:checked").val()){
		UpdateSummoner();
	} else {
		 sweetAlert("Error", "Please enter your Summoner Name and select your Region.", "error");
	}	
});
function champIdToString(id,cb,trash_var) {
	$.ajax({
		url: 'http://ddragon.leagueoflegends.com/cdn/5.23.1/data/en_US/champion.json',
		dataType: 'JSON',			
		success: function (champs) {
			var i = 0;
			for (var champ in champs.data) {
				if(parseInt(champs.data[champ].key) == id) { cb(champ,trash_var)};
			}
		}
	});
}
function rng(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);

}
$('.recent-activity').niceScroll({
	autohidemode: false,
	cursorcolor:"#0c707d",
	cursorborder:"1px solid #08535d"
});
$('#ascrail2000').show();