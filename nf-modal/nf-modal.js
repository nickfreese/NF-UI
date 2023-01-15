/**
* NF-Carousel
* Copyright Nick Freese 2023
*/
    window.nfModalFactory = {

    getTemplate: function(){

      
        return `<div x-data="window.nfModalFactory.i(nfModalConfig)" x-ref="nfmodal" x-transition  class="text-sm fixed w-screen h-screen bg-black/80 box-border top-0 right-0 flex" >
           
            <div x-bind:class="getClasses" @click.outside="open = !open">
                 <template x-if="lazyContent !== null">
                     <div x-html="await content"></div>
                 </template>
                 <template x-if="lazyContent == null">
                     <div x-html="content"></div>
                 </template>
                 <div class="opacity-50 text-white cursor-pointer fixed top-0 right-0 text-xl text-center m-4 aspect-square w-8 h-8 tranisiton-all hover:opacity-80" @click="open = !open">&#x2715</div>
           </div>`;

    },

    i:function(config){
      return {

        async init(){
          var _this = this;

          if (_this.lazyContent !== null) {

            this.$watch('open', value => {
              if (value == true && _this.lazyContent !== null) {
                _this.content = _this.lazyContent();

              }
              
            })

          }
          
        },
        
        lazyContent: config.lazyContent || null,
        content:config.content || "",
        classes: config.classes || "box-border bg-slate-50 m-auto block rounded",
        dimensionClasses: config.dimensionClasses || "w-11/12 h-5/6 md:w-8/12 md:h-3/6 lg:w-7/12 lg:h-3/6 max-w-4xl p-20",

        get getClasses(){
          return this.classes + " " + this.dimensionClasses;
        }


      }

    }
  }
