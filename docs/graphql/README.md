# GraphQL API Documentation

> **Auto-generated on:** 10/5/2025, 5:04:56 PM
> 
> This documentation is automatically generated from your GraphQL schema. 
> Any changes to the schema will be reflected here when you run `node generate-docs.js`

## In this article

* About queries
* Schema overview
* Types
* Enums
* Queries

## About queries

Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.

## Schema Overview

```graphql
type Player{
    id: ID!
    name : String
    team: Team
    city:String
}
enum Team{
    CSK
    MI
    RCB
    DC
    GT
    GST
}

type Query{
    findAll: [Player]
    findById(id: ID!): Player
}
```

## Queries

### findAll

Retrieve all players from all teams.

**Type:** [Player]

**Example Query:**
```graphql
query {
  findAll {
    id
    name
    team
    city
  }
}
```

### findById(id

Execute the findById(id operation.

**Type:** ID!)

## Types

### Player

Represents a cricket player with team affiliation and personal details.

#### Fields for `Player`

| Name | Type | Description |
|------|------|-------------|
| `id` | `ID!` | Unique identifier for the player |
| `name` | `String` | Player's full name |
| `team` | `Team` | Team the player belongs to |
| `city` | `String` | city field |

## Enums

### Team

Cricket teams participating in IPL (Indian Premier League).

#### Values for `Team`

| Value | Description |
|-------|-------------|
| `CSK` | Chennai Super Kings |
| `MI` | Mumbai Indians |
| `RCB` | Royal Challengers Bangalore |
| `DC` | Delhi Capitals |
| `GT` | Gujarat Titans |
| `GST` | GST team |

## Help and support

### How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

```bash
node generate-docs.js
```

This will automatically parse your schema and regenerate this documentation.

### Schema File Location

The documentation is generated from: `src/main/resources/graphql/schema.graphqls`

### Example Usage

```graphql
# Get all players
query GetAllPlayers {
  findAll {
    id
    name
    team
  }
}

# Get players from specific team
query GetPlayersByTeam {
  findAll {
    id
    name
    team
  }
}
```
