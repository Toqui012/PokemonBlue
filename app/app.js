console.log('hola mundo');


// Renderiza todos los elementos siemrpre y cuando estos esten cargados
document.addEventListener('DOMContentLoaded', () =>{
    const random = getRandomInt(1,385);
    fetchData(random);
})


const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min)) + min; 
}


const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        console.log(data);
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            attack: data.stats[1].base_stat,
            attackEsp: data.stats[3].base_stat,
            def: data.stats[2].base_stat

        }

        paintCard(pokemon)
    } catch (error){

    }
}


function paintCard(pokemon){
    console.log(pokemon)
    const flex = document.querySelector('.flex');
    const template = document.getElementById('template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} HP </span>` 
    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' Exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.attackEsp
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def


    console.log(clone)
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
