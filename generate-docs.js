const fs = require('fs');
const path = require('path');

// Read the schema file
const schemaContent = fs.readFileSync('src/main/resources/graphql/schema.graphqls', 'utf8');

// Create docs directory
const docsDir = 'docs/graphql';
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Generate basic markdown documentation
const markdown = `# GraphQL API Documentation

## Schema Overview

\`\`\`graphql
${schemaContent}
\`\`\`

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
\`\`\`graphql
query {
  findAll {
    id
    name
    team
  }
}
\`\`\`
`;

// Write the documentation
fs.writeFileSync(path.join(docsDir, 'README.md'), markdown);

console.log('Documentation generated successfully in docs/graphql/README.md');
