const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
}= require("@solana/web3.js")

const wallet=new Keypair()


const publicKey=new PublicKey(wallet._keypair.publicKey)

const secretKey=wallet._keypair.secretKey

console.log(publicKey)
console.log(secretKey)





const getWalletBalannce=async()=>{
  try{
    const connection= new Connection(clusterApiUrl('devnet'),"confirm")
    const walletBalance=await connection.getBalance(publicKey)
    console.log(`wallet balance ${walletBalance}`);
  }
  catch(err){
    console.error(err);
  }
}

const airDropSol=async()=>{
  try{
    const connection= new Connection(clusterApiUrl('devnet'),"confirm")
    const fromAirDropSignature =await connection.requestAirdrop(publicKey,2*LAMPORTS_PER_SOL)
    await connection.confirmTransaction(fromAirDropSignature)



  }
  catch(err){
    console.error(err);
  }
}

const main= async()=>{
  await getWalletBalannce()
  await airDropSol()
  await getWalletBalannce()
}
main()