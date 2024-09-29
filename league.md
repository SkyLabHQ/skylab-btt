1. `initialize(string memory baseURI, address protocol, address _admin)`: 初始化合约，设置基础 URI、协议地址和管理员地址。

2. `mintPaper(uint256 amount)`: 允许用户铸造 Paper 代币，需要支付相应的以太币。

3. `mintWithPaper(address leader)`: 使用 Paper 代币铸造新的 NFT 并加入指定领导者的联盟。

4. `mint(address leader, address referral, uint256 expirationTime, bytes calldata signature)`: 铸造新的 NFT 并加入指定领导者的联盟，可以包含推荐人信息。

5. `claimPot(address account)`: 为指定账户的所有 NFT 领取奖池奖励。

6. `claimPot(uint256 tokenId)`: 为特定 NFT 领取奖池奖励。

7. `setPaper(Paper _paper)`: 设置 Paper 合约地址（仅合约所有者可调用）。

8. `setPercentage(uint256 _newComerPercentage, uint256 _leagueOwnerPercentage)`: 设置新人和联盟所有者的奖励百分比。

9. `vetoLeaderDecision(uint256 tokenId)`: 对领导者的决定进行否决。

10. `setLeagueLockStatus(bool isLocked)`: 设置联盟的锁定状态。

11. `setPremium(uint256 premium)`: 设置联盟的溢价。

12. `setAdmin(address _admin)`: 设置新的管理员地址（仅合约所有者可调用）。

13. `aviationMovePoints(uint256 winnerTokenId, uint256 loserTokenId)`: 在游戏中移动点数（仅游戏地址可调用）。

14. `setLeader(address _leader)`: 设置新的领导者（仅管理员可调用）。

15. `estimatePointsToMove(uint256 winnerTokenId, uint256 loserTokenId)`: 估算需要移动的点数。

16. `getnewComerInfo(uint256 level)`: 获取特定等级的新人信息。

17. `getTokenIdPerLevel(uint256 level)`: 获取特定等级的所有 Token ID。

18. `getLeagueInfo(address leader)`: 获取特定领导者的联盟信息。
