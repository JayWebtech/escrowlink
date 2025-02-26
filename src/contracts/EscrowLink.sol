// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract EscrowLink {
    struct Escrow {
        address payable payer;
        address payable payee;
        uint256 amount;
        bool isPaid;
        string terms;
        uint16 escrow_id;
    }

    mapping(uint16 => Escrow) public escrows;
    address public contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    /** all escrow modifiers */
    modifier OnlyPayer(uint16 _escrow_id) {

        /** this will ensure that payer matches the escrow_id data object
         *  so this will avoid returning users from accessing other escrow
         */
        require(msg.sender == escrows[_escrow_id].payer, "Only payer can call this function");

        /** this is to ensure that only payer with unsettled escrow can view the function
         *  this will avoid payer with completed escrow transaction to view the function
         */
        require(!escrows[_escrow_id].isPaid, "Escrow has been resolve");
        _;
    }

    modifier OnlyPayee(uint16 _escrow_id) {

         /** this will ensure that payer matches the escrow_id data object
         *  so this will avoid returning users from accessing other escrow
         */
        require(msg.sender == escrows[_escrow_id].payee, "Only payee can call this function");

        /** this is to ensure that only payee with unsettled escrow can view the function
         *  this will avoid payer with completed escrow transaction to view the function
         */
        require(!escrows[_escrow_id].isPaid, "Escrow has been resolved");
        _;
    }

    modifier OnlyOwner() {
        require(msg.sender == contractOwner, "Only contract owner can call this function");
        _;
    }
    
    /** all escrow events */
    event PayeeHasJoined(address payer, address payee, uint256 amount, bool isPaid, string terms, uint16 escrow_id);
    event EscrowCompleted(uint16 escrow_id);

    function createEscrow(address payable _payee, uint256 _amount, string memory _terms, uint16 _escrow_id) public payable {
        require(_amount > 0, "Please enter a valid amount");
        require(msg.value == _amount, "Amount sent does not match the specified amount");

        escrows[_escrow_id] = Escrow(payable(msg.sender), _payee, _amount, false, _terms, _escrow_id);
    }

    function getEscrowDetails(uint16 _escrow_id) public OnlyPayee(_escrow_id){
        Escrow memory escrow = escrows[_escrow_id];
        emit PayeeHasJoined(escrow.payer, escrow.payee, escrow.amount, escrow.isPaid, escrow.terms, escrow.escrow_id);
    }

    function releaseFunds(uint16 _escrow_id) public OnlyPayer(_escrow_id) {
        checkContractBalance(_escrow_id);
        escrows[_escrow_id].isPaid = true;
        escrows[_escrow_id].payee.transfer(escrows[_escrow_id].amount);
        emit EscrowCompleted(_escrow_id);
    }

    function approve(uint16 _escrow_id) private OnlyOwner() {
        checkContractBalance(_escrow_id);
        escrows[_escrow_id].isPaid = true;
        escrows[_escrow_id].payee.transfer(escrows[_escrow_id].amount);
        emit EscrowCompleted(_escrow_id);
    }

    function reject(uint16 _escrow_id) private OnlyOwner() {
        checkContractBalance(_escrow_id);
        escrows[_escrow_id].isPaid = true;
        escrows[_escrow_id].payer.transfer(escrows[_escrow_id].amount);
        emit EscrowCompleted(_escrow_id);
    }

    function checkContractBalance(uint16 _escrow_id) internal view {
        require(address(this).balance >= escrows[_escrow_id].amount, "Insufficient balance in contract");
    }
   
   
}