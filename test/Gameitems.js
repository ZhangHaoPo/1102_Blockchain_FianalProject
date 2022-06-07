const Tickets = artifacts.require('Gameitems');
const assert = require('assert');

contract('Gameitems', (accounts) => {
    const BUYER = accounts[1];
    const TICKET_ID = 0;

    it('should allower a user to buy a ticket', async () => {
        const instance = await Tickets.deployed();
        const originalTicket = await instance.items(
            TICKET_ID
        );
        console.log(originalTicket);
        await instance.buyitems(TICKET_ID, {
            from: BUYER,
            value: originalTicket.price,
        });
        const updatedTicket = await instance.items(TICKET_ID);
        assert.equal(
            updatedTicket.owner,
            BUYER,
            'the buyer should now own this ticket'
        );
    });
});