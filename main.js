const sha256 = require('crypto-js/sha256'); // importing required resources from crypto-js 
const { SHA256 } = require('crypto-js/sha256');


//creates the class Block 
// index = index, timestamp shows when transaction took place, 
// data store transacxtion details, the amount, who was the sender and who was the reciever
// previous hash is a string that contains the hash of thr block before it, for data integrity 
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash // note this is empty until calculateHash method 
    }



// method created to calculate the hash of each block
    calculateHash(){
    return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    //Genensis block is the origin or the first block in the Blockchain. We must hard code it since it
    //cannot have data of a previous hash to verify it's existence
    createGenesisBlock(){
        return new Block(0, "01,01,2023", "Genesis block", "0");
    }


    getLatestBlock(){
        //this method will return the last one by fetching the length and returning the last code
        return this.chain[this.chain.length - 1];

    }

    addBlock(newBlock){
        //this formula properly creates a new block and pulls the hash from the previous block for validation
        newBlock.previousHash = this.getLatestBlock().hash; // pulls the last block's hash and sets value in new block's dataset
        newBlock.hash = newBlock.calculateHash(); //
        this.chain.push(newBlock); // typically you won't be able to add a block this easily

    }

    isChainValid(){ //this method will validate our chain to ensure data integrity
        for(let i = 1; i < this.chain.length; i++){ //we will loop through our chain according to it's length
            const currentBlock = this.chain[i]; //selects each block through our pointer
            const previousBlock = this.chain[i-1]; //selects the previous block by subtracting one from our pointer
      
            if(currentBlock.hash !== currentBlock.calculateHash()){ //checks if current hash of block matches with calculated value
                console.log('1st check failed'); //debugging tool 
                return false;
                
            }

            if(currentBlock.previousHash !== previousBlock.hash){ //checks to ensure the 'previousBlock' data from current block matches with the previous block's hash for authenticity 
                console.log('2nd check failed'); //debugging tool
                return false;
                
            }
        }

        return true; //if it loops through all our chain and does not return false, return true
      
    }
}

let abelCoin = new Blockchain();
abelCoin.addBlock(new Block(1,"02/24/2023", {amount: 4}));
abelCoin.addBlock(new Block(2,"02/26/2023", {amount: 10 }));

console.log('Is blockchain valid?' + abelCoin.isChainValid()); //using this will return isChainValid method's outcome


// Test Case: Using this test case we will override our block's data to a higher amount and afterwards we will see that the isChainValid function will return false
abelCoin.chain[1].data = {amount: 100};
abelCoin.chain[1].hash = abelCoin.chain[1].calculateHash();
console.log('Is blockchain valid?' + abelCoin.isChainValid());
//***** End Test Case **********


//console.log(JSON.stringify(abelCoin, null, 4));