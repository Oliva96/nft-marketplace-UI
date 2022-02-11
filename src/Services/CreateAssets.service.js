import { ethers } from 'ethers';
import { create as ipfsHttpClient} from 'ipfs-http-client';
import Web3Modal from 'web3modal';

import { nftAddress, nftMarketAddress} from '../config';
import NFT from '../contracts/NFT.sol/NFT.json';
import Market from '../contracts/NFTMarket.sol/NFTMarket.json';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export const SubmitToIPFS = async (data) => {
    let url;
    try {
        const added = await client.add(
            data,
            {
                progress: (prog) => console.log(`received ${prog}`)
            }
        );
        url = `https://ipfs.infura.io/ipfs/${added.path}`;

    } catch (error) {
        console.log('Error uploading file', error);
    }
    return url;
}

export const createSale = async (url, dataPrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    
    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(dataPrice, 'ether');

    contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftAddress, tokenId, price, true, {value: listingPrice});
    await transaction.wait();
}