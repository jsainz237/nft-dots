// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @author 1001.digital
/// @title A token tracker that limits the token supply and increments token IDs on each new mint.
abstract contract WithLimitedSupply {
    using Counters for Counters.Counter;

    /// @dev Emitted when the supply of this collection changes
    event SupplyChanged(uint256 indexed supply);

    // Keeps track of how many we have minted
    Counters.Counter private _tokenCount;

    /// @dev The maximum count of tokens this token tracker will hold.
    uint256 private _totalSupply;

    /// Instanciate the contract
    /// @param totalSupply_ how many tokens this collection should hold
    constructor (uint256 totalSupply_) {
        _totalSupply = totalSupply_;
    }

    /// @dev Get the max Supply
    /// @return the maximum token count
    function totalSupply() public virtual view returns (uint256) {
        return _totalSupply;
    }

    /// @dev Get the current token count
    /// @return the created token count
    function tokenCount() public view returns (uint256) {
        return _tokenCount.current();
    }

    /// @dev Check whether tokens are still available
    /// @return the available token count
    function availableTokenCount() public view returns (uint256) {
        return totalSupply() - tokenCount();
    }

    /// @dev Increment the token count and fetch the latest count
    /// @return the next token id
    function nextToken() internal virtual returns (uint256) {
        uint256 token = _tokenCount.current();

        _tokenCount.increment();

        return token;
    }

    /// @dev Check whether another token is still available
    modifier ensureAvailability() {
        require(availableTokenCount() > 0, "No more tokens available");
        _;
    }

    /// @param amount Check whether number of tokens are still available
    /// @dev Check whether tokens are still available
    modifier ensureAvailabilityFor(uint256 amount) {
        require(availableTokenCount() >= amount, "Requested number of tokens not available");
        _;
    }

    /// Update the supply for the collection
    /// @param _supply the new token supply.
    /// @dev create additional token supply for this collection.
    function _setSupply(uint256 _supply) internal virtual {
        require(_supply > tokenCount(), "Can't set the supply to less than the current token count");
        _totalSupply = _supply;

        emit SupplyChanged(totalSupply());
    }
}

/// @author 1001.digital
/// @title Randomly assign tokenIDs from a given set of tokens.
abstract contract RandomlyAssigned is WithLimitedSupply {
    // Used for random index assignment
    mapping(uint256 => uint256) private tokenMatrix;

    // The initial token ID
    uint256 private startFrom;

    /// Instanciate the contract
    /// @param _totalSupply how many tokens this collection should hold
    /// @param _startFrom the tokenID with which to start counting
    constructor (uint256 _totalSupply, uint256 _startFrom)
        WithLimitedSupply(_totalSupply)
    {
        startFrom = _startFrom;
    }

    /// Get the next token ID
    /// @dev Randomly gets a new token ID and keeps track of the ones that are still available.
    /// @return the next token ID
    function nextToken() internal override ensureAvailability returns (uint256) {
        uint256 maxIndex = totalSupply() - tokenCount();
        uint256 random = uint256(keccak256(
            abi.encodePacked(
                msg.sender,
                block.coinbase,
                block.difficulty,
                block.gaslimit,
                block.timestamp
            )
        )) % maxIndex;

        uint256 value = 0;
        if (tokenMatrix[random] == 0) {
            // If this matrix position is empty, set the value to the generated random number.
            value = random;
        } else {
            // Otherwise, use the previously stored number from the matrix.
            value = tokenMatrix[random];
        }

        // If the last available tokenID is still unused...
        if (tokenMatrix[maxIndex - 1] == 0) {
            // ...store that ID in the current matrix position.
            tokenMatrix[random] = maxIndex - 1;
        } else {
            // ...otherwise copy over the stored number to the current matrix position.
            tokenMatrix[random] = tokenMatrix[maxIndex - 1];
        }

        // Increment counts
        super.nextToken();

        return value + startFrom;
    }
}

contract Dot is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, RandomlyAssigned {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    string private baseUri;
    address owner;

    uint private supply = 10000;
    uint private maxMintable = 10;
    uint private cost = 5000000000000000; // wei -> 0.005 BNB

    mapping(uint => uint8) mintedDots;
    mapping(uint => address) owners;

    constructor() ERC721("Dot", "DOT") RandomlyAssigned(supply, 1) {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function mint(address to) private returns (uint256) {
        uint256 tokenId = nextToken();
        string memory tokenUri = generateTokenUri(tokenId);

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);

        mintedDots[tokenId] = 1;
        owners[tokenId] = to;

        return tokenId;
    }

    function transfer(address addr, uint256 value) private {
        (bool success, ) = payable(addr).call{value: value}("");
        require(success);
    }

    // custom functions

    function isDotOwned(uint id) public view returns (bool) {
        return mintedDots[id] == 1;
    }

    function payToMint(uint numTokens) public payable ensureAvailability returns (uint256[] memory) {       
        require(numTokens > 0, "Must mint at least one");
        require(numTokens <= 10, "Cannot mint more than 10");
        require(totalSold() + numTokens <= supply, "Minting would exceed supply");

        require(msg.value >= (cost * numTokens), "Not enough ether provided");

        uint256[] memory tokens = new uint256[](numTokens);
        for(uint i = 0; i < numTokens; i++) {
            tokens[i] = mint(msg.sender);
        }

        return tokens;
    }

    function generateTokenUri(uint256 tokenId) private view returns (string memory) {
        return string(abi.encodePacked(
            _baseURI(), "/", Strings.toString(tokenId), ".json"
        ));
    }

    function totalSold() public view returns (uint) {
        return tokenCount();
    }

    function totalSupply() 
        public 
        view
        override(ERC721Enumerable, WithLimitedSupply)
        returns (uint256)
    {
        return supply - totalSold();
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // admin only functions

    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 contractBalance = address(this).balance;
        transfer(msg.sender, contractBalance);
    }

    function setBaseUri(string memory uri) public onlyRole(DEFAULT_ADMIN_ROLE) {
        baseUri = uri;
    }

    function setCost(uint256 newCost) public onlyRole(DEFAULT_ADMIN_ROLE) {
        cost = newCost;
    }

    function setMaxMintAmount(uint max) public onlyRole(DEFAULT_ADMIN_ROLE) {
        maxMintable = max;
    }

    function grantAdmin(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, addr);
    }

    function revokeAdmin(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(isNotOwner(addr), "Cannot revoke owner permissions");
        _grantRole(DEFAULT_ADMIN_ROLE, addr);
    }

    function grantPauser(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(PAUSER_ROLE, addr);
    }

    function revokePauser(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(isNotOwner(addr), "Cannot revoke owner permissions");
        _grantRole(PAUSER_ROLE, addr);
    }

    function isNotOwner(address addr) private view returns (bool) {
        return addr != owner;
    }

    // testing functions

    function addIdToMinted(uint id) public onlyRole(DEFAULT_ADMIN_ROLE) {
        mintedDots[id] = 1;
    }

    // need this for libraries

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}