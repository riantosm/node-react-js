var loading = document.getElementById('bg_loading');

window.addEventListener('load', function(){
	loading.setAttribute('class','bg_loading hide');
	$('body').removeClass('stop-scrolling');
    $('.header #atas').removeClass('atas_h');
    $('.header #atas').addClass('awal');
    $('.header #bawah').removeClass('bawah_h');
    $('.header #bawah').addClass('awal');
    $('.btns #atas').removeClass('atas_h');
    $('.btns #atas').addClass('awal');
});