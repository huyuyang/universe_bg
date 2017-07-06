var support=function(){
    var n={
        isIE:function(){return/(msie|trident)/.test(navigator.userAgent.toLowerCase())},
        transition:function(){
            var n=function(){
                var n,
                    t=document.createElement("bootstrap"),
                    e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};
                for(n in e)
                    if(void 0!==t.style[n]) return{end:e[n],prop:n}
            }();return n},
        animation:function(){
            var n=function(){
                var n,
                    t=document.createElement("bootstrap"),
                    e={WebkitAnimationName:"webkitAnimationEnd",MozAnimationName:"animationend",OAnimationName:"oanimationend",msAnimationName:"animationend",animation:"animationend"};
                for(n in e)
                    if(void 0!==t.style[n])return{end:e[n],prop:n}
            }();return n},
        video:function(){
            var n=!1,
                t=document.createElement("video");
            return t.canPlayType&&t.canPlayType("video/mp4").replace(/no/,"")&&(n=!0),n
        },
        transform:function(){
            for(var n,t=["-webkit-","-o-","-moz-","-ms-",""],e=document.createElement("p"),i=0,o=t.length;o>i;i++)
                if(n=Utils.toCamelCase(t[i]+"transform"),n in e.style)
                    return n;return!1
        },
        canvas:function(){return!!document.createElement("canvas").getContext},
        svg:function(){
            var n="http://www.w3.org/2000/svg";
            return!!document.createElementNS&&!!document.createElementNS(n,"svg").createSVGRect
        }
    };
    return function(t){return"function"==typeof n[t]&&(n[t]=n[t].apply(n)),n[t]}
}();
var RAF=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},
    Utils=function(){
        function n(){this.handlers=[]}
        return n.prototype={constructor:n,
            on:function(e,n){this.handlers.push({type:e,handler:n})},
            off:function(e){for(var n=this.handlers,t=0;t<n.length;t++)n[t].type===e&&(n.splice(t,1),t--)},
            trigger:function(e,n){for(var t=this.handlers,i=0;i<t.length;i++)t[i].type===e&&t[i].handler.apply(this,n||[])}
        },{event:n,
            isMobile:function(){return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)},
            raf:function(e){RAF(e)},
            rafFlow:function(){var e=arguments,n=0,t=function(){e[n]&&RAF(function(){e[n](),n++,t()})};t()},
            transitionAndEnd:function(e,n,t,i){
                var o=support("transition");
                if(o){
                    e.off(o.end),n(e);var a=0,r=e.length;e.each(function(n,i){$(i).on(o.end,function(n){n.target===i&&($(i).off(o.end),a++,r===a&&t&&t(e))})})
                }else n(e),i?i(e):t(e)
            },
            scale:function(e){
                var n=e.data("scale"),t=utils.getScaleData(n);$.each(t,function(e,n){t[e]=100*n+"%"}),e.css(t)
            },
            getParallaxData:function(e){
                var n=e.split(","),
                    t={},
                    i={r:"range",s:"speed",i:"init"};
                return $.each(n,function(e,n){var o=n.split(":");t[i[o[0]]]=+o[1]||0}),t
            },
            collectParallax:function(){
                var e=[];
                return $(".js-parallax-group").each(function(n,t){
                    var i=$(t),
                        o={top:i.offset().top,height:i.height(),children:[]};
                    i.find(".js-parallax").each(function(e,n){
                        var t=$(n);
                        Utils.css3(n,{transition:"all 700ms cubic-bezier(0.39, 0.575, 0.565, 1)"}),o.children.push($.extend({$el:t,init:0,current:0},Utils.getParallaxData(t.data("p"))))}),e.push(o)}),e
            },
            scrollTo:function(e,n){
                $("html, body").animate({scrollTop:e},500,n)
            },
            toCamelCase:function(e){
                return e.toLowerCase().replace(/(\-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})
            },
            css3:function(e,n){
                var t=["-webkit-","-o-","-moz-","-ms-",""];
                for(var i in n)for(var o,a=0,r=t.length;r>a;a++)o=Utils.toCamelCase(t[a]+i),o in e.style&&(e.style[o]=n[i])
            },
            retinaScale:function(e){
                var n=e.getContext("2d"),
                    t=e.width,
                    i=e.height;
                window.devicePixelRatio&&(e.style.width=t+"px",e.style.height=i+"px",e.height=i*window.devicePixelRatio,e.width=t*window.devicePixelRatio,n.scale(window.devicePixelRatio,window.devicePixelRatio))
            },
            loadCanvasImage:function(n,t){
                var i=$.Deferred(),
                    o=new XMLHttpRequest;
                return o.onload=function(){
                    var t=URL.createObjectURL(this.response);
                    n.onload=function(){i.resolve(),URL.revokeObjectURL(t)},n.onerror=function(){i.reject(e)},n.src=t
                },
                    o.onerror=function(e){
                        i.reject(e)},o.open("GET",t,!0),o.responseType="blob",o.send(),i.promise()
            }
        }
    }();

