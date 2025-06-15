### Shak Multas

**POST /shak-multas/multas**

Creates a new fine.

Request Body:

```json
{
  "id": "PBO1234",
  "valor": 5000,
  "descripcion": "Mal estacionado"
}
```

Response:

```json
{
  "id": "nNjh0jU3QjDcOvgqGJfR",
  "mensaje": "Multa creada con éxito"
}
```

**POST /shak-multas/multas/pagar**

Pays an existing fine.

Request Body:

```json
{
  "multaId": "nNjh0jU3QjDcOvgqGJfR",
  "paymentDetails": {
    "app_name": "ABC",
    "service": "Electronic Items",
    "customer_email": "shalithax@gmail.com",
    "card_type": "VISA",
    "card_holder_name": "Example",
    "card_number": "4242424242424242",
    "expiryMonth": "01",
    "expiryYear": "2020",
    "cvv": "123",
    "amount": "5000.00",
    "currency": "USD"
  }
}
```

Response:

```json
{
  "mensaje": "Pago realizado con éxito",
  "response": {
    "success": true,
    "message": "Transaction is successful.",
    "data": {
      "data": {
        "message": "transaction is successful"
      }
    }
  }
}
```

**GET /shak-multas/multas/{identifier}**

Gets fines by identifier.

Response:

```json
[
  {
    "id": "SnuZjGu8EmxFv804kuJa",
    "identifier": "12345",
    "descripcion": "Estacionamiento indebido",
    "fecha": "2024-07-07T06:28:28.967Z",
    "valor": 100,
    "pagada": true
  },
  {
    "id": "dj0Fhj3bM3liokBaEuvg",
    "identifier": "12345",
    "descripcion": "Estacionamiento indebido",
    "fecha": "2024-07-07T06:45:25.666Z",
    "valor": 100,
    "pagada": true
  },
  {
    "id": "iPhLPFPtjStCvOvxZGfk",
    "identifier": "12345",
    "descripcion": "Estacionamiento indebido",
    "fecha": "2024-07-07T06:26:49.011Z",
    "valor": 100,
    "pagada": true
  }
]
```

## Autenticación y Autorización

Antes de consumir los endpoints protegidos, registra un usuario e inicia sesión para obtener un token JWT.

## Variables de entorno

Crea un archivo `.env` (o copia `.env.example`) con las siguientes variables:

```
# Firebase configuration
FIREBASE_PROJECT_ID=... etc
# JWT secret para firmar tokens
JWT_SECRET=tu_clave_secreta
```

## Endpoints de autenticación

### POST /auth/register

Registra un nuevo usuario.

Request Body:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu_password"
}
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

### POST /auth/login

Inicia sesión con un usuario existente.

Request Body:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu_password"
}
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

## Uso de endpoints protegidos

Para consumir los endpoints de multas (`/multas`), añade el header `Authorization` con el valor:

```
Bearer <JWT_TOKEN>
```
