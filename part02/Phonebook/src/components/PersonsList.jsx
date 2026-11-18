
const PersonsList = ({ filteredPersons, deletePerson }) => {
    return (
        <>
            {
                filteredPersons.map((person) => (
                    <div key={person.id || person.name}>
                        <p >{person.name} {person.number}</p>
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </div>
                ))
            }
        </>
    )
}

export default PersonsList