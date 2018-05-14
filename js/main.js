$("#back-to-top").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
});
var template = $('#template').html();
var mainRow = $('#mainRow');
var colections = $('.colections');
colections.on('click',function (e) {
    e.preventDefault();
    colections.parent().removeClass('active');
    $(this).parent().addClass('active');
    var cat = $(this).data('kolekcija');
   display(cat);
});
display(null);

function display(categoria) {

        $.ajax({
            url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
            type : 'get',
            dataType : "json"
        }).then(function (response) {
         
            mainRow.html("");
            if (!categoria){
                $(response).each(function (i,e) {
                    var alt = new RegExp('{{productTitle}}','g');
                    var newTemplate = template
                        .replace('{{imgSrc}}',e.imgSrc)
                        .replace('{{model}}',e.model)
                        .replace('{{price}}',e.price)
                        .replace(alt,e.productTitle);
                    mainRow.append(newTemplate);
                })
            }else if(categoria == 'female'){
              var femaleCollection  = response.filter(function (el) {
                  return el.colection == 'female';
              });
               insertFilter(femaleCollection)
            }else if(categoria == 'male'){
                var maleCollection  = response.filter(function (el) {
                    return el.colection == 'male';
                });
               insertFilter(maleCollection);
            }else if(categoria == "novaKolekcija"){
                 var newCollection  = response.filter(function (el) {
                    return el.newCol;
                });
                   insertFilter(newCollection)
            }else if(categoria == "popular"){
                 var newCollection  = response.filter(function (el) {
                    return el.popular;
                });
                   insertFilter(newCollection)
            }else if(categoria == "action"){
                 var newCollection  = response.filter(function (el) {
                    return el.action;
                });
                 insertFilter(newCollection)
            }
        });
}

function insertFilter(cat) {
       $(cat).each(function (i,e) {
                    var alt = new RegExp('{{productTitle}}','g');
                    var newTemplate = template
                        .replace('{{imgSrc}}',e.imgSrc)
                        .replace('{{model}}',e.model)
                        .replace('{{price}}',e.price)
                        .replace(alt,e.productTitle);
                    mainRow.append(newTemplate);
                })
}