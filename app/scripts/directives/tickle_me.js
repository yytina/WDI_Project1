angular.module('ticketyApp')
	.directive("tickleMe",function(){
		return {
			restrict: 'A', // E or EA
			link: function (scope, element, attrs) {
					element.bind('mouseenter', function(){
						//event.srcElement.attributes.class.value+="testOrange";
						 element.addClass("testClass");
						
					});
				    element.bind('mouseleave', function(){
						//srcElement.attributes.class.value-="testOrange";
						element.removeClass("testClass");
						alert("Remove Black background color");
					});
					element.bind('click', function(){
						alert("Don't tickle me ~");
					});

			}
		}
	})


