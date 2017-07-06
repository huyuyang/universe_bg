define(function(require,exports,module){
	var $ = require('jquery');
	/**
	 * 元素添加鼠标过渡效果
	 * @param  {obj} obj          	需要处理的元素对象
	 * @param  {string} classname 	元素需要添加的class类名
	 * @param  {number} type      	1或2，1、即鼠标离开样式也随即取消，2、当前的元素始终保留一个高亮的样式
	 * @param  {obj} box          	父级对象
	 * @return {[type]}           	[description]
	 */
	module.exports = function(obj,classname,type,box){
		this.o = obj;
		this.addclass = classname;
		this.parent = box;
		this.mode = type;
		this.init();
	};
	module.exports.prototype.init = function(){
		var ts = this;
		var parent = ts.parent || "";
		var obj = $(parent+" "+ts.o);
		if(ts.mode == 1){
			obj.hover(function(){
				$(this).addClass(ts.addclass);
			},function(){
				$(this).removeClass(ts.addclass);
			});
		}else if(ts.mode == 2){
			obj.hover(function(){
				//$(parent).find(obj).removeClass(ts.addclass);
				obj.removeClass(ts.addclass);
				$(this).addClass(ts.addclass);
			});
		};
	};
});