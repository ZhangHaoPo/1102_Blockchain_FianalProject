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
const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');
const TOTAL_ITEMS = 15;
const ids = [];
document.getElementById("btn1").onclick = async () => {
    await drawone();
};

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
};
let nonce = 2022;
const drawone = async () => {
    while(true) {
        const id = await contract.methods.randMod(15, nonce).call();
        const item = await contract.methods.items(id).call();
        if(item.status == true) {
            await contract.methods.buyitems(id).send({ from: account, value: 5e18 });
            await refresh(id);
            break;
        }
    }
    
    // for (let i = 0; i < TOTAL_ITEMS; i++) {
    //     const item = await contract.methods.items(i).call();
    //     if(item.status == true)
    //         ids.push(i);
    // }
    // var id = ids[Math.floor(Math.random() * ids.length)];
    // await contract.methods.buyitems(id).send({from: account, value: 5e18});
    // //console.log(id);
    // await refresh(id);
};

const refresh = async (id) => {
    ticketsEl.innerHTML = '';
    const ticketEl = createElementFromString(
        `<div class= ticket card d-flex justify-content-center">
            <div class="lucky">
                <p>You're so lucky</p>
            <img src="${data[id]}" class="card-img-top" alt="...">
                <div class="d-grid gap-3 col-6 mx-auto">
                    <a href="backpack.html" id = "lottery_button" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">GO Backpack</a>
                </div>
        </div>`
    );
    ticketsEl.appendChild(ticketEl);

    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    const value = await web3.eth.getBalance(account);
    accountEl.innerText = 'Your Account : ' + account + '\nMaple Coins : ' + value / 1e18;
};

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    const value = await web3.eth.getBalance(account);
    accountEl.innerText = 'Your Account : ' + account + '\nMaple Coins : ' + value/1e18;
};

main();