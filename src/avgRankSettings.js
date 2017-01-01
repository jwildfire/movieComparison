////////////////////////////////
//average movie rankings chart
////////////////////////////////
const avgRankSettings = {
  "person1":"Jeremy",
  "person2":"Sasha",
  "width":600,
  "height":350,
  "resizable":false,
  "y":{
    "label":"Average Rating",
    "type":"linear",
    "column":"score",
    "format":"0.1f",
    "domain":[0.8,5]
  },
  "x":{
    "type":"ordinal",
    "label":"",
    "column":"movie",
    "sort":"total-descending"
  },
  "margin":{bottom:150,right:75},
  "gridlines":"y",
  "marks":[
    {
      "type":"circle",
      "per":["movie"],
      "summarizeY":"mean",
      "tooltip": 'The mean score for [movie] was %y',
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
      "tooltip": '[person] gave [movie] a [score]',
      "attributes":{
        "stroke":"black", 
        "stroke-width":1,
        "fill":"yellow",
        "fill-opacity":0.5,
        "transform":"translate(2,0)"
      },
      "values":{"person":null} //set in callback
    },
    {
      "type":"circle",
      "per":["movie","person"],
      "summarizeY":"mean",
      "tooltip": '[person] gave [movie] a [score]',
      "attributes":{
        "stroke":"black", 
        "stroke-width":1,
        "fill":"blue",
        "fill-opacity":0.5,
        "transform":"translate(-2,0)",
      },
      "values":{"person":null} //set in callback
    },   
    {
      "type":"text",
      "per":["movie"],
      "summarizeY":"mean",
      "text":"$y",
      "tooltip": '[person] gave [movie] a [score]',
      "attributes":{
        "text-anchor":"middle",
        "dy":"-10", 
        "alignment-baseline":"middle",
        "font-size":8,
      }
    }
  ]
};

export default avgRankSettings;