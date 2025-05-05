$(function() {
  // id属性がredの要素がクリックされたら
  $('#red').on('click', function(){
    // id属性がtargetの要素のcolorプロパティをredにする
    $('#target').css('color', 'red');
  });
 });