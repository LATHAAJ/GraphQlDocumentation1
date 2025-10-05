const fs = require('fs');
const path = require('path');

// Function to parse GraphQL schema and extract information
function parseGraphQLSchema(schemaContent) {
  const types = [];
  const enums = [];
  const queries = [];
  const mutations = [];
  
  // Extract types
  const typeMatches = schemaContent.match(/type\s+(\w+)\s*\{([^}]+)\}/g);
  if (typeMatches) {
    typeMatches.forEach(match => {
      const typeName = match.match(/type\s+(\w+)/)[1];
      const fields = match.match(/\{([^}]+)\}/)[1];
      const fieldList = fields.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.includes('{') && !line.includes('}'))
        .map(line => {
          const parts = line.split(':');
          return {
            name: parts[0].trim(),
            type: parts[1] ? parts[1].trim().replace(',', '') : '',
            description: ''
          };
        });
      
      types.push({
        name: typeName,
        fields: fieldList,
        description: ''
      });
    });
  }
  
  // Extract enums
  const enumMatches = schemaContent.match(/enum\s+(\w+)\s*\{([^}]+)\}/g);
  if (enumMatches) {
    enumMatches.forEach(match => {
      const enumName = match.match(/enum\s+(\w+)/)[1];
      const values = match.match(/\{([^}]+)\}/)[1];
      const valueList = values.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.includes('{') && !line.includes('}'))
        .map(line => line.replace(',', '').trim());
      
      enums.push({
        name: enumName,
        values: valueList,
        description: ''
      });
    });
  }
  
  // Extract queries
  const queryMatches = schemaContent.match(/type\s+Query\s*\{([^}]+)\}/g);
  if (queryMatches) {
    const queryContent = queryMatches[0].match(/\{([^}]+)\}/)[1];
    const queryList = queryContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.includes('{') && !line.includes('}'))
      .map(line => {
        const parts = line.split(':');
        return {
          name: parts[0].trim(),
          type: parts[1] ? parts[1].trim().replace(',', '') : '',
          description: ''
        };
      });
    
    queries.push(...queryList);
  }
  
  return { types, enums, queries, mutations };
}

