/**
* NF-Carousel
* Copyright Nick Freese 2023
*/
    window.nfModalFactory = {

    getTemplate: function(){

      
        return `<div x-data="window.nfModalFactory.i(nfModalConfig)" x-ref="nfmodal" x-transition  class="text-sm fixed w-screen h-screen bg-black/80 box-border top-0 right-0 flex" >
           
            <div class="box-border bg-slate-50 w-10/12 h-5/6 m-auto p-20 block rounded" @click.outside="open = !open">
                 <div x-html="content"></div>
                 <div class="opacity-50 text-white cursor-pointer fixed top-0 right-0 text-xl text-center m-4 aspect-square w-8 h-8 tranisiton-all hover:opacity-80" @click="open = !open">&#x2715</div>
           </div>`;

    },

    i:function(config){
      return {

        init(){
          var _this = this;
          
        },

        content:config.content || "",


      }

    }
  }
