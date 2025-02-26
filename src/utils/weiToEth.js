import { ethers } from "ethers";
export const weiToEth = (weiAmount) => {
    const ethAmount = ethers.formatUnits(weiAmount.toString(), 'ether');
    return ethAmount;
};