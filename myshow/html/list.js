
window.onload=function () {
    $(".bottom").load("html/bottom.html",loadBottom)
    var _show=new ShowList();
    var _code=0;
    _show.tab();
    _show.getData("",_code);
    var myScroll=new IScroll('.content');
    $(document).on('touchend',function(){
        if(myScroll.y<myScroll.maxScrollY-50){
            _code++;
            alert("数据加载完成");
        }
    })

    function ShowList() {
        var _me=this;
        this.timer=null;
        this.tab=function () {
            $(".icon_list li").on("tap",function (){
                $(".icon_list li").css("color","");
                $(this).css("color","#fff");
                _me.getData($(this).index());
            })
        }
        this.getData=function (_id,_code) {
            $.ajax({
                type:"get",
                url:"http://datainfo.duapp.com/shopdata/getGoods.php",
                data:{classID:_id,pageCode:_code},
                dataType:"jsonp",
                success:function (data) {
                    var _list="";
                    $.each(data,function (i) {
                        var _d=data[i]["discount"]!=0?data[i]["discount"]:10;
                        _list+='<li><div class="img"><img src='+data[i]["goodsListImg"]+'></div><p class="title">'+data[i]["goodsName"]+'</p>' +
                            '<span class="price">￥'+data[i]["price"]+'</span><span class="discount">￥'+parseInt((data[i]["price"])*10/_d)+'</span></li>'
                    })
                    $(".content_list").html(_list);
                    myScroll.refresh();
                       $(".content_list li").on("tap",function (){
                          window.location.href='detail.html?id='+data[$(this).index()].goodsID+'';
                       })
                }
            })
        }
    }
}
