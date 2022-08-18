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
     try{
       players.forEach(async player => console.log(await luckyDraw(player)))
    }
    //why it not enter here?
    catch (err) {console.log("stampo l'errore")}

}

getResults('Tina','Jorge','Julien')
