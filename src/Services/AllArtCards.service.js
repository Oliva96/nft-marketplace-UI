import { ethers } from 'ethers';
import axios from 'axios';

import { nftAddress, nftMarketAddress} from '../config';
import NFT from '../contracts/NFT.sol/NFT.json';
import Market from '../contracts/NFTMarket.sol/NFTMarket.json';

export const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftMarketAddress, Market.abi, provider);

    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);

        let price = i.price.add(i.comission);
        price = ethers.utils.formatUnits(price.toString(), 'ether');
        
        let item = {
            price: price,
            tokenId: i.tokenId.toNumber(),
            createdBy: i.createdBy,
            owner: i.owner,
            category: i.category.toString(),
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
        }
        return item;
    }))
    
    return items;
};

export const buyNft = async (NftTokenId, signer) => {

    const contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
    const nft = await contract.getItemById(NftTokenId);
    console.log(nft);
    const totalPay = nft.price.add(nft.comission);

    const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {value: totalPay});
    await transaction.wait();
    // loadNFTs();
}
