const express = require('express');
const neo4j = require('neo4j-driver');

// conexión a Neo4j
const driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', '12345678')
);

const app = express();

const port = 3000;


app.use(express.json())
// obtener nodos
app.get('/nodes', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n:Persona) RETURN n LIMIT 70');
    const nodes = result.records.map(record => record.get('n').properties);

    res.json(nodes);
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).send('Error fetching nodes');
  }
});


// Ruta de ejemplo para buscar nodos por una palabra específica en sus atributos
app.get('/nodes/:hobby', async (req, res) => {
  const session = driver.session()
  const {hobby} = req.params;
  res.header('Access-Control-Allow-Origin', '*')
  try{
    const result = await session.run(`MATCH (p:Persona) WHERE '${hobby}' in p.Hobbies RETURN p LIMIT 50`);
    const nodes = result.records.map(record => record.get('p').properties);
    res.json(nodes);
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).send('Error fetching nodes');
  }
});

app.post('/nodes', async (req, res) => {
  const session = driver.session()
  res.header('Access-Control-Allow-Origin', '*')
  const {
    Nombre,
    Carrera,
    Telefono,
    Descripcion,
    Hobbies,
  } = req.body;
  try{
    const result = await session.run(`CREATE (p:Persona {Nombre: '${Nombre}', Telefono: '${Telefono}', Carrera: '${Carrera}', Descripcion:' ${Descripcion}', Hobbies: '${Hobbies}'}) RETURN p`);
    const nodes = result.records.map(record => record.get('p').properties);
    res.json(nodes);
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).send('Error fetching nodes');
  }
});

// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Cierra el controlador de Neo4j cuando la aplicación se detiene
process.on('exit', async () => {
  await driver.close();
});
