import Web3 from "web3";
 
let web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/f4a43a2ace0a4c2085a527adafb1eb08"
  );
  web3 = new Web3(provider);
}
 
export default web3;