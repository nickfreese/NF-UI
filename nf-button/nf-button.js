/**
* NF-Carousel
* Copyright Nick Freese 2023
*/
    window.nfButtonFactory = {

    getTemplate: function(){

      return  `<div x-data="window.nfButtonFactory.i(nfButtonConfig)" x-ref="nfbutton">
                 <button class="w-full h-8 py-2 px-4 rounded text-gray-700 shadow-md transition-all border-b border-transparent active:scale-1 transition-all flex justify-center items-center" :class="[successClass === true ? successColor + ' ' + successTextColor + ' ' + sucessButtonBottomBorderColor :  buttonColor + ' ' + textColor + ' ' + buttonBottomBorderColor, errorClass === true ? errorColor + ' ' + errorTextColor + ' ' + errorButtonBottomBorderColor: buttonColor + ' ' + textColor + ' ' + buttonBottomBorderColor]"  @click="clickWrapper($event, $data)" x-html="name" x-transition></button>
              </div>`;

    },

    i:function(nfButtonConfig){
      
      var app = {

        // [successClass === true ? successColor + ' ' + successTextColor :  buttonColor + ' ' + textColor, errorClass === true ? errorColor + ' ' + errorTextColor: buttonColor + ' ' + textColor]
        name:nfButtonConfig.buttonDefault,
        click:nfButtonConfig.click,
        buttonDefault:nfButtonConfig.buttonDefault,
        normalState: true,
        errorClass: false,
        successClass: false,
        buttonColor: 'bg-amber-300',
        textColor: 'text-black',
        buttonBottomBorderColor: 'hover:border-amber-500',



        errorColor: 'bg-red-200',
        errorTextColor: 'text-black',
        errorMessage: 'Error!',
        errorButtonBottomBorderColor: 'hover:border-red-500',

        successColor: 'bg-green-300',
        successTextColor: 'text-black',
        successMessage: 'Success!',
        sucessButtonBottomBorderColor: 'hover:border-green-500',

        init: function(nfButtonConfig){

            var _this = this;
            
            _this.setConfigs(nfButtonConfig);

            return _this;

        },

        setConfigs: function(conf){
          var _this = this;

          for (key in conf) {
            _this[key] = conf[key];
            console.log(key, _this[key]);
          }


        },
        
        clickWrapper: async function(e, data){
          var _this = this;
          
          //before
          _this.normalState = false;
          _this.name = _this.loadingSVG
          //do
          var clicked = await _this.click(e);

          //after
          if (clicked) {


            //success
           setTimeout(function(){
               _this.successClass = true;
               _this.name = _this.successMessage;
               
               //_this.successClass = false;
               setTimeout(function(){
                   _this.successClass = false;
                   _this.normalState  = true;
                   _this.name = _this.buttonDefault;
               }, 1000);
           }, 300);
            

          } else {
            //error

            //play quiver
            _this.errorClass = true;
            _this.name = _this.errorClass;
            _this.name = _this.errorMessage;


            //reset button
            setTimeout(function(){
               _this.errorClass = false;
               _this.name = _this.buttonDefault;
               _this.normalState = true;

           }, 1000);

          }

          

        },

       



        loadingSVG: '<div class="w-4 h-4 animate-spin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614 614"><g id="Layer_1"><g style="fill:none; opacity:.12;"><path d="m307,564c-68.65,0-133.19-26.73-181.73-75.27s-75.27-113.08-75.27-181.73,26.73-133.19,75.27-181.73,113.08-75.27,181.73-75.27,133.19,26.73,181.73,75.27,75.27,113.08,75.27,181.73-26.73,133.19-75.27,181.73-113.08,75.27-181.73,75.27Z" style="fill:#fff;"/><path d="m307,100c55.29,0,107.27,21.53,146.37,60.63,39.1,39.1,60.63,91.08,60.63,146.37s-21.53,107.27-60.63,146.37c-39.1,39.1-91.08,60.63-146.37,60.63s-107.27-21.53-146.37-60.63c-39.1-39.1-60.63-91.08-60.63-146.37s21.53-107.27,60.63-146.37c39.1-39.1,91.08-60.63,146.37-60.63m0-100C137.45,0,0,137.45,0,307s137.45,307,307,307,307-137.45,307-307S476.55,0,307,0h0Z"/></g></g><g id="Layer_2"><path d="m511.85,337.02c-6.34,43.9-26.55,84.42-58.47,116.35-39.1,39.1-91.08,60.63-146.37,60.63-12.05,0-23.94-1.02-35.57-3.03-34.9,23.3-70.26,46.11-106.12,68.42,42.39,22.1,90.58,34.61,141.7,34.61,169.55,0,307-137.45,307-307,0-16.77-1.37-33.23-3.95-49.27-32.39,26.99-65.12,53.42-98.2,79.29Z" style="opacity:.47;"/></g></svg></div>',






      }

      return app.init(nfButtonConfig);
      
    }
  };