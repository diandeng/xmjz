//手机版无内容，就转到PC版
setTimeout(function()
{
    if (Content.innerHTML.length<800 && location.pathname.indexOf("/xhtml") == 0)
    {
        location.replace(location.href.replace("/xhtml", "/html"));
    }
},500);

if(location.pathname=='/servlet/Node')location.replace("/"+(cook.get("status")=="1"?"x":"")+"html/folder/"+node.id+"-1.htm");

//判断是否转到PC版
function furl()
{
    var url = $("link[rel=canonical]").attr("href");
    if (!url) return;

    var host = location.host.substring(0, location.host.indexOf("."));
    if ("cms" == host) return;

    if (url.indexOf(".htm") == -1)
    {
        var TYPE = ["folder", "category", "page"];
        url += "html1/" + (TYPE[node.type] || "report") + "/" + parseInt(node.id / 10000) + "/" + node.id % 10000 + "-1.htm";
    }
    url += location.search;

    var i = url.indexOf('/', 8);
    if (/ Mobile| MiniProgramEnv/.test(navigator.userAgent))//转回手机版
    {
        if (url.indexOf("/html1") == i)
        {
            $.ajax({url: "/x"+url.substring(i+1) + "?test", async: false, success: function (d)
                {
                    var i = d.indexOf('<div id="Content">'), j = d.indexOf('<div id="Footer">', i);
                    if (j - i < 800) return;
                    location.replace(url.replace("/html", "/xhtml"));
                    return;
                }
            });
        }
    } else if (Math.min(screen.width, screen.height) >= 768)//转回PC版
    {
        if (url.indexOf("/xhtml1") == i)
        {
            location.replace(url.replace("/xhtml", "/html"));
            return;
        }
    }

    //停考项目
    if(node.id==15080206)url=url.replace("/www", "/cjcx");
    else if(node.id==15080211)url=url.replace("/www", "/zscx");

    //纠正域名
    var prefix = url.substring(url.indexOf('/') + 2, url.indexOf('.'));
    if (host != prefix) location.replace(url);
}
furl();


//统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?dc1d69ab90346d48ee02f18510292577";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//阿里
(function(w, d, s, q) { 
	w[q] =w[q] || []; 
	var f=d.getElementsByTagName(s)[0],j=d.createElement(s); 
	j.async=true; 
	j.id='beacon-aplus'; 
	j.src='https://d.alicdn.com/alilog/mlog/aplus/204458013.js'; 
	f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue');

aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['appKey', 'ggvrbpmpkjf02rub5jsbg0yj']  }) 
aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['aplus-rhost-v', 'qtedu.om.moe.edu.cn']  });


function ctip()
{
    alert("请复制本文章链接到浏览器打开！");
}

function back()
{
  try
  {
    if(/ miniProgram| MiniProgramEnv/.test(navigator.userAgent))//微信
      wx.miniProgram.navigateBack({delta:1});
    else if(/ swan\//.test(navigator.userAgent))//百度
      swan.webView.navigateBack();
    else if(/ MiniProgram/.test(navigator.userAgent))//支付宝
      my.navigateBack();
    else
      history.back();
  }catch(e)
  {
    history.back();
  }
}

function flink()
{
  /*
  $(".condition-right-bank").hide();
  $(".condition-right-bank-wx").show();

  $(".newstxt_txt a").attr("href","javascript:ctip()");
  $(".newstxt_txt a").removeAttr("target");
     
  //移除：页脚中的外链
  var arr=$("#Footer a");
  for(var i=0;i<arr.length;i++)
  {
    if(arr[i].href.indexOf(".neea.edu.cn/")>0)continue;
    arr.eq(i).removeAttr("href");
  }
  */
  //$("#Body a[href]").attr("href","javascript:").removeAttr("target");
  var arr=$("a[href]"),host=new RegExp("www.neea.edu.cn|www.neea.cn|gaokao.neea.edu.cn|chengkao.neea.edu.cn|yankao.neea.edu.cn|zikao.neea.edu.cn|ntce.neea.edu.cn|tdxl.neea.edu.cn|cet.neea.edu.cn|ncre.neea.edu.cn|nit.neea.edu.cn|pets.neea.edu.cn|wsk.neea.edu.cn|ccpt.neea.edu.cn|mhk.neea.edu.cn|toefl-main.neea.edu.cn|ielts-main.neea.edu.cn|testdaf-main.neea.edu.cn|jlpt-main.neea.edu.cn|topik-main.neea.edu.cn|gre-main.neea.edu.cn|gmat-main.neea.edu.cn|delf-dalf.neea.edu.cn|dele.neea.edu.cn|lsat.neea.edu.cn|gelpe-bras.neea.edu.cn|cyle.neea.edu.cn|cael.neea.edu.cn|cse.neea.edu.cn|ntce.neea.cn|tdxl.neea.cn|cet.neea.cn|mhk.neea.cn|toefl-main.neea.cn|ielts-main.neea.cn|testdaf-main.neea.cn|jlpt-main.neea.cn|topik-main.neea.cn|gre-main.neea.cn|gmat-main.neea.cn|bec.neea.cn|delf-dalf.neea.cn|dele.neea.cn|cyle.neea.cn|cael.neea.cn");
  for(var i=0;i<arr.length;i++)
  {
    var href=arr.eq(i).attr("href");
    if(href.indexOf("//")==-1||host.test(href))continue;
    arr.eq(i).attr("href","javascript:").removeAttr("target");
  }
}

//小程序：隐藏标题
if(/ miniProgram|swan\/| MiniProgram/.test(navigator.userAgent)||window.__wxjs_environment=='miniprogram'||/^webswan-/.test(window.name))
{
  document.write("<style>#Header,#Content .pathAll,#Footer ol{display:none;}"//页眉、路径、页脚/关于我们
     +"div#Content{padding-top:0 !important}</style>");

  
  $(flink);
  setTimeout(flink,1000);
}

//
function fenv(res)
{
  if(res.miniprogram)$("#Header").hide();
}
wx.miniProgram.getEnv(fenv);

if(/ AliApp/.test(navigator.userAgent))
{
  $.get("https://appx/web-view.min.js",function(nul,status,xhr)
  {
    my.getEnv(fenv);
  },"script");
}

function sectionTime(startTime, endTime, url) {
    try {
        var nowTime = new Date().getTime();
        startTime = new Date(startTime).getTime();
        endTime = new Date(endTime).getTime();
        if(nowTime >= startTime  && nowTime < endTime){
            if (url) {
                top.location.replace(url);
                return;
            }
            return true;
        }
    } catch (e) {}
    return false;
}
