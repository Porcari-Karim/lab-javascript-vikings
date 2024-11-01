// Soldier
class Soldier {
    constructor(health, strength){
        this.health = health;
        this.strength = strength;
    }

    attack = () => this.strength;

    receiveDamage(damage){
        this.health -= damage;
    }
}

// Viking
class Viking extends Soldier{
    constructor(name, health, strength){
        super(health, strength);
        this.name = name;
    }

    receiveDamage(damage){
        super.receiveDamage(damage);
        return this.health > 0 ? `${this.name} has received ${damage} points of damage` : `${this.name} has died in act of combat`;
    }

    battleCry = () => 'Odin Owns You All!';
}

// Saxon
class Saxon extends Soldier{
    constructor(health, strength){
        super(health, strength);
    }

    receiveDamage(damage){
        super.receiveDamage(damage);
        return this.health > 0 ? `A Saxon has received ${damage} points of damage` : 'A Saxon has died in combat';
    }
}

// War
class War {
    constructor(){
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    #getRandomSoldier = (soldierList) => soldierList[Math.floor(Math.random() * soldierList.length)]

    #removeDeadSoldiers = (soldierList) =>soldierList.filter((soldier) => soldier.health > 0);

    #simulateRandomAttack(attackers, targets) {
        const randomAttacker = this.#getRandomSoldier(attackers);
        const randomTarget = this.#getRandomSoldier(targets);
        return randomTarget.receiveDamage(randomAttacker.attack());
    }

    addViking(viking){
        this.vikingArmy.push(viking);
    }

    addSaxon(saxon){
        this.saxonArmy.push(saxon);
    }

    

    vikingAttack(){
        const attackResult = this.#simulateRandomAttack(this.vikingArmy, this.saxonArmy);
        this.saxonArmy = this.#removeDeadSoldiers(this.saxonArmy);
        return attackResult;
    }

    saxonAttack(){
        const attackResult = this.#simulateRandomAttack(this.saxonArmy, this.vikingArmy);
        this.vikingArmy = this.#removeDeadSoldiers(this.vikingArmy);
        return attackResult;
    }

    showStatus(){
        if(this.saxonArmy.length === 0) return 'Vikings have won the war of the century!';
        if(this.vikingArmy.length === 0) return 'Saxons have fought for their lives and survived another day...';
        return 'Vikings and Saxons are still in the thick of battle.'
    }

}
