const Pokemon = function(pName, pType, pAttack, pDefense) {
    this.name = pName;
    this.type = pType;
    this.attack = pAttack;
    this.defense = pDefense;
    const attackEffectiveness = {
        'fire': 'grass',
        'water': 'fire',
        'grass': 'water',
        'electric': 'water'
    };
    const getEffectiveness = function(defender) {
        if (this.type === defender.type) {
            return 1;
        } else if (attackEffectiveness[this.type] === defender.type) {
            return 2;
        } else {
            return 0.5;
        }
    };
    this.damage = function(defender) {
        return Math.round(50 * (this.attack / defender.defense) * getEffectiveness(defender));
    }
    return this;
};

const attacker = new Pokemon('pikachu', 'electric', 200, 100);
const defender = new Pokemon('magikarp', 'water', 20, 100);

attacker.damage(defender);