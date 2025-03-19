import neo4j from 'neo4j-driver'

const driver = neo4j.driver(
    'neo4j://localhost:7687',
    neo4j.auth.basic('neo4j', '12345678')
  )



export class nodeModel {
    static async getAll(){
        const session = driver.session()
        try{console.log('getAll')
        const result = await session.run(`MATCH (n:Persona) RETURN n LIMIT 200`)
        console.log(result.records)

        return result.records.map(record => {
            return record.get('n').properties
        })}finally{
            await session.close()
        }
    }

    static async getByHobby({hobby}){
        const session = driver.session()
        try{console.log("getByHobby")
        const result = await session.run(`MATCH (p:Persona) WHERE '${hobby}' in p.Hobbies RETURN p LIMIT 50`)

        return result.records.map(record => {
            return record.get('p').properties
        })}finally{
            await session.close()
        }
    }

    static async create ({node}){
        const session = driver.session()
        const {
            Nombre,
            Telefono,
            Descripcion,
            Carrera,
            Hobbies
        } = node

        try{
            const result = await session.run(`CREATE (p:Persona {Nombre: '${Nombre}', Telefono: '${Telefono}', Carrera: '${Carrera}', Descripcion:' ${Descripcion}', Hobbies: ['${Hobbies}']}) RETURN p`)
            return result.records.map(record => {
                return record.get('p').properties
            })
        }catch(e){
            throw new Error("Error al crear nodo")
        }finally{
            await session.close()
        }
    }
    static async agregarAmigo({node}){
        const session = driver.session()
        const {
            user1,
            user2
        } = node
        console.log("inicio")
        try{
            console.log("Amistad creada")
            const result = await session.run(`MATCH (a:Persona {Nombre: "${user1}"}), (b:Persona {Nombre:"${user2}"}) CREATE (a)-[r:AMIGO]->(b) RETURN a,b,r`);
            return result.records.map(record => record.get('r').properties);

        }catch(e){
            throw new Error("Error al crear nodo");
        }finally{
            await session.close();
        }
    }
}