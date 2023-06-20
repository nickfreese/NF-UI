/**
* NF-Carousel
* Copyright Nick Freese 2023
*/
    window.nfMegaFactory = {

    getTemplate: function(){

      
        return ``;

    },


    

    i:function(config){
      return {

        init(){
          var _this = this;

          this.main = {
            name:this.megaName,
            url:"",
            children: this.data
          };

          window.addEventListener('open-'+config.name, function(e){
              _this.openMobileMenu(e.detail);
          });

          window.addEventListener('open-flyout-'+config.name, function(e){
            console.log(e);
              _this.openFlyout(e.detail);
          });

          return _this;
          
        },
        
        megaName: config.name,
        data: config.data || {},
        flyoutSize:config.flyoutSize || 1,
        mobileOpen: false,
        config:config,
        
        aboveLinks:config.aboveLinks || "",
        belowLinks:config.belowLinks || "",
    





        /*
        * mobile
        */

        openMobileMenu:function(id = null){
            
            this.mobileOpen = !this.mobileOpen;
        
        },

        openMobileView: function(name){
            console.log(name);
            var view = document.querySelector('div[data-mega-name="'+name+'"]');
            var views = document.querySelectorAll('div[data-mega-name]');
             console.log(view);

            
          for(var e= 0; e < views.length;e++){
            if (views[e].getAttribute("data-mega-name") !== view.getAttribute("data-mega-name")) {

              views[e].classList.add('hidden');
            }
          }

          view.classList.toggle('hidden');



        },

        getMobileViewByName:function(name){

          if (name == this.megaName) {
              return this.main;
          }

          for(var e = 0;e < this.main.children.length;e++){
            if(this.main.children[e].name == name){

              return this.main.children[e];

            } else {
              var result = this.getIfObjectMatchesName(name, this.main.children[e]);
              if (result == null) {
                  continue;
              } else {
                  console.log(result)
                  return result;
              }
            }
          }

          return null;
        },

        getParentMobileViewByName:function(name){

          if (name == this.megaName) {
              return this.main;
          }

          for(var e = 0;e < this.main.children.length;e++){
            if(this.main.children[e].name == name){

              return this.main;

            } else {
              var result = this.getParentIfObjectMatchesName(name, this.main.children[e], this.main);
              if (result == null) {
                  continue;
              } else {
                  console.log(result)
                  return result;
              }
            }
          }

          return null;
        },


        getIfObjectMatchesName: function(name, obj){

          if (obj.name == name){
            return obj; 
          } 
          result = null;
          if(typeof obj.children == "undefined"){
              return null;
          }
          for(var e = 0;e < obj.children.length;e++){
            result = this.getIfObjectMatchesName(name, obj.children[e]);
             if (result !== null){
              return result;
             }
          }  
          return null;
          
        },

        getParentIfObjectMatchesName: function(name, obj, parent){

          if (obj.name == name){
            return parent; 
          } 
          result = null;
          if(typeof obj.children == "undefined"){
              return null;
          }
          for(var e = 0;e < obj.children.length;e++){
            result = this.getParentIfObjectMatchesName(name, obj.children[e], obj);
             if (result !== null){
              return obj;
             }
          }  
          return null;
          
        },


        getTitleAdditions: function(link){
            if (typeof link.children !== "undefined"){
              return  "<span class='float-right'> &rsaquo;</span>";
            }
            return "";
        },

        getHtmlOfLink: function(link){
          if (typeof link.html !== "undefined" ){
              return link.html+this.getTitleAdditions(link);
          } 
          return link.name + this.getTitleAdditions(link);
        },

        hasChildren: function(link){
          if (typeof link.children !== "undefined" ){
              return true;
          } 
          return false;

        },

       /* getMobileCategoryTemplate:function(link){
            data = JSON.parse(JSON.stringify(link));
            
            var inner = "";
            if (typeof data.children !== "undefined") {
             
             for (var e = 0; e < data.children.length;e++) {
                  console.log(data.children[e]);
                  inner = inner + this.getMobileCategoryTemplate(data.children[e]);
                  console.log(inner);
              }
            }

            

            return `
                <div x-data="{data: link}" x-bind:data-mega-name="data.name" class="hidden absolute w-full h-full top-0 left-0 bg-white">
                <h3 x-text="data.name"></h3>
                <div>
                    <template x-for="link2 in data.children">
                        <div x-text="link2.name" @click="openMobileView(link2.name)"></div>
                    </template>
                    
                    
                </div>
                <div x-data="{link: data}">

                `+inner+`
                </div>
                </div>
            `;
        },*/

        getAllCategoryTemplatesHtml: function(data){

          data = JSON.parse(JSON.stringify(data));

          var html = this.getMobileCategoryTemplate(data);

          return html;

        },

    
        /*
        * Desktop
        */

        getFontClassBasedOnIndex: function(index){
          if (index == 0) {
             return "font-bold";
          } else {
            return "";
          }
          
        },

        openFlyout:function(i)
        {

          var megaWrap = this.$refs.megaDesktopWrap;
         
          var currentTabFlyout = megaWrap.querySelectorAll(".nf-mega-flyout")[i];

          //console.log(currentTabFlyout.parentElement.dataset);

          /*if(typeof this.$data['flyoutOpen'+i] == 'undefined'){
              this.$data['flyoutOpen'+i] = false;
          }

          this.$data['flyoutOpen'+i] = !this['flyoutOpen'+i];*/
          var tabs = megaWrap.querySelectorAll(".nf-mega-flyout");
          for(var e= 0; e < tabs.length;e++){
            if (e !== i) {

              tabs[e].classList.add('hidden');
            }
          }

          currentTabFlyout.classList.toggle('hidden');

          this.positionFlyout(i);


        },

        positionFlyout: function(i)
        {

          
          
          var megaWrap = this.$refs.megaDesktopWrap;
         
          var currentTab = megaWrap.querySelectorAll(".nf-mega-flyout-tab")[i];
          var currentTabFlyout = megaWrap.querySelectorAll(".nf-mega-flyout")[i];

          
          var pw = megaWrap.offsetWidth;
          var w = currentTabFlyout.offsetWidth;

          var l = currentTab.offsetLeft;
          var tw = currentTab.offsetWidth;
          

          if (pw > (pw*this.flyoutSize)+l) {
              //position to tab left
              currentTabFlyout.style.left = l + "px";
              currentTabFlyout.style.right = "auto";
          } else{
             // currentTabFlyout.style.right = pw-(tw+l) + "px";
            //  currentTabFlyout.style.left = "auto";

            currentTabFlyout.style.right = 0 + "px";
            currentTabFlyout.style.left = "auto";
          }


          

        },



        getFlatData:function(){

        },

        getFlattenedFlyout:function(data){

          data = JSON.parse(JSON.stringify(data));

          var newData = [{name: data.name, url:data.url}];

              for (child in data.children) {
                  newData = newData.concat(this.getFlattenedFlyout(data.children[child]));
              }

          return newData;
            
        },

        getCategoryTemplate: function(data){

        return `
            <div>
                
            </div>    
        `;

       },


      }

    }
  }
