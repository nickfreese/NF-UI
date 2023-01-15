/**
* NF-Carousel
* Copyright Nick Freese 2023
*/
    window.nfCarouselFactory = {

    getTemplate: function(){

      return `<div x-data="window.nfCarouselFactory.i(nfCarouselConfig)" x-ref="nfcarousel" class="w-full flex-col">
    <div class="w-full relative overflow-x-hidden flex">
          <button x-ref="leftarrow" x-bind:class="arrowClasses" @click.prevent="goToPosition(currentPosition-1)" x-html="'&lsaquo;'"></button>

    <div class="nf-carousel-outer w-full overflow-x-hidden relative">
        <div class="nf-carousel-inner absolute inline flex w-auto transition-transform">
         <template x-for="item in items">
           <div  x-bind:class="getItemClasses" x-html='item' ></div>
         </template>
        </div>
    </div>
        <button x-ref="rightarrow" x-bind:class="arrowClasses" @click.prevent="goToPosition(currentPosition+1)" x-html="'&rsaquo;'"></button>

    </div>
    <template x-if="slider">
    <div class="w-full bg-gray-300 rounded opacity-10 hover:opacity-40 active:opacity-40 transition-all">
      <div class="nf-carousel-dragslider bg-gray-700 p-1 hover:cursor-grab active:cursor-grabbing rounded"></div>
    </div>
    </template>
  </div>`;

    },

    i:function(config){
      return {

        init(){
          var _this = this;

          for (key in config) {
              _this[key] = config[key];
          }
          this.$nextTick(() => { 

            var items = this.$refs.nfcarousel.querySelectorAll(".nf-carousel-item");

            this.resize();
            this.goToPosition(_this.currentPosition);
            
            if (typeof window.addSwipe !== "undefined") {

              window.addSwipe(this.$refs.nfcarousel,"left",function(){
                  _this.goToPosition(_this.currentPosition-1);
              })

              window.addSwipe(this.$refs.nfcarousel,"right",function(){
                _this.goToPosition(_this.currentPosition+1);
              })

            }
            
            window.addEventListener("resize", (event) => {
              _this.resize();
            });


            if(_this.slider){
                _this.dragger();
            }


            });
        },


        slider: true,
        sliderSize:0,
        sliderSensitivity:  25,
        numberOfItems:  4,
        slideSize:  0,
        currentPosition:  0,
        arrowSize:  25,
        arrowClasses: config.arrowClasses || "text-2xl p-2 box-border",
        widths:  {
          "1280":5,
          "980":4,
          "700":3,
          "678":2,
          "0":1
        },
        
        itemClasses: "break-words",
        itemMargin:  10,
        items:config.items,

        getItemClasses: function(){
            return "nf-carousel-item relative " + this.itemClasses;
        },
        resize: function(){
          var _this = this;
          this.$refs.leftarrow.style.width = _this.arrowSize+1 + "px";
          this.$refs.rightarrow.style.width = _this.arrowSize+1 + "px";
          var parent = this.$refs.nfcarousel;
          var width = parent.offsetWidth;
          var outer = this.$refs.nfcarousel.querySelector(".nf-carousel-outer");

          for (w in _this.widths){
                if(window.innerWidth > Number(w)){
                    _this.numberOfItems = _this.widths[w];
                }

          }

          //outer.style.width = (width-(this.arrowSize*2)) + "px";
          //outer.style.left = this.arrowSize + "px";

          width = width-(this.arrowSize*2);

          var items = this.$refs.nfcarousel.querySelectorAll(".nf-carousel-item");
          var inner = this.$refs.nfcarousel.querySelector(".nf-carousel-inner");
          
          _this.slideSize = width/_this.numberOfItems - ((_this.itemMargin));
          
          inner.style.width = (_this.slideSize*items.length)+((_this.itemMargin)*(items.length-1)) + "px";
          
          

          for(var i = 0; i < items.length;i++){
              items[i].style.width = _this.slideSize + "px";
              //items[i].style.marginLeft = _this.itemMargin + "px";
              if (i < items.length-1) {
                  items[i].style.marginRight = _this.itemMargin + "px";
              }
              
          }

          outer.style.height = inner.offsetHeight + "px";


          


          if (_this.slider) {
              var slider = _this.$refs.nfcarousel.querySelector(".nf-carousel-dragslider");
              _this.sliderSize = (slider.parentElement.offsetWidth/(this.items.length-(this.numberOfItems-1)));
              _this.maxSlider = (this.items.length-(this.numberOfItems-1));
              slider.style.width = (slider.parentElement.offsetWidth/(this.items.length-(this.numberOfItems-1))) + "px";

              
          }


        },
        goToPosition:function(position){

          var inner = this.$refs.nfcarousel.querySelector(".nf-carousel-inner");
          
          if (position > this.items.length-this.numberOfItems) {
             position = this.items.length-this.numberOfItems;
          } 
          if(position < 0){
             position = 0;
          }
          this.currentPosition = position;
          if(position == this.maxSlider){
              inner.style.transform = "translate3d("+ (-((this.slideSize+(0))*position)) + "px,0px,0px)";
          } else {
              inner.style.transform = "translate3d("+ (-((this.slideSize+(this.itemMargin))*position)) + "px,0px,0px)";
          }
          

          var slider = this.$refs.nfcarousel.querySelector(".nf-carousel-dragslider");
          slider.style.transform = "translate3d("+ (this.sliderSize*position) + "px,0px,0px)";

        },

        dragger:function(){
          var _this = this;
          let target = this.$refs.nfcarousel.querySelector(".nf-carousel-dragslider");

          function onDrag(e) {
            // we could make them global variables instead
            const {width, height} = window.getComputedStyle(target);
            
            if (typeof event.touches !== "undefined") {
              var touch = event.touches[0] || false;
                if (touch) {
                  e.clientX = touch.pageX;
                }

            }

            var position = e.clientX - +width.replace("px", "") / 2;
            
            for(var i = 0; i < _this.items.length;i++){
                if ( Math.abs((i*_this.sliderSize)-position) < _this.sliderSensitivity ) {
                    _this.goToPosition(i);
                }
            }
            if (position > 0 && position < (width.replace("px", "")*(_this.maxSlider-1)) ) {
                target.style.transform = `translate3d(${e.clientX - +width.replace("px", "") / 2}px, 0px, 0px)`;
            }
            

          }

          function onLetGo() {
              document.removeEventListener('mousemove', onDrag);
              document.removeEventListener('mouseup', onLetGo);
              document.removeEventListener('touchmove', onDrag);
              document.removeEventListener('touchend', onLetGo);
          }

          function onGrab() {
              document.addEventListener('mousemove', onDrag);
             document.addEventListener('mouseup', onLetGo);
              document.addEventListener('touchmove', onDrag);
             document.addEventListener('touchend', onLetGo);
          }

          target.addEventListener('mousedown', onGrab);
          target.addEventListener('touchstart', onGrab);
        }


      }
    }
  }


      window.addSwipe = function(el, direction,callback){
      var app = {

        xDown: null,                                                        
        yDown:null,

        i:function(){
          var _this = this;
          this.direction = direction;
          this.callback = callback;
          this.el = el;

          el.addEventListener('touchstart', function(e){

            _this.handleTouchStart(e)

          }, false);        
          el.addEventListener('touchmove', function(e){

            _this.handleTouchMove(e)

          }, false);

          return this;

        },
        getTouches: function(evt) {
          var _this = this;
           return evt.touches ||             // browser API
          evt.originalEvent.touches; // jQuery
        },                                                     
                                                                         
         handleTouchStart: function(evt) {
          var _this = this;
             const firstTouch = _this.getTouches(evt)[0];                                      
             _this.xDown = firstTouch.clientX;                                      
             _this.yDown = firstTouch.clientY;                                      
         },                                                
                                                                         
          handleTouchMove: function(evt) {
            var _this = this;
    if ( ! _this.xDown || ! _this.yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = _this.xDown - xUp;
    var yDiff = _this.yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if (_this.direction == "right") {
                _this.callback();
            }
        } else {
            /* left swipe */
            if (_this.direction == "left") {
                _this.callback();
            }
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            if (_this.direction == "up") {
                _this.callback();
            }
        } else { 
            /* up swipe */
            if (_this.direction == "down") {
                _this.callback();
            }
        }                                                                 
    }
    /* reset values */
    _this.xDown = null;
    _this.yDown = null;                                             
}

      }
      return app.i();
    }