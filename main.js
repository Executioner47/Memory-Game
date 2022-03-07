

//setting duration of the card flip
let duration = 1000

//selecting the cards and putting them in array
let blockConatiner = document.querySelector(".blocks-container")
let blocks = Array.from(blockConatiner.children)


document.querySelector(".starting-game span").onclick = function(){
    let yourName = prompt("What's your name")
    if(yourName == "" || yourName == null){
        //Set name to unknown when nothing is written
        document.querySelector(".name span").innerHTML = "UnKnown"
    }else{
        //Set Name to the name entered
        document.querySelector(".name span").innerHTML = yourName
    }
    //removing starting screen
    document.querySelector(".starting-game").remove()
    setTimeout(() => {
        blocks.forEach((e) => {
            e.classList.add("is-flipped")
        })
        setTimeout(() => {
            blocks.forEach((e) => {
                e.classList.remove("is-flipped")
            })
        }, 1000);
    }, 100);
    //removing blur effect
    document.querySelector(".info-container").style.filter = "none"
    document.querySelector(".blocks-container").style.filter = "none"
}

//Making array from 0 to length of blocks to use them in randomize

// let orderRange = [...Array(blocks.length).keys()]
//Or
let orderRange = Array.from(Array(blocks.length).keys())

//shuffling the orderRange array
shuffle(orderRange)

blocks.forEach((e,index) =>{

    //add order css property to game blocks
    e.style.order = orderRange[index]

    //add click event on block
    e.addEventListener("click",function(){
        //triggeer flip block function
        flipBlock(e)
    })
})

//shuffle function
function shuffle(array){

    //setting vars
    let current = array.length, //19
        temp,
        random;

    while(current > 0){
        //get random element
        random = Math.floor(Math.random() * current) 

        //Decrease length by one
        current-- 

        //save current element in box
        temp = array[current]

        //current element = Random Element
        array[current] = array[random]

        //random element = element in box
        array[random] = temp
    }
    return array;
}

//Flip Block Function
function flipBlock(selectedBlock){

    //add class is flipped
    selectedBlock.classList.add("is-flipped")

    //collect allflippedBlocks
    let flippedBlocks = blocks.filter((flippedBlock) =>flippedBlock.classList.contains("is-flipped"))//////////////////////////////????

    //if there is 2 selected blocks
    if(flippedBlocks.length === 2){

        //stop clicking function
        stopClicking()

        //check matched function
        checkMatching(flippedBlocks[0],flippedBlocks[1])
    }

}


//stop clicking function
function stopClicking(){
    //add class noClicking on main container
    blockConatiner.classList.add("no-clicking")

    //setting timeout
    setTimeout(() => {

        //remove class no clicking
        blockConatiner.classList.remove("no-clicking")

    }, duration);
}


//matching block function
function checkMatching(firstBlock,secondBlock){

    //selecting span in tries
    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        let audioSuccess = document.getElementById("success")
        audioSuccess.play()
        audioSuccess.volume = 0.1
        
    }else{

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        let audioFail = document.getElementById("fail")
        audioFail.play()
        audioFail.volume = 0.1
    }
}