!function(){
    function t(){
        universe=g.getContext("2d");
        for(var t=0;o>t;t++){
            w[t]=new e,w[t].reset();
        }
        i()
    }
    function i(){
        universe.clearRect(0,0,r,a);
        for(var t=w.length,e=0;t>e;e++){
            var s=w[e];s.move(),s.fadeIn(),s.fadeOut(),s.draw()
        }
        RAF(i)
    }
    function e(){
            this.reset=function(){
                this.giant=s(3),
                this.comet=this.giant||y?!1:s(10),
                this.x=n(0,r-10),
                this.y=n(0,a),
                this.r=n(1.1,2.6),
                this.dx=n(d,6*d)+(this.comet+1-1)*d*n(50,120)+2*d,
                this.dy=-n(d,6*d)-(this.comet+1-1)*d*n(50,120),
                this.fadingOut=null,
                this.fadingIn=!0,
                this.opacity=0,
                this.opacityTresh=n(.2,1-.4*(this.comet+1-1)),
                this.run=n(5e-4,.002)+.001*(this.comet+1-1)
            },
            this.fadeIn=function(){
                this.fadingIn&&(this.fadingIn=this.opacity>this.opacityTresh?!1:!0,this.opacity+=this.run)
            },
            this.fadeOut=function(){
                this.fadingOut&&(this.fadingOut=this.opacity<0?!1:!0,this.opacity-=this.run/2,(this.x>r||this.y<0)&&(this.fadingOut=!1,this.reset()))
            },
            this.draw=function(){
                if(universe.beginPath(),this.giant)
                    universe.fillStyle="rgba("+l+","+this.opacity+")",universe.arc(this.x,this.y,2,0,2*Math.PI,!1);
                else if(this.comet){
                    universe.fillStyle="rgba("+v+","+this.opacity+")",universe.arc(this.x,this.y,1.5,0,2*Math.PI,!1);
                    for(var t=0;30>t;t++)
                        universe.fillStyle="rgba("+v+","+(this.opacity-this.opacity/20*t)+")",universe.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),universe.fill()
                }else universe.fillStyle="rgba("+m+","+this.opacity+")",universe.rect(this.x,this.y,this.r,this.r);
                universe.closePath(),universe.fill()
            },
            this.move=function(){
                this.x+=this.dx,
                    this.y+=this.dy,
                    this.fadingOut===!1&&this.reset(),
                    (this.x>r-r/4||this.y<0)&&(this.fadingOut=!0)},
            function(){
                setTimeout(function(){y=!1},50)
            }()
    }
    function s(t){
        return Math.floor(1e3*Math.random())+1<10*t
    }
    function n(t,i){
        return Math.random()*(i-t)+t
    }
    function h(){
        r=$(g).parent().width(),
        a=$(g).parent().height(),
        o=r*f,
        u=r>a?a/2:r/2,c={x:r/2,y:a/2},
        g.setAttribute("width",r),
        g.setAttribute("height",a)
    }
    if(support("canvas")){
        window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
        var r,a,o,u,c,f=.216,d=.05,y=!0,
            l="180,184,240",
            m="226,225,142",
            v="226,225,224",
            g=document.getElementById("universe"),
            w=[];
        h();  //设置canvas宽高
        window.addEventListener("resize",h,!1);
        t();
    }
}();
