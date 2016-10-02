(function ( $ ) {

	$.fn.editor = function( options ) {
		var settings = $.extend({
			addClass: "textarea"
		}, options );
	
		var commands = '[' +
			'{"cmd": "bold","icon": "fa fa-bold","classname": "font-style cmd"},'+
			'{"cmd": "italic","icon": "fa fa-italic","classname": "font-style cmd"},'+
			'{"cmd": "underline","icon": "fa fa-underline","classname": "font-style cmd"},'+
			'{"cmd": "strikeThrough","icon": "fa fa-strikethrough","classname": "font-style cmd"},'+
			'{"cmd": "justifyLeft","icon": "fa fa-align-left","classname": "active align cmd"},'+
			'{"cmd": "justifyCenter","icon": "fa fa-align-center","classname": "align cmd"},'+
			'{"cmd": "justifyFull","icon": "fa fa-align-justify","classname": "align cmd"},'+
			'{"cmd": "justifyRight","icon": "fa fa-align-right","classname": "align cmd"},'+
			'{"cmd": "decreaseFontSize","icon": "fa fa-font small","classname": "cmd"},'+
			'{"cmd": "increaseFontSize","icon": "fa fa-font large","classname": "cmd"},'+
			'{"cmd": "insertOrderedList","icon": "fa fa-list-ol","classname": "list-style cmd"},'+
			'{"cmd": "insertUnorderedList","icon": "fa fa-list-ul","classname": "list-style cmd"},'+
			'{"cmd": "insertParagraph","icon": "fa fa-paragraph","classname": "cmd"},'+
			'{"cmd": "undo","icon": "fa fa-undo","classname": "cmd"},'+
			'{"cmd": "redo","icon": "fa fa-repeat","classname": "cmd"},'+
			'{"cmd": "copy","icon": "fa fa-files-o","classname": "cmd"},'+
			'{"cmd": "cut","icon": "fa fa-scissors","classname": "cmd"},'+
			'{"cmd": "paste","icon": "fa fa-clipboard","classname": "cmd"}'+
		']';
		
		var current;

		return this.each(function() {
			
			$(this).focus(function() {
				current = $(this);
			});
			
			var self = $(this);
			var editor = $(".editor");
		
			editor.html('<ul class="editor-icons"></ul>');
			var icons = editor.children(".editor-icons");
		
			$(this).attr("contenteditable", true);
			if(settings.addClass.length) {
				$(this).addClass(settings.addClass);
			}	
			var command = $.parseJSON(commands);
		
			for(x = 0, len = command.length; x < len; x++) {
				var cmd = command[x].cmd;
				var icon = command[x].icon;
				var clss = command[x].classname;
				$(icons).append('<li><button data-cmd="'+cmd+'" class="'+clss+'"><i class="'+icon+'"></i></button></li>');
			}

		
			var range = document.createRange();
			var item = $( self ).get( 0 );

			range.selectNode(item);
			
			var selObj = window.getSelection(); 
			var selRange = selObj.getRangeAt(0);

			var start = selRange.startContainer;
			var end = selRange.endContainer;
		
			$(document).on("click", "button.cmd", function() {
			
				var cmd = $(this).attr("data-cmd");
				document.execCommand(cmd, false, "");
			
				if($(this).hasClass("font-style") || $(this).hasClass("list-style") || $(this).hasClass("align")) {
					$(this).toggleClass("active");
				}
				if($(this).hasClass("list-style")) {
					var list = $(this).parents("li").siblings("li").find(".list-style");
					if($(this).hasClass("active") && $(list).hasClass("active")) {
						$(list).removeClass("active");
					}
				}
				if($(this).hasClass("align")) {
					if($(this).hasClass("active")) {
						$(this).parents(".editor").find(".align").not(this).removeClass("active");
					}
				}
				$(current).focus();
				
			});
			
			$(this).on("keyup", function() {
				$(editor).find(".cmd").each(function() {
					var cmd = $(this).attr("data-cmd");
					if(!document.queryCommandState(cmd)) {
						$(this).removeClass("active");
					}else {
						$(this).addClass("active");
					}
				});
			});
			
		});
	};

}(jQuery));

