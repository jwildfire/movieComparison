////////////////////////////////
// movie details chart
////////////////////////////////
const smallMultipleSettings = {
  "person1":"Jeremy",
  "person2":"Sasha",
  "width":150,
  "height":150,
  "resizable":false,
  "x":{
    "label":"Rating",
    "type":"ordinal",
    "column":"score",
    "label":"",
    "format":"0.1f",
    "domain":[1,2,3,4,5]
  },
  "y":{
    "type":"linear",
    "column":"score",
    "label":""
  },
  "marks":[
    {
      "type":"bar",
      "arrange":"stacked",
      "group":"person",
      "summarizeY":"count",
      "split":"person",
      "per":["score"],
      "attributes":{
        "fill":"white",
        "stroke":"black",
        "stroke-width":"2px",
        "style":"clip-path:null"
      },
      "tooltip": '[person] gave [movie] a [score]'
    }
  ]
};

export default smallMultipleSettings;