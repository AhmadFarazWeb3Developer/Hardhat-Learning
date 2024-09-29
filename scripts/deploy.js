// import { ethers } from "ethers";
import hre from "hardhat";
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEARS_IN_SECONDS = 365 * 24 * 60 * 60;
  const unlockedTime = currentTimestampInSeconds + ONE_YEARS_IN_SECONDS;
  const lockedAmount = hre.ethers.parseEther("1"); // converting from ethers to wei

  console.log(currentTimestampInSeconds);
  console.log(ONE_YEARS_IN_SECONDS);
  console.log(unlockedTime);
  console.log(lockedAmount.toString());

  const MyTest = await hre.ethers.getContractFactory("MyTest");
  const myTest = await MyTest.deploy(unlockedTime, { value: lockedAmount });
  await myTest.waitForDeployment();

  console.log("My contract consists 1 ETH & address ", myTest.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
