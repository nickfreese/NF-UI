# NF-UI
 - A UI component library for AlpineJS and Tailwind
 - One down, a bunch to go


### NF-Carousel

Example
```

<script>
  window.sliderConfig = {

    
    items:[
        "<div> some item 1 </div>",
         "<div> some item 2</div>",
          "<div class='h-32 bg-slate-300'> some item 3</div>",
           "<div> some item 4</div>",
           "<div> some item 5</div>",
           "<div @click='alert(`clicked carousel item`)'> some item 6</div>",
           "<div> some item 7</div>",
           "<div> some item 8</div>"
    ],
    currentPosition:0

  }
</script>


<div x-data="{nfCarouselConfig: window.sliderConfig}" x-html="window.nfCarouselFactory.getTemplate()"></div>
```

available settings:

```
  window.sliderConfig = {

    items:[], //array of items to use in the slider.  items may utilize alpine for further functionality
    currentPosition: 0, //integer defining the beginning position of the carousel
    slider: true, //bool defining whether to show a horizontal scrollbar at the bottom of the carousel
    sliderSensitivity: 25, //integer defining closeness to the next carousel position the slider needs to be to trigger moving to the next slide.
    

    widths: {    // defines breakpoints and the number of carousel items to show above that breakpoint.
          "1280":5,
          "980":4,
          "700":3,
          "678":2,
          "0":1
        },

     arrowSize: 25, //the number of pixels wide that the left and right arrows should be.

  }

```


### NF-Modal

```

<script>
  window.modalConfig = {
    content: `<div><h1 class="text-2xl font-bold">Modal Header</h1>Some modal content</div>`
  }
</script>


<!-- actual click logic not included because it would increase difficulty of triggering modals from any HTML element.  instead we utilize "open" -->
<div x-data="{open:false}">
    <div @click="open = !open" class="cursor-pointer">Open Modal</div>
    <div x-show="open" x-data="{nfModalConfig: window.modalConfig}" x-html="window.nfModalFactory.getTemplate()"></div>
</div>
```



### NF-Button

```
<!-- We have ti add some animations to the tailwind config for this UI widget -->
<script>
    tailwind.config = {
      theme: {
        extend: {
          keyframes: {
            quiver: {
              '40%': { transform: 'scale(0.99, 0.99)' },
              '50%, 60%': { transform: 'scale(1.02, 1.01)' }
            },
            shake: {
              "10%, 90%": {transform: "translate3d(-1px, 0, 0)"},
              "20%, 80%": {transform: "translate3d(2px, 0, 0)"},
              "30%, 50%, 70%": {transform: "translate3d(-4px, 0, 0)"},
              "40%, 60%": {transform: "translate3d(4px, 0, 0)"},
            },
            success: {
              "0%": {transform: "scale(1, 1) translate3d(0, 0, 0)"},
              "95%": {transform: "scale(1.05, 1.05) translate3d(0, -2px, 0)"}
            }
          },
      
      animation: {
        'quiver': 'quiver 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'shake': 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'success': 'success 0.2s ease-in both',
      },
    }
        
      }
    }
  </script>
  <script>
  
   var myClickFunction = async function(){
      
        try {
          const response = await fetch("https://nickfreese.com/api/type/project");
          
          if (response?.ok) {

            const jsonData = await response.json();
            console.log(jsonData);
            return true;
          } else {
            console.log(`HTTP Response Code: ${response?.status}`)
            return false;
          }
        } catch (e) {
            return false;
        }

      }
  </script>

  <div x-data="{nfButtonConfig: {buttonDefault:'button', click:function(){return true;} }}" x-html="window.nfButtonFactory.getTemplate()"></div>
```



### NF-Mega
 - mega menu coming soon!