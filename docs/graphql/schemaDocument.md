# 🏏 Cricket Players GraphQL API Documentation

[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)

> 📅 **Last Updated:** 10/5/2025, 6:04:23 PM  
> 🔄 **Auto-generated** from GraphQL schema  
> ⚡ **Dynamic** - Updates automatically with schema changes

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📖 About GraphQL](#-about-graphql)
- [🔍 Schema Overview](#-schema-overview)
- [📊 Queries](#-queries)
- [🏗️ Types](#️-types)
- [📝 Enums](#-enums)
- [💡 Examples](#-examples)
- [🛠️ Development](#️-development)

## 🚀 Quick Start

Get started with our Cricket Players API in seconds:

```bash
# Start the application
./gradlew bootRun

# Test the API
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { findAll { id name team city } }"}'
```

## 📖 About GraphQL

Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.

**Key Benefits:**
- 🎯 **Precise Data Fetching** - Get exactly what you need
- 🔄 **Single Endpoint** - One URL for all operations  
- 📚 **Self-Documenting** - Schema serves as documentation
- 🚀 **Type Safety** - Strong typing prevents errors

## 🔍 Schema Overview

```graphql
type Player{
    id: ID!
    name: String
    team: Team
    city: String
    age: Int
    position: String
    jerseyNumber: Int
    salary: Float
    isActive: Boolean
}
enum Team{
    CSK
    MI
    RCB
    DC
    GT
    KKR
    PBKS
    RR
    SRH
    LSG
}

type Query{
    findAll: [Player]
    findById(id: ID!): Player
    findByTeam(team: Team!): [Player]
    findByName(name: String!): Player
    findByPosition(position: String!): [Player]
    findActivePlayers: [Player]
    findPlayersByAgeRange(minAge: Int!, maxAge: Int!): [Player]
    findPlayersBySalaryRange(minSalary: Float!, maxSalary: Float!): [Player]
    getPlayerCount: Int
    getTeamPlayerCount(team: Team!): Int
}

type Mutation{
    createPlayer(name: String!, team: Team!, city: String!, age: Int, position: String, jerseyNumber: Int, salary: Float): Player
    updatePlayer(id: ID!, name: String, team: Team, city: String, age: Int, position: String, jerseyNumber: Int, salary: Float, isActive: Boolean): Player
    deletePlayer(id: ID!): Boolean
    transferPlayer(id: ID!, newTeam: Team!): Player
    activatePlayer(id: ID!): Player
    deactivatePlayer(id: ID!): Player
    updatePlayerSalary(id: ID!, newSalary: Float!): Player
}
```

## 📊 Queries

### 🔍 findAll

📋 **Description:** Retrieve all cricket players from all IPL teams.

**Return Type:** `[Player]`

**Example Query:**
```graphql
query GetAllPlayers {
  findAll {
    id
    name
    team
    city
    age
    position
    jerseyNumber
    salary
    isActive
  }
}
```

### 🔍 findById(id

🔍 **Description:** Execute the findById(id operation.

**Return Type:** `ID!)`

### 🔍 findByTeam(team

🔍 **Description:** Execute the findByTeam(team operation.

**Return Type:** `Team!)`

### 🔍 findByName(name

🔍 **Description:** Execute the findByName(name operation.

**Return Type:** `String!)`

### 🔍 findByPosition(position

🔍 **Description:** Execute the findByPosition(position operation.

**Return Type:** `String!)`

### 🔍 findActivePlayers

🔍 **Description:** Execute the findActivePlayers operation.

**Return Type:** `[Player]`

### 🔍 findPlayersByAgeRange(minAge

🔍 **Description:** Execute the findPlayersByAgeRange(minAge operation.

**Return Type:** `Int! maxAge`

### 🔍 findPlayersBySalaryRange(minSalary

🔍 **Description:** Execute the findPlayersBySalaryRange(minSalary operation.

**Return Type:** `Float! maxSalary`

### 🔍 getPlayerCount

🔍 **Description:** Execute the getPlayerCount operation.

**Return Type:** `Int`

### 🔍 getTeamPlayerCount(team

🔍 **Description:** Execute the getTeamPlayerCount(team operation.

**Return Type:** `Team!)`

## 🏗️ Types

### 🏏 Player

👤 **Description:** Represents a cricket player with team affiliation, personal details, and location information.

#### 📋 Fields for `Player`

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| 🆔 `id` | `ID!` | Unique identifier for the player | ✅ Yes |
| 👤 `name` | `String` | Player's full name | ❌ No |
| 🏟️ `team` | `Team` | IPL team the player belongs to | ❌ No |
| 🏙️ `city` | `String` | Player's home city | ❌ No |
| 📝 `age` | `Int` | age field | ❌ No |
| 📝 `position` | `String` | position field | ❌ No |
| 🔢 `jerseyNumber` | `Int` | Player's jersey number | ❌ No |
| 📝 `salary` | `Float` | salary field | ❌ No |
| 📝 `isActive` | `Boolean` | isActive field | ❌ No |

### 🏏 Mutation

🏏 **Description:** The Mutation type definition.

#### 📋 Fields for `Mutation`

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| 📝 `createPlayer(name` | `String! team` | createPlayer(name field | ✅ Yes |
| 📝 `updatePlayer(id` | `ID! name` | updatePlayer(id field | ✅ Yes |
| 📝 `deletePlayer(id` | `ID!)` | deletePlayer(id field | ✅ Yes |
| 📝 `transferPlayer(id` | `ID! newTeam` | transferPlayer(id field | ✅ Yes |
| 📝 `activatePlayer(id` | `ID!)` | activatePlayer(id field | ✅ Yes |
| 📝 `deactivatePlayer(id` | `ID!)` | deactivatePlayer(id field | ✅ Yes |
| 📝 `updatePlayerSalary(id` | `ID! newSalary` | updatePlayerSalary(id field | ✅ Yes |

## 📝 Enums

### 🏟️ Team

🏏 **Description:** Cricket teams participating in IPL (Indian Premier League) with their respective cities and colors.

#### 🎯 Values for `Team`

| Value | Full Name | City | Colors |
|-------|-----------|------|--------|
| `CSK` | Chennai Super Kings | Chennai | 🟡 Yellow & 🔵 Blue |
| `MI` | Mumbai Indians | Mumbai | 🔵 Blue & 🟡 Gold |
| `RCB` | Royal Challengers Bangalore | Bangalore | 🔴 Red & 🟡 Gold |
| `DC` | Delhi Capitals | Delhi | 🔵 Blue & 🔴 Red |
| `GT` | Gujarat Titans | Ahmedabad | 🟢 Green & 🔵 Blue |
| `KKR` | KKR team | Unknown | Unknown |
| `PBKS` | PBKS team | Unknown | Unknown |
| `RR` | RR team | Unknown | Unknown |
| `SRH` | SRH team | Unknown | Unknown |
| `LSG` | LSG team | Unknown | Unknown |

## 💡 Examples

### Basic Queries

```graphql
# Get all players with basic info
query GetAllPlayers {
  findAll {
    id
    name
    team
  }
}

# Get all players with complete details
query GetAllPlayersDetailed {
  findAll {
    id
    name
    team
    city
  }
}

# Find a specific player by ID
query GetPlayerById {
  findById(id: 1) {
    id
    name
    team
    city
  }
}
```

### Advanced Queries

```graphql
# Get players from specific teams
query GetCSKPlayers {
  findAll {
    id
    name
    team
    city
  }
}

# Get player details for team analysis
query GetTeamAnalysis {
  findAll {
    name
    team
    city
  }
}
```

## 🛠️ Development

### 📁 Project Structure

```
src/
├── main/
│   ├── java/com/graphQl/document1/
│   │   ├── controller/PlayerController.java
│   │   ├── model/Player.java
│   │   ├── service/PlayerService.java
│   │   └── Document1Application.java
│   └── resources/
│       ├── graphql/schema.graphqls
│       └── application.properties
docs/
└── graphql/
    └── schemaDocument.md
```

### 🔄 How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

```bash
node generate-docs.js
```

This will automatically parse your schema and regenerate this documentation.

### 📍 Schema File Location

The documentation is generated from: `src/main/resources/graphql/schema.graphqls`

### 🚀 Running the Application

```bash
# Start the Spring Boot application
./gradlew bootRun

# The GraphQL endpoint will be available at:
# http://localhost:8080/graphql
```

### 🧪 Testing Queries

You can test the API using:

1. **GraphQL Playground** (if enabled)
2. **Postman** with GraphQL support
3. **curl** commands
4. **GraphQL clients** like Apollo Client

---

<div align="center">

**🏏 Cricket Players GraphQL API**  
*Built with ❤️ using Spring Boot & GraphQL*

[![Made with GraphQL](https://img.shields.io/badge/Made%20with-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Powered by Spring Boot](https://img.shields.io/badge/Powered%20by-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)

</div>
