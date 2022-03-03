// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./lib/RandomlyAssigned.sol";

contract Dot is ERC721, Pausable, ERC721URIStorage, AccessControl, RandomlyAssigned {
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

    // admin only functions

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
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
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
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}