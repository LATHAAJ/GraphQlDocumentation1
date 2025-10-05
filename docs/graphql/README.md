# GraphQL API Documentation

> **Auto-generated on:** 10/5/2025, 4:39:29 PM
> 
> This documentation is automatically generated from your GraphQL schema. 
> Any changes to the schema will be reflected here when you run `node generate-docs.js`

## Schema Overview

```graphql
type Player{
    id: ID!
    name : String
    team: Team
}
enum Team{
    CSK
    MI
    RCB
    DC
    GT
}

type Query{
    findAll: [Player]
}
```

## Types

### Player
**Fields:**
- **id**: ID!
- **name**: String
- **team**: Team

### Query
**Fields:**
- **findAll**: [Player]

## Enums

### Team
**Values:**
- `CSK`
- `MI`
- `RCB`
- `DC`
- `GT`

## Queries

### findAll
**Type**: `[Player]`

**Example Query:**
```graphql
query {
  findAll {
    id
    name
    team
  }
}
```

## How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

```bash
node generate-docs.js
```

This will automatically parse your schema and regenerate this documentation.

## Schema File Location

The documentation is generated from: `src/main/resources/graphql/schema.graphqls`
