import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs.js";
import { expect } from "chai";
import hre from "hardhat";

describe("MyTest", function () {
  this.timeout(120000); // Set timeout to 2 minutes to avoid timeout errors

  // Fixture to deploy the contract
  async function runEveryTime() {
    const ONE_YEARS_IN_SECONDS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;
    const lockedAmount = ONE_GWEI;

    // Get the latest time and set unlock time
    const unLockedTime = (await time.latest()) + ONE_YEARS_IN_SECONDS;

    // Get the signers (owner and another account)
    const [owner, otherAcct] = await hre.ethers.getSigners();

    // Get the contract factory and deploy the contract
    const MyTest = await hre.ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unLockedTime, { value: lockedAmount });

    // Wait for the contract deployment to be mined
    await myTest.waitForDeployment();

    // Return all relevant variables and contract details
    return { myTest, unLockedTime, lockedAmount, owner, otherAcct };
  }

  // Test case for checking the unlocked time and deployment details
  describe("deployment", function () {
    it("Should check unlocked time and log deployment details", async function () {
      // Load fixture and deploy contract
      const { myTest, unLockedTime, lockedAmount, owner, otherAcct } =
        await loadFixture(runEveryTime);

      // Get the deployment transaction
      const deployTx = myTest.deployTransaction;

      // Wait for the transaction to be mined to get the gas used
      // const receipt = await deployTx.wait();

      // Log relevant deployment details
      console.log("-- My Test Contract Address -- :", myTest.address);
      console.log("-- Transaction Hash -- :", deployTx.hash);
      console.log("-- Gas Used -- :", receipt.gasUsed.toString());
      console.log("-- Gas Price -- :", deployTx.gasPrice.toString());
      console.log("-- Block Number -- :", receipt.blockNumber);
      console.log("-- Owner -- :", owner.address);
      console.log("-- Other Account -- :", otherAcct.address);

      // Optionally, add assertions
      expect(myTest.address).to.not.be.undefined;
    });
  });
});
