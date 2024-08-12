const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  
 
  test("GET /cafes devuelve un status code 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

 
  test("DELETE /cafes/:id devuelve un status code 404 si el id no existe", async () => {
    const nonExistentId = 999; // ID que no existe en cafes.json
    const response = await request(server)
      .delete(`/cafes/${nonExistentId}`)
      .set("Authorization", "Bearer token");
    expect(response.status).toBe(404);
  });

   test("POST /cafes agrega un nuevo café y devuelve un status code 201", async () => {
    const newCafe = { id: 5, nombre: "Nuevo Café" };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newCafe)]));
  });

   test("PUT /cafes/:id devuelve un status code 400 si el id del parámetro es diferente al del payload", async () => {
    const payload = { id: 2, nombre: "Café Actualizado" };
    const response = await request(server).put("/cafes/1").send(payload); // ID en la ruta es diferente al del payload
    expect(response.status).toBe(400);
  });
});
