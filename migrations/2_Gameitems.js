const Gameitems = artifacts.require("Gameitems");

module.exports = function (deployer) {
    deployer.deploy(Gameitems);
};
