const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("AucEngine", function() {
  let owner
  let seller
  let buyer
  let auct

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners()
    const AucEngine = await ethers.getContractFactory("AucEngine", owner)
    auct = await AucEngine.deploy()
    await auct.deployed()
  })

  it("sets owner", async function() {
    const currentOwner = await auct.owner()
    expect(currentOwner).to.eq(owner.address) 
  })

  async function getTimestamp(bn) {
    return (
      await ethers.provider.getBlock(bn)
    ).timestamp
  }

  describe("createAuction", function() {
    it("creates auction correctly", async function() {
      const duration = 60
      const tx =  await auct.createAuction(
        ethers.utils.parseEther("0.0001"),
        3,
        "fake item",
        duration
        )
        const cAuction = await auct.auctions(0)
        expect(cAuction.item).to.eq("fake item")
        const ts =  await getTimestamp(tx.blockNumber)
        expect(cAuction.endsAt).to.eq(ts + duration)
      })
  
  })
})
