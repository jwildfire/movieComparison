////////////////////////////////
//average movie rankings chart
////////////////////////////////

const avgRankSettings = {
  "width":1200,
  "height":350,
  resizable:false,
  "y":{
    "label":"Average Rating",
    "type":"linear",
    "column":"score",
    "format":"0.1f",
    "domain":[1,5]
  },
  "x":{
    "type":"ordinal",
    "label":"",
    "column":"movie",
    "sort":"total-descending"
  },
  "margin":{bottom:150,right:75},
  gridlines:"y",
  "marks":[
    {
      "type":"circle",
      "per":["movie"],
      "summarizeY":"mean",
      "attributes":{
        "fill":"white",
        "stroke":"black", 
        "stroke-width":2
      }
    }, 
    {
      "type":"circle",
      "per":["movie","person"],
      "summarizeY":"mean",
      "attributes":{
        "stroke":"black", 
        "stroke-width":1,
        "fill":"yellow",
        "fill-opacity":0.5,
        "transform":"translate(2,0)"
      },
      values:{person:"Sasha"}
    },
    {
      "type":"circle",
      "per":["movie","person"],
      "summarizeY":"mean",
      "attributes":{
        "stroke":"black", 
        "stroke-width":1,
        "fill":"blue",
        "fill-opacity":0.5,
        "transform":"translate(-2,0)"

      },
      values:{person:"Namps!"}
    },
    {
      "type":"line",
      "per":["movie"],
      "attributes":{
        "stroke":"black", 
        "stroke-width":2,
      },
      values:{person:["Sasha","Namps!"]}
    },   
    {
      "type":"text",
      "per":["movie"],
      "summarizeY":"mean",
      "text":"$y",
      "attributes":{
        "text-anchor":"middle",
        "dy":"-10", 
        "alignment-baseline":"middle",
        "font-size":8
      }
    }

    /*{
      "type":"line",
      "per":["movie"],
      "attributes":{"stroke-opacity":0.2, "stroke-dasharray":"3 3", "stroke":"#888"}
    }*/
  ]
};

export default avgRankSettings;