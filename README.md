# Lowtrack Backend

A [NestJS](https://nestjs.com/) backend that wraps the [SNCF API](https://numerique.sncf.com/startup/api/) to search for train stations and look up travel itineraries.

## Requirements

- Node.js (>= 18)
- An SNCF API key — get one at [numerique.sncf.com](https://numerique.sncf.com/startup/api/)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file at the project root:

```env
SNCF_API_KEY=your_sncf_api_key
PORT=3000
NODE_ENV=development
```

| Variable       | Description                                      | Default       |
| -------------- | ------------------------------------------------ | ------------- |
| `SNCF_API_KEY` | Authorization key for the SNCF API               | _(required)_  |
| `PORT`         | Port the server listens on                       | `3000`        |
| `NODE_ENV`     | Environment. Swagger is disabled in `production` | `development` |

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

The API is available at `http://localhost:3000`.

When `NODE_ENV` is not `production`, interactive API documentation (Swagger) is served at `http://localhost:3000/api`.

## API

### `GET /stations`

Search for stations by name.

**Query parameters**

| Name   | Type     | Required | Description           |
| ------ | -------- | -------- | --------------------- |
| `name` | `string` | yes      | Station name to match |

**Example**

```bash
curl "http://localhost:3000/stations?name=Lyon"
```

**Response**

```json
[
  {
    "id": "stop_area:SNCF:87686006",
    "name": "Lyon Part-Dieu (Lyon)"
  }
]
```

Returns `404 Not Found` if no station matches.

### `GET /travel`

Look up travel itineraries between two stations on a given date.

**Query parameters**

| Name   | Type     | Required | Description                  |
| ------ | -------- | -------- | ---------------------------- |
| `from` | `string` | yes      | Origin station id            |
| `to`   | `string` | yes      | Destination station id       |
| `date` | `string` | yes      | Travel date                  |

**Example**

```bash
curl "http://localhost:3000/travel?from=stop_area:SNCF:87686006&to=stop_area:SNCF:87271007&date=2026-06-12"
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# coverage
npm run test:cov
```

## Docker

```bash
docker build -t lowtrack-backend .
docker run -p 3000:3000 --env-file .env lowtrack-backend
```
