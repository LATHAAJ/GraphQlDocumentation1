# GraphQL API Documentation

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
A cricket player with the following fields:
- **id**: ID! - Unique identifier
- **name**: String - Player's name
- **team**: Team - Team the player belongs to

### Team (Enum)
Available teams:
- CSK
- MI
- RCB
- DC
- GT

## Queries

### findAll
Returns all players from all teams.

**Type**: [Player]

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
