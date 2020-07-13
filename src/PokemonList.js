import React from 'react'

export default function Pokemonist({ pokemon, pokemonPic  }) {



    return(
        <div className="tc">
            {pokemon.map(p => (
                <div key={p}>{p}</div>
            ))}
        </div>
    )
}