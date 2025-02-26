import { ethers } from "ethers";
export const ethToWei = (ethAmount) => {
    const weiAmount = ethers.parseUnits(ethAmount.toString(), 'ether');
    return weiAmount.toString();
};
