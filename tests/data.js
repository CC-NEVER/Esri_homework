const Hazards={
   position:{x:800,y:63,},
   type:'Vegetation',
   description:'someThing',
   instructions:'Contact Animal Control',
   status:'Closed',
   priority:'Moderate',
}
const Road={
   type:'Full closure',
   point:{
      pointX:[433,435,455,500],
      pointY:[160,174,123,143],
   },
   severity:'High',
   blockage:'Flooding over road',
   active:'Yes',
   description:'Dangerous!'
}

const Areas={
   type:'Open',
   point:{
      pointX:[666,665,655,700],
      pointY:[60,74,23,43],
   },
   incident:'Fire',
   active:'Yes',
   description:'Something'
}
module.exports={Hazards,Road,Areas}
