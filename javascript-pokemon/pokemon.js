/*
    Pokemon:
        - It is a function expression, so when it is called as new Pokemon(), an object instance is created. The
        prototype of the instance is going to be the Pokemon function expression.
        - Encapsulation: only the attributes and methods defined by "this" are going to be public for using them
        on instances.
        - attackEffectiveness (private): Its keys and values are types of pokemons. So, each key type of pokemon has an
        effective attack against a value type of pokemon.
        - getEffectiveness (private):
            Input: the pokemon that is being damaged.
            Proccess: checks the types of the pokemons for returning an effectiveness value of
            the damage.
                - In case that both pokemons are of the same type, the value is neutral 1.
                - If the value of the current pokemon type key from the attackEffectiveness, is equal to the type of the defender,
                the value is 2.
                - If none of the above conditions are true, then the value is 0.5 because it isn't very effective
                against the defender.
            Output: the effectiveness
        - damage (public):
            Input: a defender pokemon that will be damaged.
            Process: calculates the total damage made to the defender, by the current pokemon (attacker).
            Output: the total damage.
*/

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
    const getEffectiveness = (defender) => {
        if (this.type === defender.type) {
            return 1;
        } else if (attackEffectiveness[this.type] === defender.type) {
            return 2;
        } else {
            return 0.5;
        }
    };
    this.damage = (defender) => {
        return Math.round(50 * (this.attack / defender.defense) * getEffectiveness(defender));
    }
    return this;
};

const attacker = new Pokemon('pikachu', 'electric', 200, 100);
const defender = new Pokemon('magikarp', 'water', 20, 100);

attacker.damage(defender);