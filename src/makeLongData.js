//Make an object with one record per review (per person)
export default function makeLongData(data){

  var longData = []
  var movies = Object.getOwnPropertyNames(data[1]).slice(2)

  data.forEach(function(d){
    movies.forEach(function(m){
      longData.push({
        person:d["Who are you? "],
        movie:m,
        score:+d[m]
      })
    })
  })

  longData = longData.filter(function(d){return d.score>=1})
  return longData;
}