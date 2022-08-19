function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
        process.nextTick(() => {
            if (win) resolve(`${player} won a prize in the draw!`)
            else reject(new Error(`${player} lost the draw.`))
        });
    });
}

const getResults = async (...players) =>{
  players.forEach(async player => {
    try{
      const data1 = await luckyDraw(player)
      console.log(data1)
    }
    catch(err) {console.log(err.message);}
  });

}
getResults('Tina','Jorge','Julien')