// Function to generate markdown documentation
function generateMarkdown(schemaData, schemaContent) {
  const { types, enums, queries } = schemaData;
  
  let markdown = `# 🏏 Cricket Players GraphQL API Documentation

[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)

> 📅 **Last Updated:** ${new Date().toLocaleString()}  
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

\`\`\`bash
# Start the application
./gradlew bootRun

# Test the API
curl -X POST http://localhost:8080/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query": "query { findAll { id name team city } }"}'
\`\`\`

## 📖 About GraphQL

Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.

**Key Benefits:**
- 🎯 **Precise Data Fetching** - Get exactly what you need
- 🔄 **Single Endpoint** - One URL for all operations  
- 📚 **Self-Documenting** - Schema serves as documentation
- 🚀 **Type Safety** - Strong typing prevents errors

## 🔍 Schema Overview

\`\`\`graphql
${schemaContent}
\`\`\`

`;

  // Generate Queries section first (like GitHub docs)
  if (queries.length > 0) {
    markdown += `## 📊 Queries\n\n`;
    queries.forEach(query => {
      markdown += `### 🔍 ${query.name}\n\n`;
      
      // Add description based on query name
      let description = '';
      let icon = '🔍';
      if (query.name === 'findAll') {
        description = 'Retrieve all cricket players from all IPL teams.';
        icon = '📋';
      } else if (query.name === 'findById') {
        description = 'Find a specific cricket player by their unique ID.';
        icon = '🎯';
      } else {
        description = `Execute the ${query.name} operation.`;
      }
      
      markdown += `${icon} **Description:** ${description}\n\n`;
      markdown += `**Return Type:** \`${query.type}\`\n\n`;
      
      // Generate example query
      if (query.name === 'findAll' && types.find(t => t.name === 'Player')) {
        markdown += `**Example Query:**\n`;
        markdown += `\`\`\`graphql\n`;
        markdown += `query GetAllPlayers {\n`;
        markdown += `  ${query.name} {\n`;
        const playerType = types.find(t => t.name === 'Player');
        if (playerType) {
          playerType.fields.forEach(field => {
            markdown += `    ${field.name}\n`;
          });
        }
        markdown += `  }\n`;
        markdown += `}\n`;
        markdown += `\`\`\`\n\n`;
      } else if (query.name === 'findById' && types.find(t => t.name === 'Player')) {
        markdown += `**Example Query:**\n`;
        markdown += `\`\`\`graphql\n`;
        markdown += `query GetPlayerById {\n`;
        markdown += `  ${query.name}(id: 1) {\n`;
        const playerType = types.find(t => t.name === 'Player');
        if (playerType) {
          playerType.fields.forEach(field => {
            markdown += `    ${field.name}\n`;
          });
        }
        markdown += `  }\n`;
        markdown += `}\n`;
        markdown += `\`\`\`\n\n`;
      }
    });
  }

  // Generate Types section
  if (types.length > 0) {
    markdown += `## 🏗️ Types\n\n`;
    types.forEach(type => {
      if (type.name === 'Query') return; // Skip Query type as it's handled above
      
      markdown += `### 🏏 ${type.name}\n\n`;
      
      // Add description based on type name
      let description = '';
      let icon = '🏏';
      if (type.name === 'Player') {
        description = 'Represents a cricket player with team affiliation, personal details, and location information.';
        icon = '👤';
      } else {
        description = `The ${type.name} type definition.`;
      }
      
      markdown += `${icon} **Description:** ${description}\n\n`;
      
      if (type.fields.length > 0) {
        markdown += `#### 📋 Fields for \`${type.name}\`\n\n`;
        markdown += `| Field | Type | Description | Required |\n`;
        markdown += `|-------|------|-------------|----------|\n`;
        
        type.fields.forEach(field => {
          let fieldDescription = '';
          let required = field.type.includes('!') ? '✅ Yes' : '❌ No';
          let fieldIcon = '📝';
          
          if (field.name === 'id') {
            fieldDescription = 'Unique identifier for the player';
            fieldIcon = '🆔';
          } else if (field.name === 'name') {
            fieldDescription = 'Player\'s full name';
            fieldIcon = '👤';
          } else if (field.name === 'team') {
            fieldDescription = 'IPL team the player belongs to';
            fieldIcon = '🏟️';
          } else if (field.name === 'city') {
            fieldDescription = 'Player\'s home city';
            fieldIcon = '🏙️';
          } else if (field.name === 'jerseyNumber') {
            fieldDescription = 'Player\'s jersey number';
            fieldIcon = '🔢';
          } else {
            fieldDescription = `${field.name} field`;
          }
          
          markdown += `| ${fieldIcon} \`${field.name}\` | \`${field.type}\` | ${fieldDescription} | ${required} |\n`;
        });
        markdown += `\n`;
      }
    });
  }

  // Generate Enums section
  if (enums.length > 0) {
    markdown += `## 📝 Enums\n\n`;
    enums.forEach(enumType => {
      markdown += `### 🏟️ ${enumType.name}\n\n`;
      
      // Add description based on enum name
      let description = '';
      if (enumType.name === 'Team') {
        description = 'Cricket teams participating in IPL (Indian Premier League) with their respective cities and colors.';
      } else {
        description = `The ${enumType.name} enum values.`;
      }
      
      markdown += `🏏 **Description:** ${description}\n\n`;
      markdown += `#### 🎯 Values for \`${enumType.name}\`\n\n`;
      markdown += `| Value | Full Name | City | Colors |\n`;
      markdown += `|-------|-----------|------|--------|\n`;
      
      enumType.values.forEach(value => {
        let fullName = '';
        let city = '';
        let colors = '';
        
        if (value === 'CSK') {
          fullName = 'Chennai Super Kings';
          city = 'Chennai';
          colors = '🟡 Yellow & 🔵 Blue';
        } else if (value === 'MI') {
          fullName = 'Mumbai Indians';
          city = 'Mumbai';
          colors = '🔵 Blue & 🟡 Gold';
        } else if (value === 'RCB') {
          fullName = 'Royal Challengers Bangalore';
          city = 'Bangalore';
          colors = '🔴 Red & 🟡 Gold';
        } else if (value === 'DC') {
          fullName = 'Delhi Capitals';
          city = 'Delhi';
          colors = '🔵 Blue & 🔴 Red';
        } else if (value === 'GT') {
          fullName = 'Gujarat Titans';
          city = 'Ahmedabad';
          colors = '🟢 Green & 🔵 Blue';
        } else if (value === 'GST') {
          fullName = 'Gujarat Titans';
          city = 'Ahmedabad';
          colors = '🟢 Green & 🔵 Blue';
        } else {
          fullName = `${value} team`;
          city = 'Unknown';
          colors = 'Unknown';
        }
        
        markdown += `| \`${value}\` | ${fullName} | ${city} | ${colors} |\n`;
      });
      markdown += `\n`;
    });
  }

  markdown += `## 💡 Examples

### Basic Queries

\`\`\`graphql
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
\`\`\`

### Advanced Queries

\`\`\`graphql
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
\`\`\`

## 🛠️ Development

### 📁 Project Structure

\`\`\`
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
\`\`\`

### 🔄 How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

\`\`\`bash
node generate-docs.js
\`\`\`

This will automatically parse your schema and regenerate this documentation.

### 📍 Schema File Location

The documentation is generated from: \`src/main/resources/graphql/schema.graphqls\`

### 🚀 Running the Application

\`\`\`bash
# Start the Spring Boot application
./gradlew bootRun

# The GraphQL endpoint will be available at:
# http://localhost:8080/graphql
\`\`\`

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
`;

  return markdown;
}

// Main execution
try {
  // Read the schema file
  const schemaPath = 'src/main/resources/graphql/schema.graphql';
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  // Parse the schema
  const schemaData = parseGraphQLSchema(schemaContent);
  
  // Create docs directory
  const docsDir = 'docs/graphql';
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Generate markdown documentation
  const markdown = generateMarkdown(schemaData, schemaContent);
  
  // Write the documentation
  fs.writeFileSync(path.join(docsDir, 'schemaDocument.md'), markdown);
  
  console.log('✅ Dynamic documentation generated successfully!');
  console.log('📁 Location: docs/graphql/schemaDocument.md');
  console.log('🔄 To update: node generate-docs.js');
  console.log(`📊 Found: ${schemaData.types.length} types, ${schemaData.enums.length} enums, ${schemaData.queries.length} queries`);
  
} catch (error) {
  console.error('❌ Error generating documentation:', error.message);
  process.exit(1);
}
