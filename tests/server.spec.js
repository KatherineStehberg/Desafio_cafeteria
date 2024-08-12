const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  
  // 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  test("GET /cafes devuelve un status code 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
  test("DELETE /cafes/:id devuelve un status code 404 si el id no existe", async () => {
    const nonExistentId = 999; // ID que no existe en cafes.json
    const response = await request(server)
      .delete(`/cafes/${nonExistentId}`)
      .set("Authorization", "Bearer token"); // Simulación de token de autorización
    expect(response.status).toBe(404);
  });

  // 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
  test("POST /cafes agrega un nuevo café y devuelve un status code 201", async () => {
    const newCafe = { id: 5, nombre: "Nuevo Café" };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newCafe)]));
  });

  // 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
  test("PUT /cafes/:id devuelve un status code 400 si el id del parámetro es diferente al del payload", async () => {
    const payload = { id: 2, nombre: "Café Actualizado" };
    const response = await request(server).put("/cafes/1").send(payload); // ID en la ruta es diferente al del payload
    expect(response.status).toBe(400);
  });
});
