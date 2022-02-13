import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { client } from '../lib/sanityClient';

export const Connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return signer;
}

export const CreateUser = async (address) => {
    const userDoc = {
        _type: 'users',
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
    }

    return await client.createIfNotExists(userDoc);
}