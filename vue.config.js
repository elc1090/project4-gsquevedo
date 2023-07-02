const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa : { 
    name : "Jardim Botânico" , 
    themeColor : "#448a4e",
    icons: {
      favicon32 : 'img/icons/jardim.png' , 
      favicon16 : 'img/icons/jardim.png' , 
      appleTouchIcon : 'img/icons/jardim.png' , 
      maskIcon : 'img/icons/jardim.png' , 
      msTileImage :'img/icons/jardim.png',
    }
  } 
})
