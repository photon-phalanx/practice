/**
 * Created by Photon_palanx on 2017/2/9.
 */
$(function () {
/*
    $('.main-content .middle-content .title-box .title').each(function (index) {
        $(this).mouseover(function (event) {
            $('.main-content .middle-content .title-box .title.active').removeClass('active');
            $(this).addClass('active');
            $('.main-content .middle-content .content-box .content.active').removeClass('active');
            $('.main-content .middle-content .content-box .content:eq(' + index + ')').addClass("active");
        })
    });
 想用一个函数管全部系列
    */
    $('.main-content>div').each(function () {
        //这是3个栏，左中右
        $(this).children('.msg-block').each(function () {
            //这里已经是某一个栏的div了
            var self =$(this);
            self.find('.title-box .title').each(function (index) {
                $(this).mouseover(function (event) {
                    self.find('.title-box .title.active').removeClass('active');
                    self.find('.content-box .content.active').removeClass('active');
                    $(this).addClass('active');
                    self.find('.content-box .content:eq('+index+')').addClass('active');
                })
            });
        });
    });
});
