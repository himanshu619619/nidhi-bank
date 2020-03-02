

$(document).ready(function () {


    var chatbotIframe = document.getElementById("chatbot");
    chatbotIframe.style.border = "0";
    chatbotIframe.allowTransparency = "true";


    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var iOSSafari = iOS && webkit && !/(Chrome|CriOS|OPiOS)/.test(ua);

    $(document).on('click', '.chatImgWrapper', function (e) {
        e.preventDefault();
        if (iOSSafari) {
            window.location.href = 'https://ai.axisbank.co.in/morfeuswebsdk/';

        }
        else {
            var openChatBtn = document.getElementById('openChatBtn');

            chatbotIframe.src = "https://ai.axisbank.co.in/morfeuswebsdk/";//"https://axis-sit.active.ai/morfeuswebsdk/";

            chatbotIframe.style.display = "block";
            $('.divIframeChat,.divIframeChat .close').fadeIn(500);
            $('.chatImgWrapper .tooltip').hide();
        }
        return false;
    });

    $(document).on('click', '.divIframeChat .close', function () {
        // $('#chatbot').remove();
        $('.divIframeChat,.divIframeChat .close').fadeOut(500);
    }); 
	if (window.location.href.indexOf("aha-show") > -1) {
			$('.chatImgWrapper').trigger('click');
			$('.divIframeChat, #chatbot').show();
		}
    $(window).load(function () {
        $('.chatImgWrapper').addClass('active');
		
		
    });

    function logOutChat(event) {
        console.log(event);
    }
	
	
	

});

setTimeout(function(){
    $('.chatImgWrapper').removeClass('active');
	},10000);