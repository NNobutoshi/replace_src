/*!
* jQuery.replace_src
* version : 1.0.0
* link    : https://github.com/NNobutoshi/replace_src/
* License : MIT
*/
;(function($){
  var
   pluginName = 'replaceSrc'
  ;
  $.fn[pluginName] = function(options) {
    this.each(function(){
      var
       $this = $(this)
      ;
      if(!$this.data(pluginName)){
        $this.data(pluginName,_inherit($[pluginName]).init(this,options));
      }
    });
    return this;
  };
  $[pluginName] = {
     element       : null
    ,defaultImgSrc : ''
    ,preloadeImg    : null
    ,stockedImgSrc : ''
    ,settings      : {
       suffix            : '_ovr'
      ,opacity           : 0.5
      ,ignoreTouchEvents : false
    }
    ,state : 'out'
    ,init : function(element,options){
      var
       that     = this
      ,$element = $(this.element = element)
      ,settings = this.settings = $.extend({},this.settings,options)
      ;

      this.defaultSrc      = element.src;
      this.preloadeImg     = new Image();
      this.preloadeImg.src = this.getNewSrc(this.defaultSrc,settings.suffix);

      this.overHandle = function(e){
        if(e.handleObj.type === 'touchstart') {
          $element.off('mouseenter',that.overHandle);
          $element.off('mouseleave',that.outHandle);
        }

        if(
             e.handleObj.type !== 'touchstart'
          || settings.ignoreTouchEvents !== true
        ){
          that.run(this,that.preloadeImg.src);
          that.state = 'over';
        }
      };

      this.outHandle = function(e){
        if(
             e.handleObj.type !== 'touchend'
          || settings.ignoreTouchEvents !== true
        )
        {
          that.run(this,that.defaultSrc);
          that.state = 'out';
        }
      };

      $element
       .on('mouseenter',this.overHandle)
       .on('mouseleave',this.outHandle)
       .on('touchstart',this.overHandle)
       .on('touchend',this.outHandle)
      ;

      return this;
    }
    ,run : function(element,src){
      element.src = src;
    }
    ,getNewSrc : function(src,suffix){
      return src.replace(/(\.gif|\.je?pg|\.png)\??.*$/,function(m){
        return suffix + m;
      });
    }
    ,destroy : function(){
      return $(this.element)
       .off('mouseover',this.overHandle)
       .off('mouseout',this.outHandle)
       .off('touchstart',this.overHandle)
       .off('touchend',this.outHandle)
       .removeData(pluginName)
      ;
    }
  };

  function _inherit(o) {
    if(Object.create){
      return Object.create(o);
    }
    var F = function(){};
    F.prototype = o;
    return new F();
  }
})(jQuery);