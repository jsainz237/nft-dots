import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import chaiAsPromised from 'chai-as-promised';
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

chai.use(chaiAsPromised);

describe("Dot Minting", function () {
  let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress;
  let Dots: ContractFactory;
  let dots: Contract;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Dots = await ethers.getContractFactory("Dot");
    dots = await Dots.deploy();
    await dots.deployed();
  })

  it("should mint correctly", async () => {
    let balance = await dots.balanceOf(addr1.getAddress());
    expect(balance).to.equal(0);

    const mint = (num: number, ether: number, addr: SignerWithAddress = owner) =>
      dots.connect(addr).payToMint(num, { value: ethers.utils.parseEther(ether.toString())});

    expect(mint(4, 0.001)).to.be.rejected;
    expect(mint(4, 0.001, addr1)).to.be.rejected;

    const mintedTokens = await mint(4, 4 * 0.005, addr1);
    await mintedTokens.wait();
  
    balance = await dots.balanceOf(addr1.getAddress());
    expect(balance).to.equal(4);

    const totalSold = await dots.totalSold();
    expect(totalSold).to.equal(4);
  });

  it("should not allow revoking of owner roles", async () => {
    // grant admin role to addr1
    await dots.grantAdmin(addr1.getAddress());
    expect(dots.connect(addr1).revokeAdmin(owner.getAddress())).to.be.rejected;
    expect(dots.connect(addr1).revokePauser(owner.getAddress())).to.be.rejected;
  })

  it("should only allow admins to execute admin role functions", async () => {
    expect(dots.setBaseUri("test")).to.be.fulfilled;
    expect(dots.connect(addr1).setBaseUri("test")).to.be.rejected;

    expect(dots.setCost(10000000000)).to.be.fulfilled;
    expect(dots.connect(addr1).setCost(100000000000)).to.be.rejected;

    expect(dots.setMaxMintAmount(25)).to.be.fulfilled;
    expect(dots.connect(addr1).setMaxMintAmount(25)).to.be.rejected;
  });

  it("should only allow pausers to execute pauser role functions", async () => {
    expect(dots.pause()).to.be.fulfilled;
    expect(dots.connect(addr1).pause()).to.be.rejected;

    expect(dots.unpause()).to.be.fulfilled;
    expect(dots.connect(addr1).unpause()).to.be.rejected;
  });

  it("should test isDotOwned function", async () => {
    const randomInt = 5402;
    await dots.addIdToMinted(randomInt);

    expect(await dots.isDotOwned(randomInt)).to.equal(true);
    expect(await dots.isDotOwned(16)).to.equal(false);
  });
});
