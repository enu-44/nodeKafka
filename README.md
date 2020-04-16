# Longbow

## Dependencies

```
npm i --save express neode kafka-node socket.io express-asyncify nodemon
```

vue create ui
npm i --save socket.io-client


para instalar este software, descargue cada uno de los modulos y ejecute la siguiente instruccion 


```javascript
    npm i
```


para ejecutar este software, ejecute la siguiente instruccion

```javascript
    npm run start:dev
```


## 1. Suscribirse a un topic

###Enviar notificaciones por Topic o Grupo

| URL | http://localhost:3000/v1/conectTopic |
| -- | -- |
| Método | POST |
| Parámetros |  ```{"topic": "3118"} ``` |



### 2. Enviar Notificacion

| URL | http://localhost:8080/services/simdcpmicroservice/api/kafka/publish-testing/name_topic |
| -- | -- |
| Método | POST |
| Parámetros |  ```{ "id": 10531802, "mensaje": "Se ha asignado una nueva Persuasion 2673", "visto": null, "fechaVisto": null,  "funcionarioId": 1313, "moduloId": 644,  "moduloNombre": "Persuasion", "actividadId": 367754 } ```  |
