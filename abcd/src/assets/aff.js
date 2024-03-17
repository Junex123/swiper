var $j = jQuery.noConflict();
  
$j(function() {
  $j("#accordion-faqs").accordion({
    autoHeight: false,
    navigation: true,
    collapsible: true,
    active: false
  });
});

$j( "#accordion-faqs" ).accordion({
icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
});