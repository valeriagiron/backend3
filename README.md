# 📦 Backend de Adopciones de Mascotas

Proyecto de backend desarrollado en **Node.js** con **Express** y **Mongoose**, gestionado mediante contenedores Docker. Incluye documentación Swagger, pruebas funcionales con **Jest**, y está preparado para su despliegue mediante Docker Hub.

---

## 🚀 **Cómo Ejecutar el Proyecto**

### ✅ **Con Docker (Modo Recomendado)**

```bash
# Descargar imagen desde Docker Hub
docker pull valeriagiron/backend3_app:v1

# Ejecutar el contenedor en el puerto 8080
docker run -p 8080:8080 valeriagiron/backend3_app:v1
```

Accede a la API en:  
[http://localhost:8080](http://localhost:8080)  

---

### ✅ **Con Node.js (Modo Local)**

```bash
npm install
npm run dev
```

---

## 🧪 **Ejecución de Pruebas**

```bash
npm run test
```

> Las pruebas cubren todos los endpoints de `adoption.router.js`, incluyendo casos de éxito y error.

---

## 📚 **Documentación Swagger**

Accede a la documentación interactiva desde:  
[http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## 📦 **Imagen Docker en DockerHub**

```bash
docker pull valeriagiron/backend3_app:v1
```

**Enlace directo a la imagen:**  
[https://hub.docker.com/r/valeriagiron/backend3_app](https://hub.docker.com/r/valeriagiron/backend3_app)

---

## 📝 **Autor**

Valeria Girón  
Proyecto Backend 3 – Coderhouse  
