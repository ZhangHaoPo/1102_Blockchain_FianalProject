import Web3 from 'web3';
import configuration from '../build/contracts/Gameitems.json';
import 'bootstrap/dist/css/bootstrap.css';
const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;
// 0,1,2,2,1,2,1,2,1,1,0,1,0,2,0
// 0 : 服裝, 1 : 道具, 2 : 武器
import image_0 from './images/0.jpg'; // 0服裝 
import image_1 from './images/1.jpg'; // 1道具
import image_2 from './images/2.jpg'; // 2武器 
import image_3 from './images/3.jpg'; // 2武器
import image_4 from './images/4.jpg'; // 1道具
import image_5 from './images/5.jpg'; // 2武器
import image_6 from './images/6.jpg'; // 1道具
import image_7 from './images/7.jpg'; // 2武器
import image_8 from './images/8.jpg'; // 1道具
import image_9 from './images/9.jpg'; // 1道具
import image_10 from './images/10.jpg'; // 0服裝
import image_11 from './images/11.jpg'; // 1道具
import image_12 from './images/12.jpg'; // 0服裝
import image_13 from './images/13.jpg'; // 2武器
import image_14 from './images/14.jpg'; // 0服裝

const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
    CONTRACT_ABI,
    CONTRACT_ADDRESS
);

var data = [image_0, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, image_12, image_13, image_14];


let account;

const ticketsEl = document.getElementById('tickets');
const TOTAL_ITEMS = 15;

let category = -1;

document.getElementById("btn1").onclick = async () => {
    category = -1
    await refreshTickets(category);
};

document.getElementById("btn2").onclick = async () => {
    category = 0;
    await refreshTickets(category);
};

document.getElementById("btn3").onclick = async () => {
    category = 1;
    await refreshTickets(category);
};
document.getElementById("btn4").onclick = async () => {
    category = 2;
    await refreshTickets(category);
};

const buyTicket = async (ticket) => {
    await contract.methods
        .buyitems(ticket.id)
        .send({ from: account, value: ticket.price });
    await refreshTickets(category);
};


const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
};

const refreshTickets = async (category) => {
    ticketsEl.innerHTML = '';
    for (let i = 0; i < TOTAL_ITEMS; i++) {
        const ticket = await contract.methods.items(i).call();
        ticket.id = i;
        if (ticket.status == true) {
            if(category < 0) {
                const ticketEl = createElementFromString(
                `<div class= ticket card d-flex justify-content-center">
                    <img src="${data[i]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">${ticket.price / 1e18} &nbsp Maple Coin</p>
                            <div class="d-grid gap-3 col-6 mx-auto">
                                <button id = "buy_button" class="btn btn-danger btn-lg">BUY</button>
                            </div>
                    </div>
                </div>`
                );
                ticketEl.onclick = buyTicket.bind(null, ticket);
                ticketsEl.appendChild(ticketEl);
            }
            else {
                if(ticket.category == category) {
                    const ticketEl = createElementFromString(
                    `<div class="ticket card" style="width: 20rem;">
                    <img src="${data[i]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">${ticket.price / 1e18} &nbsp Maple Coin</p>
                            <div class="d-grid gap-3 col-6 mx-auto">
                                <button id = "buy_button" class="btn btn-danger btn-lg">BUY</button>
                            </div>
                        </div>
                    </div>`
                    );
                    ticketEl.onclick = buyTicket.bind(null, ticket);
                    ticketsEl.appendChild(ticketEl);
                }
            }
        }
    }
};

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    await refreshTickets(category);
};

main();

